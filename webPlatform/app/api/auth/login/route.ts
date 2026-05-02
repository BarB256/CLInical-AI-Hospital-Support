import { NextRequest, NextResponse } from "next/server";  
import bcrypt from "bcrypt";  
import pool from "@/lib/db";  
import { cookies } from "next/headers";

// checks login credentials and then logs in accordingly  
export async function POST(request: NextRequest) {
    // parse JSON body
    const body = await request.json();  
    const { email, password } = body;  

    // validate both fields are filled
    if (!email || !password) {
        return NextResponse.json(
            { error: "Missing required fields: email, password" },
            { status: 400 }
        );
    }

    try {
        // look up account by email
        const result = await pool.query(
            `SELECT id, name, email, password_hash, account_type
             FROM accounts
             WHERE email = $1`,
             [email]
        );

        // if no account found return 401
        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const account = result.rows[0];

        // compare filled password against stored hash
        const passwordMatch = await bcrypt.compare(password, account.password_hash);

        // if password do not match return 401
        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // add cookie to store user id and user name
        const cookieStore = await cookies();
        cookieStore.set("userId", account.id, {
            httpOnly: true,         // JS can't read/modify it
            secure: false,          // required https for true
            path: "/",              // available to all routes
            maxAge: 60 * 60 * 24    // expires in 24 hours
        });
        cookieStore.set("userName", account.name, {
            httpOnly: false,         
            secure: false,          
            path: "/",              
            maxAge: 60 * 60 * 24   
        });

        // login successful, return account
        return NextResponse.json({
            id: account.id,
            name: account.name,
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}