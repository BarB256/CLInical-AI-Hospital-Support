import { NextRequest, NextResponse } from "next/server";  
import pool from "@/lib/db";  
  
// get all notes ordered by newest first  
export async function GET() {  
  try {  
    const result = await pool.query(  
      `SELECT id, content, source, timestamp, is_new AS "isNew"  
       FROM notes  
       ORDER BY timestamp DESC  
       LIMIT 50`  
    );  
    return NextResponse.json(result.rows);  
  } catch (error) {  
    console.error("Error fetching notes:", error);  
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });  
  }  
}  
  
// add a new note  
export async function POST(request: NextRequest) {  
  try {  
    const { content, source } = await request.json();  
  
    if (!content) {  
      return NextResponse.json({ error: "content is missing" }, { status: 400 });  
    }  
  
    const result = await pool.query(  
      `INSERT INTO notes (content, source)  
       VALUES ($1, $2)  
       RETURNING id, content, source, timestamp, is_new AS "isNew"`,  
      [content, source || null]  
    );  
  
    return NextResponse.json(result.rows[0], { status: 201 });  
  } catch (error) {  
    console.error("Error creating note:", error);  
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });  
  }  
}