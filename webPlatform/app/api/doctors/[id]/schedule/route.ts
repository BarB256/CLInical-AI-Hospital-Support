import { NextRequest, NextResponse } from "next/server";  
import pool from "@/lib/db"; 

// returns the schedule of specific doctors
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;

    try {
        const result = await pool.query(
            `SELECT 
                doctor_id AS "doctorId",
                working_days AS "workingDays",
                work_hours AS "workHours"
            FROM doctor_schedules
            WHERE doctor_id = $1`,
            [id]
        );
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fecthing doctor schedule:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 505 });
    }
}