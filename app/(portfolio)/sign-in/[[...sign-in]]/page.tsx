"use client";

import { CustomSignIn } from "@/components/auth/CustomSignIn";

export default function SignInPage() {
    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <CustomSignIn onSuccess={() => window.location.href = '/user-profile'} />
            </div>
        </div>
    );
}
