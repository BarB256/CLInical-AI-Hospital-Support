import { NextResponse } from "next/server";
import pool from "@/lib/db";

// gets all reports for the dashboard
export async function GET() {
    try {
        const results = await pool.query(
            `SELECT id,
                    patient_name AS "patientName",
                    patient_surname AS "patientSurname",
                    date::text,
                    title,
                    content
            FROM reports
            ORDER BY date DESC`
        );
        return NextResponse.json(results.rows);
    } catch (error) {  
        console.error("Error fetching reports:", error);  
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });  
    }  
}