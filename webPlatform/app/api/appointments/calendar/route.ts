import { NextRequest, NextResponse } from "next/server";  
import pool from "@/lib/db";  
import { cookies } from "next/headers";  
  
// return booked appointments with patient names for the logged-in doctor's calendar view  
export async function GET(request: NextRequest) {  
  const cookieStore = await cookies();  
    const userId = cookieStore.get("userId")?.value;  

    if (!userId) {  
        return NextResponse.json({ error: "Not logged in" }, { status: 401 });  
    } 


  
   try {  
        // find the doctor linked to this account  
        const doctorResult = await pool.query(  
            `SELECT id FROM doctors WHERE account_id = $1`,  
            [userId]  
        );  
  
        if (doctorResult.rows.length === 0) {  
            return NextResponse.json({ error: "No doctor profile found for this account" }, { status: 404 });  
        }  
  
        const doctorId = doctorResult.rows[0].id;  
  
        // fetch only this doctor's appointments  
        const result = await pool.query(  
            `SELECT  
                ba.date::text,  
                ba.time,  
                a.name AS "patientName"  
             FROM booked_appointments ba  
             JOIN accounts a ON a.id = ba.patient_id  
             WHERE ba.doctor_id = $1  
             ORDER BY ba.date, ba.time DESC`,  
            [doctorId]  
        );  
  
        return NextResponse.json(result.rows);  
    } catch (error) {  
        console.error("Error fetching calendar appointments:", error);  
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });  
    }  
}