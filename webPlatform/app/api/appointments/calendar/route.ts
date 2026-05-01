import { NextRequest, NextResponse } from "next/server";  
import pool from "@/lib/db";  
  
// return booked appointments with patient names for doctor's calender view
export async function GET(request: NextRequest) {  
  const { searchParams } = new URL(request.url);  
  const doctorId = searchParams.get("doctorId");  
  
  try {  
    // join booked_appointments with accounts to get patient names for display  
    let query: string;  
    let values: string[];  
  
    if (doctorId) {  
      query = `SELECT  
                 ba.date::text,  
                 ba.time,  
                 a.name AS "patientName"  
               FROM booked_appointments ba  
               JOIN accounts a ON a.id = ba.patient_id  
               WHERE ba.doctor_id = $1  
               ORDER BY ba.date, ba.time`;  
      values = [doctorId];  
    } else {  
      query = `SELECT  
                 ba.date::text,  
                 ba.time,  
                 a.name AS "patientName"  
               FROM booked_appointments ba  
               JOIN accounts a ON a.id = ba.patient_id  
               ORDER BY ba.date, ba.time`;  
      values = [];  
    }  
  
    const result = await pool.query(query, values);  
    return NextResponse.json(result.rows);  
  } catch (error) {  
    console.error("Error fetching calendar appointments:", error);  
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });  
  }  
}