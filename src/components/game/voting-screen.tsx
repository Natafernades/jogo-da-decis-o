import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, User, Crown, CheckCircle, XCircle } from "lucide-react";
import type { Player, GameSettings, VoteStage } from "@/lib/types";

interface VotingScreenProps {
    settings: GameSettings;
    round: number;
    playerBeingVotedOn: Player;
    currentPlayer: Player;
    selectedAnswer: string | null;
    onVote: (stage1: 'assertive' | 'inassertive', stage2: 'truth' | 'lie') => void;
    onGoHome: () => void;
}

export const VotingScreen = React.memo(({ settings, round, playerBeingVotedOn, currentPlayer, selectedAnswer, onVote, onGoHome }: VotingScreenProps) => {
    const [voteStage, setVoteStage] = React.useState<VoteStage>('stage1');
    const [stage1Vote, setStage1Vote] = React.useState<'assertive' | 'inassertive' | null>(null);

    React.useEffect(() => {
      // Reset local state when the player being voted on changes
      setVoteStage('stage1');
      setStage1Vote(null);
    }, [playerBeingVotedOn, currentPlayer]);


    const handleStage1Vote = (vote: 'assertive' | 'inassertive') => {
        setStage1Vote(vote);
        setVoteStage('stage2');
    };

    const handleStage2Vote = (vote: 'truth' | 'lie') => {
        if (!stage1Vote) return;
        onVote(stage1Vote, vote);
    };

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
                    <div className="space-y-2 text-center mb-8">
                        <p className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2"><User className="h-5 w-5 text-rose-500"/>Sendo avaliado</p>
                        <p className="text-3xl font-bold">{playerBeingVotedOn.name}</p>
                        {settings.useOnlineCards && selectedAnswer && (
                        <blockquote className="text-xl italic border-l-4 pl-4 mt-2">"{selectedAnswer}"</blockquote>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="space-y-2 text-center mb-6">
                    <p className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2"><Crown className="h-5 w-5 text-primary"/>Jogador a votar</p>
                    <CardTitle className="text-4xl font-headline">{currentPlayer.name}</CardTitle>
                </div>

                <div className={`space-y-3 transition-opacity duration-300 ${voteStage !== 'stage1' ? 'opacity-30' : ''}`}>
                    <h3 className="font-semibold text-lg flex items-center gap-2 justify-center">
                    Etapa 1: Classificação
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                    <Button size="lg" className="h-24 flex-col gap-1 bg-blue-600 hover:bg-blue-700 text-white text-lg" disabled={voteStage !== 'stage1'} onClick={() => handleStage1Vote('assertive')}>
                        <CheckCircle/>
                        Assertivo
                    </Button>
                    <Button size="lg" className="h-24 flex-col gap-1 bg-red-600 hover:bg-red-700 text-white text-lg" disabled={voteStage !== 'stage1'} onClick={() => handleStage1Vote('inassertive')}>
                        <XCircle/>
                        Inassertivo
                    </Button>
                    </div>
                </div>
                <div className={`space-y-3 transition-opacity duration-300 ${voteStage !== 'stage2' ? 'opacity-30' : ''}`}>
                    <h3 className="font-semibold text-lg flex items-center gap-2 justify-center">
                    Etapa 2: Julgamento
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                    <Button size="lg" className="h-24 flex-col gap-1 bg-green-600 hover:bg-green-700 text-white text-lg" disabled={voteStage !== 'stage2'} onClick={() => handleStage2Vote('truth')}>
                        Verdade
                    </Button>
                    <Button size="lg" className="h-24 flex-col gap-1 bg-yellow-500 hover:bg-yellow-600 text-white text-lg" disabled={voteStage !== 'stage2'} onClick={() => handleStage2Vote('lie')}>
                        Mentira
                    </Button>
                    </div>
                </div>
                </CardContent>
            </Card>
            </div>
        </div>
    );
});

VotingScreen.displayName = 'VotingScreen';
