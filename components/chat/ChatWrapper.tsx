"use client";

import { useEffect, useState } from "react";
import { defineQuery } from "next-sanity";
import Chat from "@/components/chat/Chat";
import { sanityFetch } from "@/sanity/lib/live";
import SidebarToggle from "../SidebarToggle";
import type { CHAT_PROFILE_QUERYResult } from "@/sanity.types";

const CHAT_PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    firstName,
    lastName,
    headline,
    shortBio,
    email,
    phone,
    location,
    availability,
    socialLinks,
    yearsOfExperience,
    profileImage
  }`);

function ChatWrapper() {
  const [profile, setProfile] = useState<CHAT_PROFILE_QUERYResult | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await sanityFetch({ query: CHAT_PROFILE_QUERY });
      setProfile(data);
    }
    fetchProfile();
  }, []);

  return (
    <div className="h-full w-full">
      <div className="md:hidden p-2 sticky top-0 z-10">
        <SidebarToggle />
      </div>

      <Chat profile={profile} />
    </div>
  );
}

export default ChatWrapper;
