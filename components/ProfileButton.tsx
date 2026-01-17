"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import { Settings, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProfileButton() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all overflow-hidden"
            >
                {user.imageUrl ? (
                    <Image
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                        {user.firstName?.[0] || user.emailAddresses[0]?.emailAddress[0] || "U"}
                    </div>
                )}
            </button>

            {/* Dropdown Menu - Opens Upwards */}
            {isOpen && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[100] w-64 p-1 rounded-xl bg-black/90 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-2 duration-200">
                    {/* User Info */}
                    <div className="px-3 py-3 border-b border-white/10">
                        <p className="text-sm font-semibold text-white truncate">
                            {user.fullName || "User"}
                        </p>
                        <p className="text-xs text-neutral-400 truncate">
                            {user.primaryEmailAddress?.emailAddress}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-1 p-1">
                        <Link
                            href="/user-profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-neutral-200 hover:text-white transition-colors"
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">Manage Account</span>
                        </Link>

                        <button
                            onClick={() => {
                                setIsOpen(false);
                                signOut();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-red-400 hover:text-red-300 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="text-sm">Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
