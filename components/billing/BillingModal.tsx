"use client";

import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Infinity, MessageSquare, Sparkles, Check } from "lucide-react";

interface BillingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BillingModal({ open, onOpenChange }: BillingModalProps) {
  const { isSignedIn } = useUser();

  const handleUpgrade = () => {
    // Close this modal
    onOpenChange(false);

    // Redirect to billing page with PricingTable
    window.location.href = '/billing';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Planes de suscripción
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Elige el plan que mejor se adapte a tus necesidades
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-6">
          {/* Free Plan */}
          <div className="relative p-6 rounded-2xl border-2 border-border bg-card">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">Gratis</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </div>

              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Hasta 10 mensajes al día</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Historial de conversaciones</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Experiencia personalizada</span>
                </li>
              </ul>

              <Button
                variant="outline"
                className="w-full mt-6"
                disabled
              >
                Plan actual
              </Button>
            </div>
          </div>

          {/* Recruiter Plan */}
          <div className="relative p-6 rounded-2xl border-2 border-primary/50 bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                RECOMENDADO
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Premium</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">1€</span>
                <span className="text-muted-foreground">/mes</span>
              </div>

              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Para demostrar expertise</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>20 mensajes diarios</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Soporte prioritario</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Análisis básico</span>
                </li>
              </ul>

              <Button
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                onClick={handleUpgrade}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Actualizar ahora
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
