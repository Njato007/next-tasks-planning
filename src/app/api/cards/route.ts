import { NextResponse } from "next/server";
import { Cards } from "@/lib/data";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const boardId = url.searchParams.get('boardid');
    if (boardId) {
        return NextResponse.json(Cards.filter(item => item.boardId === boardId));
    } else {
        return NextResponse.json(Cards);
    }
}