import { NextRequest, NextResponse } from "next/server";  
import pool from "@/lib/db";  
  
// get all suggestions ordered by newest first  
export async function GET() {  
  try {  
    const result = await pool.query(  
      `SELECT id, title, description, priority, timestamp, is_new AS "isNew"  
       FROM suggestions  
       ORDER BY timestamp DESC  
       LIMIT 50`  
    );  
    return NextResponse.json(result.rows);  
  } catch (error) {  
    console.error("Error fetching suggestions:", error);  
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });  
  }  
}  
  
// add a new suggestion  
export async function POST(request: NextRequest) {  
  try {  
    const { title, description, priority } = await request.json();  
  
    if (!title || !description || !priority) {  
      return NextResponse.json({ error: "title, description, and priority are required" }, { status: 400 });  
    }  
  
    
    const validPriorities = ["high", "medium", "low"];  
    if (!validPriorities.includes(priority)) {  
      return NextResponse.json({ error: "priority must be 'high', 'medium', or 'low'" }, { status: 400 });  
    }  
  
    const result = await pool.query(  
      `INSERT INTO suggestions (title, description, priority)  
       VALUES ($1, $2, $3)  
       RETURNING id, title, description, priority, timestamp, is_new AS "isNew"`,  
      [title, description, priority]  
    );  
  
    return NextResponse.json(result.rows[0], { status: 201 });  
  } catch (error) {  
    console.error("Error creating suggestion:", error);  
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });  
  }  
}