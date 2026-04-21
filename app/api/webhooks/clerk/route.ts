import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) return NextResponse.json({ error: "Missing headers" }, { status: 400 });
  const body = await req.text();
  const wh = new Webhook(secret);
  let evt: any;
  try { evt = wh.verify(body, { "svix-id": svixId, "svix-timestamp": svixTimestamp, "svix-signature": svixSignature }); } catch { return NextResponse.json({ error: "Invalid signature" }, { status: 400 }); }
  const { type, data } = evt;
  try {
    if (type === "user.created" || type === "user.updated") {
      await prisma.user.upsert({ where: { clerkId: data.id }, create: { clerkId: data.id, email: data.email_addresses?.[0]?.email_address ?? "", name: [data.first_name, data.last_name].filter(Boolean).join(" ") || null, imageUrl: data.image_url }, update: { email: data.email_addresses?.[0]?.email_address ?? "", name: [data.first_name, data.last_name].filter(Boolean).join(" ") || null, imageUrl: data.image_url } });
    }
    if (type === "user.deleted") { await prisma.user.deleteMany({ where: { clerkId: data.id } }); }
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Handler failed" }, { status: 500 }); }
}
