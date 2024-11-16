import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(req, { params }) {
    try {
        const { id: slug } = params;
        if (!slug) {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 });
        }
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
        if (!slug) {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 });
        }
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

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        const intId = Number(id)
        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }
        await prisma.pluginData.deleteMany({ where: { postId: intId } });
        await prisma.post.delete({ where: { id: intId } });
        return NextResponse.json({ message: "Deletion successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}