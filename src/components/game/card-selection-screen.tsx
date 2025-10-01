import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, User, HelpCircle } from "lucide-react";
import type { Player, GameSettings, GameCard } from "@/lib/types";

interface CardSelectionScreenProps {
    settings: GameSettings;
    round: number;
    playerBeingVotedOn: Player;
    activeCard: GameCard;
    onSelectAnswer: (answer: string) => void;
    onGoHome: () => void;
}

export const CardSelectionScreen = React.memo(({ settings, round, playerBeingVotedOn, activeCard, onSelectAnswer, onGoHome }: CardSelectionScreenProps) => {
    return (
        <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-2xl">
              <header className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-headline font-bold">Jogo da Decisão</h1>
                    <span className="text-xl font-semibold text-muted-foreground">(Rodada {round}/{settings.numRounds})</span>
                </div>
                <Button variant="ghost" size="icon" onClick={onGoHome}>
                  <Home className="h-5 w-5"/>
                  <span className="sr-only">Voltar ao início</span>
                </Button>
              </header>

              <Card className="shadow-xl">
                <CardHeader>
                    <div className="space-y-2 text-center mb-6">
                        <p className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2"><User className="h-5 w-5 text-rose-500"/>Sendo avaliado</p>
                        <CardTitle className="text-4xl font-headline">{playerBeingVotedOn.name}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <p className="font-bold text-xl">{activeCard.theme}</p>
                    <p className="text-2xl font-semibold"><HelpCircle className="inline h-6 w-6 mr-2 text-muted-foreground"/>{activeCard.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {activeCard.answers.map((ans, idx) => (
                            <Button
                                key={idx}
                                size="lg"
                                className={`h-24 text-lg flex-col gap-1 ${ans.color === 'azul' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
                                onClick={() => onSelectAnswer(ans.text)}
                            >
                                {ans.text}
                            </Button>
                        ))}
                    </div>
                </CardContent>
              </Card>
            </div>
        </div>
    );
});

CardSelectionScreen.displayName = 'CardSelectionScreen';
