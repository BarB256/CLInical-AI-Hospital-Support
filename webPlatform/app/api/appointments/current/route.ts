import { NextResponse } from "next/server";  
import { cookies } from "next/headers";  
import pool from "@/lib/db";  
  
// find the current/next appointment for the logged-in doctor  
export async function GET() {  
  try {  
    const cookieStore = await cookies();  
    const accountId = cookieStore.get("userId")?.value;  
  
    if (!accountId) {  
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });  
    }  
  
    // find the doctor record for this account  
    const doctorResult = await pool.query(  
      `SELECT id FROM doctors WHERE account_id = $1`,  
      [accountId]  
    );  
  
    if (doctorResult.rows.length === 0) {  
      return NextResponse.json({ error: "No doctor profile found" }, { status: 404 });  
    }  
  
    const doctorId = doctorResult.rows[0].id;  
  
    // find today's first appointment within 1 hour limit of appointment start time 
    const appointmentResult = await pool.query(  
      `SELECT id, patient_id, date, time  
       FROM booked_appointments  
       WHERE doctor_id = $1 
        AND date = CURRENT_DATE  
        AND time::TIME >= CURRENT_TIME - INTERVAL '60 minutes'
       ORDER BY time::TIME  
       LIMIT 1`,  
      [doctorId]  
    );  
  
    if (appointmentResult.rows.length === 0) {  
      return NextResponse.json({ error: "No appointment found for today" }, { status: 404 });  
    }  
  
    return NextResponse.json(appointmentResult.rows[0]);  
  } catch (error) {  
    console.error("Error fetching current appointment:", error);  
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });  
  }  
}