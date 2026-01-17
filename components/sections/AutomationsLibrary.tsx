"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Bot, Zap, TrendingUp, Layers, Video, Mail, Search, Share2, PenTool, Database, ExternalLink } from "lucide-react";

// Automation Data with real Notion links
const AUTOMATIONS = [
    { title: "Product Ad Generator", link: "https://www.notion.so/Product-Ad-Generator-274d87f9d70f815cae90e6ca04244196?pvs=21", category: "Ads", complexity: "High", roi: "10x", apis: ["OpenAI", "Midjourney", "AdMgr"] },
    { title: "Personalized Email Machine", link: "https://www.notion.so/Personalized-Email-Machine-274d87f9d70f8103957cf513999be3ba?pvs=21", category: "Outreach", complexity: "Medium", roi: "5x", apis: ["Gmail", "OpenAI", "Sheets"] },
    { title: "Facebook Ads Generator", link: "https://www.notion.so/Facebook-Ads-Generator-274d87f9d70f8133a3d7c79ffa3ca002?pvs=21", category: "Ads", complexity: "High", roi: "8x", apis: ["Meta API", "DALL-E 3"] },
    { title: "SEO Blog Automation System", link: "https://www.notion.so/SEO-Blog-Automation-System-274d87f9d70f8179ab3fccdc4d4dccd5?pvs=21", category: "Content", complexity: "Medium", roi: "Long-term", apis: ["Wordpress", "Semrush", "GPT-4"] },
    { title: "Veo3 AI Video Generator", link: "https://www.notion.so/Veo3-AI-Video-Generator-274d87f9d70f81ffb7a7ff58b83411c4?pvs=21", category: "Video", complexity: "Extreme", roi: "High", apis: ["Runway", "ElevenLabs"] },
    { title: "Multi-Platform Publisher", link: "https://www.notion.so/Multi-Platform-Publisher-274d87f9d70f819d84c4f6de0172fc89?pvs=21", category: "Social", complexity: "Medium", roi: "Time-saver", apis: ["LinkedIn", "Twitter", "IG"] },
    { title: "Auto Graphic Design System", link: "https://www.notion.so/Auto-Graphic-Design-System-274d87f9d70f816598cfe46a976a442f?pvs=21", category: "Design", complexity: "High", roi: "High", apis: ["Canva/Figma", "SDW"] },
    { title: "YouTube Viral Searcher", link: "https://www.notion.so/YouTube-Viral-Searcher-274d87f9d70f81d3b354e750f383b78d?pvs=21", category: "Research", complexity: "Low", roi: "Strategic", apis: ["YouTube Data"] },
    { title: "Newsletter Automation Engine", link: "https://www.notion.so/Newsletter-Automation-Engine-274d87f9d70f8185b4d4f7ea4a676490?pvs=21", category: "Content", complexity: "Medium", roi: "Retention", apis: ["SendGrid", "Beehiiv"] },
    { title: "AI SEO Writer", link: "https://www.notion.so/AI-SEO-Writer-274d87f9d70f817d8d75daa381a1afaa?pvs=21", category: "Content", complexity: "Medium", roi: "Traffic", apis: ["Ahrefs", "Claude"] },
    { title: "AI Clone Creator", link: "https://www.notion.so/AI-Clone-Creator-274d87f9d70f8106a2cec4a0169caa3d?pvs=21", category: "Video", complexity: "Extreme", roi: "Brand", apis: ["HeyGen", "Clone API"] },
    { title: "Video Analyzer", link: "https://www.notion.so/Video-Analyzer-274d87f9d70f8176a252fadf08442fe5?pvs=21", category: "Research", complexity: "High", roi: "Insight", apis: ["Video Indexer", "GPT"] },
    { title: "LinkedIn DM Automation System", link: "https://www.notion.so/LinkedIn-DM-Automation-System-274d87f9d70f814091fbcc6a5086d92b?pvs=21", category: "Outreach", complexity: "High", roi: "Leads", apis: ["LinkedIn", "Sales Nav"] },
    { title: "Instagram Viral Searcher", link: "https://www.notion.so/Instagram-Viral-Searcher-274d87f9d70f8132b249f91ce68ef530?pvs=21", category: "Research", complexity: "Low", roi: "Strategic", apis: ["IG Graph"] },
    { title: "AI Marketing Team", link: "https://www.notion.so/AI-Marketing-Team-274d87f9d70f816abe99de48a14a8e07?pvs=21", category: "Strategy", complexity: "Extreme", roi: "20x", apis: ["AutoGPT", "Zapier"] },
    { title: "Facebook Ad Spy System", link: "https://www.notion.so/Facebook-Ad-Spy-System-274d87f9d70f81a48388c92031808bed?pvs=21", category: "Research", complexity: "Medium", roi: "Intel", apis: ["Ad Library"] },
    { title: "4K Video Creator", link: "https://www.notion.so/4K-Video-Creator-274d87f9d70f819eac3af4f241963824?pvs=21", category: "Video", complexity: "High", roi: "Quality", apis: ["Upscalers", "FFmpeg"] },
    { title: "TikTok Viral Searcher", link: "https://www.notion.so/TikTok-Viral-Searcher-274d87f9d70f81a3b9c4e970b6490b53?pvs=21", category: "Research", complexity: "Low", roi: "Trend", apis: ["TikTok API"] },
    { title: "YouTube Long Form Generator", link: "https://www.notion.so/YouTube-Long-Form-Generator-274d87f9d70f81a298e7e2e93b160ecc?pvs=21", category: "Video", complexity: "Extreme", roi: "Growth", apis: ["Shotstack", "OpenAI"] },
    { title: "Lead Generation System", link: "https://www.notion.so/Lead-Generation-System-274d87f9d70f81d5bc50c11a0b4eb866?pvs=21", category: "Outreach", complexity: "High", roi: "Revenue", apis: ["Apollo", "Hunter", "CRM"] },
    { title: "Instagram Idea Scraper", link: "https://www.notion.so/Instagram-Idea-Scraper-274d87f9d70f81298756e079765e09f8?pvs=21", category: "Research", complexity: "Low", roi: "Creative", apis: ["Apify"] },
    { title: "LinkedIn Cold Email Machine", link: "https://www.notion.so/LinkedIn-Cold-Email-Machine-274d87f9d70f812d86d7eb391506b155?pvs=21", category: "Outreach", complexity: "Medium", roi: "Leads", apis: ["Instantly", "Findymail"] },
    { title: "LinkedIn Performance Analyzer", link: "https://www.notion.so/LinkedIn-Performance-Analyzer-274d87f9d70f8191906ae2a829546cf1?pvs=21", category: "Analytics", complexity: "Medium", roi: "Optimization", apis: ["Analytics API"] },
    { title: "Faceless POV Video Creator", link: "https://www.notion.so/Faceless-POV-Video-Creator-274d87f9d70f81f995f7cfee80380118?pvs=21", category: "Video", complexity: "High", roi: "Engagement", apis: ["Stock API", "TTS"] },
    { title: "Free Apollo Lead Scraper", link: "https://www.notion.so/Free-Apollo-Lead-Scraper-274d87f9d70f81f093bfe6b33aeec4f0?pvs=21", category: "Data", complexity: "Medium", roi: "Savings", apis: ["Custom Scraper"] },
    { title: "YouTube Content Strategist", link: "https://www.notion.so/YouTube-Content-Strategist-274d87f9d70f81039278e9ebfca1f385?pvs=21", category: "Strategy", complexity: "Medium", roi: "Growth", apis: ["YouTube Analytics"] },
    { title: "Custom Style Image Generator", link: "https://www.notion.so/Custom-Style-Image-Generator-274d87f9d70f81269961d1eb79d2e52c?pvs=21", category: "Design", complexity: "High", roi: "Brand", apis: ["LoRA", "SDXL"] },
    { title: "Veo3 Video Automation System", link: "https://www.notion.so/Veo3-Video-Automation-System-274d87f9d70f81c697d4cb33f40743b4?pvs=21", category: "Video", complexity: "Extreme", roi: "Scale", apis: ["Veo3", "N8n"] },
    { title: "AI Ad Content Creator", link: "https://www.notion.so/AI-Ad-Content-Creator-274d87f9d70f8124a485c6b22478ec4b?pvs=21", category: "Ads", complexity: "High", roi: "Performance", apis: ["GPT-4 Vision", "FB Ads"] },
    { title: "AI Copywriting Team", link: "https://www.notion.so/AI-Copywriting-Team-274d87f9d70f81d4bb63c6d70fc48630?pvs=21", category: "Content", complexity: "High", roi: "Scale", apis: ["Claude 3", "GPT-4"] },
    { title: "Animal Battle Shorts Creator", link: "https://www.notion.so/Animal-Battle-Shorts-Creator-274d87f9d70f81b9a38ef8eff4543cb5?pvs=21", category: "Viral", complexity: "Medium", roi: "Views", apis: ["DALL-E", "CapCut"] },
    { title: "Twitter Thread Automation System", link: "https://www.notion.so/Twitter-Thread-Automation-System-274d87f9d70f8162b7d9f3717e93b593?pvs=21", category: "Social", complexity: "Low", roi: "Reach", apis: ["Twitter API v2"] },
    { title: "Viral Shorts Generator", link: "https://www.notion.so/Viral-Shorts-Generator-274d87f9d70f81f299f6c33ed6bf1d7c?pvs=21", category: "Viral", complexity: "High", roi: "Growth", apis: ["Opus Clip", "Subs API"] },
    { title: "Seedance AI Video Generator", link: "https://www.notion.so/Seedance-AI-Video-Generator-274d87f9d70f8158bfaedfccc2a12ab1?pvs=21", category: "Video", complexity: "High", roi: "Creative", apis: ["Sora (Sim)", "Runway"] },
    { title: "Cold Email Bulk Personalizer", link: "https://www.notion.so/Cold-Email-Bulk-Personalizer-274d87f9d70f81acab2fc3137c9b6f64?pvs=21", category: "Outreach", complexity: "High", roi: "Response Rate", apis: ["Clay", "GPT-4"] },
    { title: "Carousel Auto-Poster", link: "https://www.notion.so/Carousel-Auto-Poster-274d87f9d70f811489aadb3b91e703b9?pvs=21", category: "Social", complexity: "Medium", roi: "Engagement", apis: ["LinkedIn", "PDF Gen"] },
    { title: "ASMR Shorts Generator", link: "https://www.notion.so/ASMR-Shorts-Generator-274d87f9d70f8131818ce86c8784b8ca?pvs=21", category: "Viral", complexity: "Medium", roi: "Niche", apis: ["Audio Gen", "Stock"] },
];

export function AutomationsLibrary() {
    return (
        <section className="py-24 px-4 md:px-6 relative overflow-hidden bg-black/40" id="automations">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium uppercase tracking-wider">
                            <Zap className="w-3 h-3 text-purple-400" />
                            Immediate ROI Engine
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">30+ Plug & Play</span>
                            <br />
                            n8n Workflows
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            I don't just talk about efficiency; I deploy it. This is my personal arsenal of production-ready automations.
                            <span className="text-white font-medium ml-1">
                                I can adapt and deploy any of these into your ecosystem within days.
                            </span>
                        </p>
                    </div>

                    <div className="flex gap-4 text-sm text-neutral-400 hidden lg:flex">
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2 border border-white/5">
                            <Bot className="w-4 h-4 text-purple-400" /> 37+ Agents
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2 border border-white/5">
                            <TrendingUp className="w-4 h-4 text-purple-400" /> High ROI
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2 border border-white/5">
                            <Layers className="w-4 h-4 text-purple-400" /> n8n Native
                        </div>
                    </div>
                </div>

                {/* Table Container - Fixed scroll and z-index */}
                <div className="relative border border-white/10 rounded-3xl overflow-hidden bg-black/40 shadow-2xl backdrop-blur-sm z-10">

                    <ScrollArea className="h-[600px] w-full" type="always">
                        <Table>
                            <TableHeader className="bg-black/80 sticky top-0 z-10 backdrop-blur-md">
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="text-neutral-400 font-medium w-[40%] pl-6">Automation System</TableHead>
                                    <TableHead className="text-neutral-400 font-medium">Core Function</TableHead>
                                    <TableHead className="text-neutral-400 font-medium">Complexity</TableHead>
                                    <TableHead className="text-neutral-400 font-medium">Stack & APIs</TableHead>
                                    <TableHead className="text-right text-purple-400/80 font-medium pr-6">Est. ROI</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-neutral-300">
                                {AUTOMATIONS.map((auto, i) => (
                                    <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                                        <TableCell className="font-medium text-white pl-6 flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/5 text-neutral-400 group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-colors">
                                                {getIconByCategory(auto.category)}
                                            </div>
                                            <a
                                                href={auto.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 group-hover:text-purple-300 transition-colors"
                                            >
                                                {auto.title}
                                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-white/5 border-white/10 text-neutral-400 font-normal hover:bg-white/10">
                                                {auto.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getComplexityColor(auto.complexity)}>
                                                {auto.complexity}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {auto.apis.map((api, j) => (
                                                    <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                                                        {api}
                                                    </span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-mono text-purple-400/80 pr-6">
                                            {auto.roi}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* Extra padding row at bottom so content isn't hidden by blur */}
                                <TableRow className="h-32 border-none hover:bg-transparent"><TableCell colSpan={5} /></TableRow>
                            </TableBody>
                        </Table>
                    </ScrollArea>

                    {/* Magic UI Progressive Blur at the bottom - POINTER EVENTS NONE IS CRITICAL HERE */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20">
                        <ProgressiveBlur
                            className="absolute inset-0"
                            direction="bottom"
                            blurIntensity={4}
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-20" />

                    {/* CTA Overlay on the blurred area */}
                    <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-none">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-white text-sm font-medium animate-pulse">
                            Ready to deploy
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Helpers
function getComplexityColor(level: string) {
    switch (level) {
        case "Low": return "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20";
        case "Medium": return "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/20";
        case "High": return "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border-orange-500/20";
        case "Extreme": return "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
        default: return "bg-neutral-500/10 text-neutral-400";
    }
}

function getIconByCategory(category: string) {
    switch (category) {
        case "Video": return <Video className="w-4 h-4" />;
        case "Outreach": return <Mail className="w-4 h-4" />;
        case "Ads": return <Share2 className="w-4 h-4" />;
        case "Research": return <Search className="w-4 h-4" />;
        case "Content": return <PenTool className="w-4 h-4" />;
        case "Data": return <Database className="w-4 h-4" />;
        default: return <Bot className="w-4 h-4" />;
    }
}
