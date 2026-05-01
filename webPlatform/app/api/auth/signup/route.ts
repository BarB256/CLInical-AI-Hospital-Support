import { NextRequest, NextResponse } from "next/server";  
import bcrypt from "bcrypt";  
import pool from "@/lib/db"; 

// adds new user into accounts table (and into doctors table if new user is of type doctor)
export async function POST(request: NextRequest) {
    // parse JSON body from requests
    const body = await request.json();  
    const { name, email, password, accountType } = body;  

    // validate all required fields are filled
    if (!name || !email || !password || !accountType) {
        return NextResponse.json(
            { error: "Missing one or more required fields: name, email, password, accountType" },
            { status: 400 }
        );
    }

    // Basic email format validation. Requires at least: something@something.something  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (!emailRegex.test(email)) {  
        return NextResponse.json(  
            { error: "Invalid email format" },  
            { status: 400 }  
        );  
    }

    // validate accountType has correct value
    if (accountType !== "doctor" && accountType !== "patient") {
        return NextResponse.json(  
            { error: "accountType must be 'patient' or 'doctor'" },  
            { status: 400 }  
        ); 
    }

    try {
        // hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // INSERT into accounts table
        const accountResult = await pool.query(
            `INSERT INTO accounts (name, email, password_hash, account_type)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
             [name, email, passwordHash, accountType]
        );

        const accountId = accountResult.rows[0].id;

        // if user is a doctor, create a new row in doctors table
        if (accountType === "doctor") {
            await pool.query(
                `INSERT INTO doctors (name, account_id)
                 VALUES ($1, $2)`,
                 [name, accountId]
            );
        }

        // return new account id on success
        return NextResponse.json({ id: accountId }, { status: 201 });

    } catch (error: unknown) {
        // handle duplicate email. postgres throws error code 23505 for unique constraint violations
        // accounts table has: email VARCHAR(255) NOT NULL UNIQUE  
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code: string}).code === "23505"
        ) {
            return NextResponse.json(
                { error: "An account with this email already exists" },  
                { status: 409 } 
            );
        }

        // for any other unexpected error
        console.error("Signup error:", error);  
        return NextResponse.json(  
            { error: "Internal server error" },  
            { status: 500 }  
        ); 
    }


}