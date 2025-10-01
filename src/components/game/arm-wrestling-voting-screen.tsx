import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { Player } from "@/lib/types";

interface ArmWrestlingVotingScreenProps {
    challenger1: Player;
    challenger2: Player;
    voter: Player;
    onVote: (winner: Player) => void;
}

export const ArmWrestlingVotingScreen = React.memo(({ challenger1, challenger2, voter, onVote }: ArmWrestlingVotingScreenProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
           <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
               <div className="w-full max-w-2xl">
                    <header className="flex justify-between items-center mb-4">
                       <h1 className="text-3xl font-headline font-bold">Queda de Braço - Votação</h1>
                    </header>
                   <Card className="shadow-xl">
                       <CardHeader className="text-center">
                          <div className="mx-auto mb-4 text-muted-foreground"><p className="text-lg">Vez de: <span className="font-bold text-primary">{voter.name}</span></p></div>
                          <CardTitle className="text-4xl font-headline">Quem você acha que vence?</CardTitle>
                       </CardHeader>
                       <CardContent className="grid grid-cols-2 gap-6">
                           <div className="text-center space-y-4">
                              <p className="text-3xl font-bold">{challenger1.name}</p>
                              <Button size="lg" className="h-24 w-full text-xl" onClick={() => onVote(challenger1)}>
                                 <CheckCircle className="mr-2"/>Votar
                              </Button>
                           </div>
                            <div className="text-center space-y-4">
                              <p className="text-3xl font-bold">{challenger2.name}</p>
                              <Button size="lg" className="h-24 w-full text-xl" onClick={() => onVote(challenger2)}>
                                 <CheckCircle className="mr-2"/>Votar
                              </Button>
                           </div>
                       </CardContent>
                   </Card>
               </div>
           </div>
        </div>
   )
});

ArmWrestlingVotingScreen.displayName = 'ArmWrestlingVotingScreen';
