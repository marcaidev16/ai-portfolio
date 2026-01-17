"use client";

import { useState, useEffect } from "react";
import { Loader2, Briefcase, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";

interface AssessmentResult {
    matchScore: number;
    summary: string;
    strengths: string[];
    gaps: string[];
    verdict: "High Match" | "Potential Match" | "Low Match";
}

export function JobFitAssessment() {
    const [jobDescription, setJobDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [_, setError] = useState<string | null>(null);

    // Simulate loading progress
    useEffect(() => {
        if (!isLoading) {
            setLoadingProgress(0);
            return;
        }

        const interval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev >= 90) return prev; // Hold at 90% until real data arrives
                return prev + Math.random() * 10;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!jobDescription.trim()) return;

        setIsLoading(true);
        setLoadingProgress(0);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/job-fit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobDescription }),
            });

            if (!response.ok) throw new Error("Failed to analyze job fit");

            const data = await response.json();

            // Complete animation to 100%
            setLoadingProgress(100);

            // Small delay to let animation finish before snapping result
            setTimeout(() => {
                setResult(data);
                setIsLoading(false);
            }, 600);

        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    // Color helper for verdict
    const getScoreHexColor = (score: number) => {
        if (score >= 80) return "#10b981"; // emerald-500
        if (score >= 50) return "#eab308"; // yellow-500
        return "#ef4444"; // red-500
    };

    const getScoreTextColor = (score: number) => {
        if (score >= 80) return "text-emerald-500";
        if (score >= 50) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <section className="py-20 px-4 md:px-6 relative overflow-hidden" id="job-fit">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        AI Recruiter Tool
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Do I fit the role?
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto text-lg">
                        Paste a job description below and let my AI Twin honestly analyze if I'm a good match for your team.
                    </p>
                </div>

                <div className="relative z-10">
                    {/* Input Card */}
                    <div className={cn(
                        "bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-500",
                        (result || isLoading) ? "mb-8" : ""
                    )}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <Textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste job description here (e.g. 'Senior Frontend Engineer at TechCorp...')"
                                    className="w-full min-h-[150px] bg-white/5 border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-transparent resize-none transition-all scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent text-base"
                                />
                                <div className="absolute bottom-4 right-4 translate-y-0">
                                    <Button
                                        type="submit"
                                        disabled={isLoading || !jobDescription.trim()}
                                        className={cn(
                                            "rounded-full px-6 transition-all duration-300",
                                            isLoading ? "bg-primary/80" : "bg-primary hover:bg-primary/90 hover:scale-105"
                                        )}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                Analyze Fit <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Results Display */}
                    {(result || isLoading) && (
                        <div className="grid md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-10 fade-in duration-700">
                            {/* Score Card */}
                            <div className="md:col-span-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
                                <div className="relative flex items-center justify-center py-4">
                                    <AnimatedCircularProgressBar
                                        max={100}
                                        min={0}
                                        value={result ? result.matchScore : loadingProgress}
                                        gaugePrimaryColor={result ? getScoreHexColor(result.matchScore) : "#ffffff"}
                                        gaugeSecondaryColor="rgba(255, 255, 255, 0.1)"
                                        className={cn(
                                            "font-bold text-4xl",
                                            result ? getScoreTextColor(result.matchScore) : "text-white"
                                        )}
                                    />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">Match Score</p>
                                    <h3 className={cn("text-xl font-bold mt-1", result ? getScoreTextColor(result.matchScore) : "text-white")}>
                                        {result?.verdict || "Calculating..."}
                                    </h3>
                                </div>
                            </div>

                            {/* Analysis Details */}
                            <div className="md:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
                                {isLoading ? (
                                    <div className="h-full flex flex-col items-center justify-center space-y-4 text-muted-foreground animate-pulse">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
                                        <p>Analyzing profile vs job requirements...</p>
                                    </div>
                                ) : (
                                    <>
                                        {result?.summary && (
                                            <div className="animate-in fade-in duration-500">
                                                <h4 className="flex items-center gap-2 text-lg font-semibold text-white mb-2">
                                                    <Briefcase className="h-5 w-5 text-primary" />
                                                    Summary
                                                </h4>
                                                <p className="text-neutral-300 leading-relaxed">
                                                    {result.summary}
                                                </p>
                                            </div>
                                        )}

                                        <div className="grid sm:grid-cols-2 gap-8">
                                            {result?.strengths && (
                                                <div className="space-y-3 animate-in fade-in slide-in-from-left-5 duration-500 delay-100">
                                                    <h4 className="text-sm font-medium text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4" /> Why I fit
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {result.strengths.map((str, i) => (
                                                            <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                                                {str}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {result?.gaps && (
                                                <div className="space-y-3 animate-in fade-in slide-in-from-right-5 duration-500 delay-200">
                                                    <h4 className="text-sm font-medium text-amber-400 uppercase tracking-wider flex items-center gap-2">
                                                        <AlertTriangle className="h-4 w-4" /> Potential Gaps
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {result.gaps.map((gap, i) => (
                                                            <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                                                                {gap}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
