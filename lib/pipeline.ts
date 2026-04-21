/**
 * NexusShorts AI Pipeline
 * Generates a complete faceless reel:
 *   1. GPT-4o-mini writes a script (~$0.01)
 *   2. ElevenLabs generates voiceover (free tier or paid)
 *   3. Replicate/Flux generates scene images (~$0.02)
 *   4. Returns all assets for client-side assembly or server render
 */

import OpenAI from "openai";
import Replicate from "replicate";

// --- Types ---

export interface Scene {
  narration: string;
  caption: string;
  visualPrompt: string;
  imageUrl?: string;
}

export interface Script {
  hook: string;
  scenes: Scene[];
  cta: string;
}

export interface PipelineResult {
  script: Script;
  audioUrl: string;
  scenes: Scene[];
  durationMs: number;
}

// --- Step 1: Script Generation ---

export async function generateScript(
  niche: string,
  style: string
): Promise<Script> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You write viral 30-second faceless reel scripts. Return JSON only:
{
  "hook": "first 3 seconds, must stop the scroll",
  "scenes": [
    { "narration": "1 short sentence under 15 words", "caption": "max 6 words on-screen", "visualPrompt": "detailed image prompt for AI image generation" }
  ],
  "cta": "short call to action"
}
Include exactly 5 scenes. Keep narration punchy. Visual prompts should describe cinematic scenes with specific details, colors, and composition. Style: ${style}`,
      },
      {
        role: "user",
        content: `Topic: ${niche}. Pick a specific, curiosity-driven angle that would go viral on TikTok.`,
      },
    ],
  });

  const raw = completion.choices[0].message.content;
  if (!raw) throw new Error("Empty script response from OpenAI");
  return JSON.parse(raw) as Script;
}

// --- Step 2: Voiceover Generation ---

export async function generateVoiceover(script: Script): Promise<{
  audioBuffer: Buffer;
  contentType: string;
}> {
  const fullText = [
    script.hook,
    ...script.scenes.map((s) => s.narration),
    script.cta,
  ].join(". ");

  // Using Rachel voice (built into free tier)
  const voiceId = "21m00Tcm4TlvDq8ikWAM";

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: fullText,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`ElevenLabs error ${res.status}: ${errText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return {
    audioBuffer: Buffer.from(arrayBuffer),
    contentType: "audio/mpeg",
  };
}

// --- Step 3: Scene Image Generation ---

export async function generateSceneImages(
  scenes: Scene[],
  style: string
): Promise<string[]> {
  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

  const imageUrls: string[] = [];

  for (const scene of scenes) {
    const output = (await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt: `${scene.visualPrompt}, ${style}, vertical composition 9:16 aspect ratio`,
        aspect_ratio: "9:16",
        num_outputs: 1,
        output_format: "jpg",
        output_quality: 85,
      },
    })) as string[];

    const url = Array.isArray(output) ? output[0] : output;
    imageUrls.push(typeof url === "string" ? url : String(url));
  }

  return imageUrls;
}

// --- Full Pipeline ---

export async function runPipeline(
  niche: string,
  style: string
): Promise<PipelineResult> {
  // Step 1: Generate script
  const script = await generateScript(niche, style);

  // Step 2: Generate voiceover
  const { audioBuffer } = await generateVoiceover(script);

  // Estimate duration from text length (~150 words per minute for narration)
  const fullText = [
    script.hook,
    ...script.scenes.map((s) => s.narration),
    script.cta,
  ].join(" ");
  const wordCount = fullText.split(/\s+/).length;
  const durationMs = Math.round((wordCount / 150) * 60 * 1000);

  // Step 3: Generate images (in parallel batches of 2 to avoid rate limits)
  const imageUrls: string[] = [];
  for (let i = 0; i < script.scenes.length; i += 2) {
    const batch = script.scenes.slice(i, i + 2);
    const batchUrls = await generateSceneImages(batch, style);
    imageUrls.push(...batchUrls);
  }

  // Attach image URLs to scenes
  const enrichedScenes = script.scenes.map((scene, i) => ({
    ...scene,
    imageUrl: imageUrls[i],
  }));

  return {
    script: { ...script, scenes: enrichedScenes },
    audioUrl: `data:audio/mpeg;base64,${audioBuffer.toString("base64")}`,
    scenes: enrichedScenes,
    durationMs,
  };
}
