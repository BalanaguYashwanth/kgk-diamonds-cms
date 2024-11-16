import { NextResponse } from "next/server";
import prisma from "../../../db";

export async function POST(req) {
    try {
        const { title, slug, content, plugins } = await req.json();
        const post = await prisma.post.create({
            data: { title, slug, content }
        });
        
        if (plugins && plugins.length > 0) {
            for (let plugin of plugins) {
                await prisma.pluginData.create({
                    data: {
                        type: plugin.type,
                        data: plugin.data,
                        postId: post.id,
                    },
                });
            }
        }
        
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
