import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids")?.split(",").filter(Boolean) || [];

  if (ids.length === 0) return NextResponse.json({ jobs: [] });

  const jobs = await prisma.job.findMany({ where: { id: { in: ids } } });
  return NextResponse.json({ jobs });
}
