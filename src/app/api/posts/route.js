import { NextResponse } from "next/server";
import prisma from "../../../db";

export async function POST(req) {
    try {
        const { title, slug, content } = await req.json();
        const post = await prisma.post.create({
            data: { title, slug, content }
        });
        
        return NextResponse.json({ post });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json({ posts });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
