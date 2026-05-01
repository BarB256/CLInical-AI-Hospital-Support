"use client";

import { useState } from "react";  
import { useRouter } from "next/navigation";  
import Link from "next/link";
import LoginForm from "@/components/loginPage/LoginForm";
import type { LoginFormData } from "@/types"; 

export default function LoginPage() {
    const router = useRouter();  
    const [error, setError] = useState<string | null>(null);  

    async function handleLogin(data: LoginFormData) {  
        setError(null);  
    
        try {  
            const response = await fetch("/api/auth/login", {  
                method: "POST",  
                headers: { "Content-Type": "application/json" },  
                body: JSON.stringify({  
                email: data.email,  
                password: data.password,  
                }),  
            });  
    
            if (response.ok) {  
                // Login successful — redirect to main app page  
                router.push("/conversation");  
                return;  
            }  
    
            const result = await response.json();  
            setError(result.error || "Something went wrong");  
    
        } catch {  
        setError("Network error");  
        }  
    }  


    return (
        <main className="flex min-h-screen w-full items-start justify-center bg-[#F4F7F7] px-4 pt-16">
            <div className="flex w-full max-w-[400px] flex-col items-center gap-4">
                <p className="text-sm font-semibold text-[#167980]">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-bold underline">
                        Sign up
                    </Link>
                </p>

                {error && (  
                    <p className="w-full rounded-lg bg-red-50 px-4 py-2 text-center text-sm text-red-600">  
                        {error}  
                    </p>  
                )} 

                <LoginForm onSubmit={handleLogin}/>
            </div>
        </main>
    );
}
