import { NextResponse } from "next/server";

export const GET = async () => {
    const response = await fetch('http://localhost:8080/qa_system_api/departments');
    const data = await response.json();
    return NextResponse.json(data);
}
