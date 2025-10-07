import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongoose"
import { ReliefCenter } from "@/models/relief-center"

export async function POST(req: Request) {
  await getDb()
  const { lat, lng } = await req.json().catch(() => ({}))
  if (typeof lat !== "number" || typeof lng !== "number") {
    return NextResponse.json({ error: "lat,lng required" }, { status: 400 })
  }
  const center = (await ReliefCenter.findOne({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
      },
    },
  }).lean()) as unknown

  if (!center || Array.isArray(center))
    return NextResponse.json({ error: "No relief center found" }, { status: 404 })

  // center is a plain object from .lean(), assert expected shape minimally
  const c: any = center

  return NextResponse.json({
    center: {
      _id: c._id,
      name: c.name,
      details: c.details,
      lat: c.location?.coordinates?.[1],
      lng: c.location?.coordinates?.[0],
    },
  })
}
