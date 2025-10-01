import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, User, Swords } from "lucide-react";
import type { Player } from "@/lib/types";

interface ArmWrestlingSelectionScreenProps {
    challenger: Player;
    opponents: Player[];
    onOpponentSelect: (opponent: Player) => void;
    onGoHome: () => void;
}

export const ArmWrestlingSelectionScreen = React.memo(({ challenger, opponents, onOpponentSelect, onGoHome }: ArmWrestlingSelectionScreenProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
           <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
               <div className="w-full max-w-2xl">
                    <header className="flex justify-between items-center mb-4">
                       <h1 className="text-3xl font-headline font-bold">Queda de Braço!</h1>
                       <Button variant="ghost" size="icon" onClick={onGoHome}>
                           <Home className="h-5 w-5"/>
                           <span className="sr-only">Voltar ao início</span>
                       </Button>
                   </header>
                   <Card className="shadow-xl">
                       <CardHeader className="text-center">
                          <div className="mx-auto mb-4 text-primary"><Swords className="h-14 w-14"/></div>
                          <CardTitle className="text-4xl font-headline">{challenger.name}, escolha seu oponente!</CardTitle>
                       </CardHeader>
                       <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                           {opponents.map(opponent => (
                               <Button key={opponent.id} size="lg" className="h-28 text-xl" onClick={() => onOpponentSelect(opponent)}>
                                   <User className="mr-2"/> {opponent.name}
                               </Button>
                           ))}
                       </CardContent>
                   </Card>
               </div>
           </div>
        </div>
    )
});

ArmWrestlingSelectionScreen.displayName = 'ArmWrestlingSelectionScreen';
