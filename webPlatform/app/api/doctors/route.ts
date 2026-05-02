import { NextResponse } from "next/server";
import pool from "@/lib/db";

// returns all doctors name and id.
export async function GET() {
    try {
        const result = await pool.query(
            `SELECT id, name FROM doctors ORDER BY name`
        );
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}