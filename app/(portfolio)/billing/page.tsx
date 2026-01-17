"use client";

import { PricingTable } from "@clerk/nextjs";
import { Sparkles, Check } from "lucide-react";

export default function BillingPage() {
    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 py-16">
            <div className="w-full max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Planes Premium</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold">
                        Elige tu Plan
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Desbloquea todo el potencial del chat con IA. Más mensajes, mejor experiencia.
                    </p>
                </div>

                {/* Benefits Section */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Más Mensajes</h3>
                        <p className="text-sm text-muted-foreground">
                            Chatea sin límites con tu AI Twin. Hasta 20 mensajes diarios.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Check className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Soporte Prioritario</h3>
                        <p className="text-sm text-muted-foreground">
                            Acceso prioritario a nuevas funciones y soporte dedicado.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Análisis Avanzado</h3>
                        <p className="text-sm text-muted-foreground">
                            Herramientas avanzadas para reclutadores y profesionales.
                        </p>
                    </div>
                </div>

                {/* Pricing Table */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-3xl -z-10" />

                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-2xl">
                        <PricingTable />
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-12">
                    <p className="text-sm text-muted-foreground">
                        💳 Pago seguro procesado por Stripe · Cancela cuando quieras
                    </p>
                </div>
            </div>
        </div>
    );
}
