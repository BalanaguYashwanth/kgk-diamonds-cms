import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(req, { params }) {
    try {
        const { id: slug } = params;
        const post = await prisma.post.findUnique({
            where: { slug }
        });
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        const plugins = await prisma.pluginData.findMany({
            where: { postId: post.id },
        });

        return NextResponse.json({ post, plugins });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id: slug } = params;

        const data = await req.json() || {};
        const post = await prisma.post.upsert({
            where: { slug },
            update: data,
            create: data,
        });

        return NextResponse.json({ post });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}