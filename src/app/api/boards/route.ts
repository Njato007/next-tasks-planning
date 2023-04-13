import { NextResponse } from "next/server";
import { Data } from "@/lib/data";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const Id = url.searchParams.get('id');
    if (Id) {
        return NextResponse.json(Data.find(item => item.id === Id));
    } else {
        return NextResponse.json(Data);
    }
}