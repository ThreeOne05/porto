import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// GET: Ambil semua project
export async function GET(req: NextRequest) {
  const db = await getDb();
  const projects = await db.collection("projects").find({}).toArray();
  // Hapus _id jika ingin response bersih
  const cleanProjects = projects.map(({ _id, ...rest }) => rest);
  return NextResponse.json(cleanProjects);
}

// POST: Tambah project baru
export async function POST(req: NextRequest) {
  const db = await getDb();
  const body = await req.json();
  const { name, link, icon } = body;

  if (!name || !link || !icon) {
    return NextResponse.json(
      { error: "Name, link, dan icon wajib diisi!" },
      { status: 400 }
    );
  }

  const project = {
    name,
    link,
    icon,
    createdAt: new Date(),
  };

  const result = await db.collection("projects").insertOne(project);

  return NextResponse.json(
    {
      _id: result.insertedId,
      ...project,
    },
    { status: 201 }
  );
}

// DELETE: Hapus project berdasarkan name
export async function DELETE(req: NextRequest) {
  const db = await getDb();
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json(
      { error: "Name wajib diisi untuk hapus project!" },
      { status: 400 }
    );
  }

  const result = await db.collection("projects").deleteOne({ name });

  if (result.deletedCount === 0) {
    return NextResponse.json(
      { error: "Project tidak ditemukan." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
