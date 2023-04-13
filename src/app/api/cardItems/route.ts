import { NextResponse } from "next/server";
import { CardItems } from "@/lib/data";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const cardId = url.searchParams.get('cardid');
    if (cardId) {
        return NextResponse.json(CardItems.filter(item => item.cardId === cardId));
    } else {
        return NextResponse.json(CardItems);
    }
}