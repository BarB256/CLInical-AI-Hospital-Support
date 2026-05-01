import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";


// returns booked appointments (for the calender/booking UI)
export async function GET(request: NextRequest) {
    // used to get appointments for either specific or ALL doctors. E.g.:
    // /api/appointments — no filter and gets all appointments
    // /api/appointments?doctorId=1 — only gets appointment for doctor with id 1
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");

    try {
        let query: string;
        let values: string[];

        if (doctorId) {
            query = `SELECT doctor_id AS "doctorId", date::text, time
                     FROM booked_appointments
                     WHERE doctor_id = $1
                     ORDER BY date, time`;
            values = [doctorId];
        } 
        else {
            query = `SELECT doctor_id AS "doctorId", date::text, time
                     FROM booked_appointments
                     ORDER BY date, time`;
            values = [];
        }

        const result = await pool.query(query, values);
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Error fetching appointments:", error);  
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });  
    }
}

// book a new appointment
export async function POST(request: NextRequest) {
    // validate body
    const body = await request.json();
    const { doctorId, patientId, date, time } = body;

    if (!doctorId || !patientId || !date || !time) {
        return NextResponse.json(  
            { error: "Missing required fields: doctorId, patientId, date, time" },  
            { status: 400 }  
        ); 
    }

    try {
        const result = await pool.query(  
            `INSERT INTO booked_appointments (doctor_id, patient_id, date, time)  
            VALUES ($1, $2, $3, $4)  
            RETURNING id`,  
            [doctorId, patientId, date, time]  
        ); 
        return NextResponse.json({ id: result.rows[0].id }, { status: 201 }); 
    } catch (error: unknown) {
        // handle duplicate booking date/time. postgres throws error code 23505 for unique constraint violations
        if (
            typeof error === "object" &&  
            error !== null &&  
            "code" in error &&  
            (error as { code: string }).code === "23505"  
        ) {
            return NextResponse.json(  
                { error: "This time slot is already booked" },  
                { status: 409 }  
            );  
        }

        // for any other unexpected error
        console.error("Error booking appointment:", error);  
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        
    }

}