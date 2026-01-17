import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { CalEmbed } from "./CalEmbed";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, PenTool, Youtube } from "lucide-react";

// Define interface for Profile to fix TS errors
interface ProfileType {
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    medium?: string;
    devto?: string;
    youtube?: string;
  };
}

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`);

export async function ContactSection() {
  const { data } = await sanityFetch({ query: PROFILE_QUERY });
  const profile = data as unknown as ProfileType; // Cast to fix lint errors

  if (!profile) {
    return null;
  }

  return (
    <section id="contact" className="py-24 px-6 pb-40 bg-black border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Get In Touch</h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Ready to transform your workflow? Let's build something extraordinary together.
          </p>
        </div>

        <div className="@container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="@container/info space-y-8 lg:pt-8 w-full max-w-md mx-auto lg:mx-0">
              <h3 className="text-2xl font-semibold mb-8 text-white hidden lg:block">
                Contact Information
              </h3>

              <div className="space-y-8">
                {profile.email && (
                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors border border-white/5">
                      <Mail className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                        Email
                      </h4>
                      <Link
                        href={`mailto:${profile.email}`}
                        className="text-lg text-zinc-300 hover:text-white transition-colors font-light tracking-wide truncate block"
                      >
                        {profile.email}
                      </Link>
                    </div>
                  </div>
                )}

                {profile.phone && (
                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors border border-white/5">
                      <Phone className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                        Phone
                      </h4>
                      <Link
                        href={`tel:${profile.phone}`}
                        className="text-lg text-zinc-300 hover:text-white transition-colors font-light tracking-wide truncate block"
                      >
                        {profile.phone}
                      </Link>
                    </div>
                  </div>
                )}

                {profile.location && (
                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors border border-white/5">
                      <MapPin className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
                        Location
                      </h4>
                      <p className="text-lg text-zinc-300 font-light tracking-wide">
                        {profile.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {profile.socialLinks && (
                <div className="pt-10">
                  <h4 className="font-semibold text-zinc-500 mb-5 text-xs uppercase tracking-widest">
                    Connect on Social
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {profile.socialLinks.github && (
                      <SocialIconLink href={profile.socialLinks.github} icon={<Github className="w-5 h-5" />} />
                    )}
                    {profile.socialLinks.linkedin && (
                      <SocialIconLink href={profile.socialLinks.linkedin} icon={<Linkedin className="w-5 h-5" />} />
                    )}
                    {profile.socialLinks.twitter && (
                      <SocialIconLink href={profile.socialLinks.twitter} icon={<Twitter className="w-5 h-5" />} />
                    )}
                    {profile.socialLinks.website && (
                      <SocialIconLink href={profile.socialLinks.website} icon={<Globe className="w-5 h-5" />} />
                    )}
                    {profile.socialLinks.medium && (
                      <SocialIconLink href={profile.socialLinks.medium} icon={<PenTool className="w-5 h-5" />} />
                    )}
                    {profile.socialLinks.youtube && (
                      <SocialIconLink href={profile.socialLinks.youtube} icon={<Youtube className="w-5 h-5" />} />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Calendar Embed */}
            <div className="relative">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-2 shadow-2xl">
                <CalEmbed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialIconLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all duration-300"
    >
      <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>
    </Link>
  )
}
