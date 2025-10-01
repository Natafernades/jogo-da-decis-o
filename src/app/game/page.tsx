"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Loader2, CheckCircle, XCircle, User, Crown } from "lucide-react";
import type { GameSettings, Player, VoteStage, StoredVote } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";


export default function GamePage() {
  const router = useRouter();

  const [settings, setSettings] = useState<GameSettings | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [round, setRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerBeingVotedOnIndex, setPlayerBeingVotedOnIndex] = useState(1);
  
  const [allVotes, setAllVotes] = useState<StoredVote[]>([]);
  const [currentVoteStage1, setCurrentVoteStage1] = useState<'assertive' | 'inassertive' | null>(null);
  const [voteStage, setVoteStage] = useState<VoteStage>('stage1');
  const adBanner = useMemo(() => PlaceHolderImages.find(img => img.id === 'paid-ad-banner'), []);


  useEffect(() => {
    const storedSettings = localStorage.getItem("gameSettings");
    if (!storedSettings) {
      router.push("/");
      return;
    }
    const parsedSettings: GameSettings = JSON.parse(storedSettings);
    setSettings(parsedSettings);

    const initialPlayers: Player[] = Array.from({ length: parsedSettings.numPlayers }, (_, i) => ({
      id: `player-${i}`,
      name: parsedSettings.playerNames[i],
    }));
    setPlayers(initialPlayers);

    // Initial voter is player 0, person being voted on is player 1
    setCurrentPlayerIndex(0);
    setPlayerBeingVotedOnIndex(1 % parsedSettings.numPlayers);

  }, [router]);

  const currentPlayer = useMemo(() => players[currentPlayerIndex], [players, currentPlayerIndex]);
  const playerBeingVotedOn = useMemo(() => players[playerBeingVotedOnIndex], [players, playerBeingVotedOnIndex]);

  const handleStage1Vote = (vote: 'assertive' | 'inassertive') => {
    setCurrentVoteStage1(vote);
    setVoteStage('stage2');
  };

  const handleStage2Vote = (vote: 'truth' | 'lie') => {
    if (!currentVoteStage1 || !settings) return;

    const newVote: StoredVote = {
      round,
      voterId: currentPlayer.id,
      votedOnId: playerBeingVotedOn.id,
      stage1: currentVoteStage1,
      stage2: vote,
    };
    setAllVotes(prev => [...prev, newVote]);

    // Reset for next voter
    setCurrentVoteStage1(null);
    setVoteStage('stage1');

    // --- Advance Logic ---
    let nextVoterIndex = (currentPlayerIndex + 1) % players.length;
    
    // Skip the player who is currently being voted on
    if (nextVoterIndex === playerBeingVotedOnIndex) {
      nextVoterIndex = (nextVoterIndex + 1) % players.length;
    }

    // Check if a full voting cycle for this player is complete
    if (nextVoterIndex === (playerBeingVotedOnIndex + 1) % players.length) {
      // All players have voted on the current target, move to the next target
      const nextPlayerBeingVotedOnIndex = (playerBeingVotedOnIndex + 1) % players.length;
      
      // Check for end of round
      if (nextPlayerBeingVotedOnIndex === 0) { // Completed a full round of everyone being voted on
        if(round + 1 > settings.numRounds) {
          // GAME OVER
          localStorage.setItem('gameResults', JSON.stringify({ players, votes: [...allVotes, newVote] }));
          router.push('/results');
          return;
        }
        setRound(r => r + 1);
      }
      
      setPlayerBeingVotedOnIndex(nextPlayerBeingVotedOnIndex);
      // The new voter is the player after the newly selected "voted on" player
      let newVoterIndex = (nextPlayerBeingVotedOnIndex + 1) % players.length;
      setCurrentPlayerIndex(newVoterIndex);

    } else {
      // Just move to the next voter
      setCurrentPlayerIndex(nextVoterIndex);
    }
  };
  
  if (!settings || !currentPlayer || !playerBeingVotedOn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // Simple layout to avoid scrolling
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          <header className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-headline font-bold">Jogo da Decisão</h1>
              <span className="text-xl font-semibold text-muted-foreground">(Rodada {round}/{settings.numRounds})</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
              <Home className="h-5 w-5"/>
              <span className="sr-only">Voltar ao início</span>
            </Button>
          </header>

          <Card className="shadow-xl">
            <CardHeader>
              <div className="space-y-2 text-center mb-6">
                <p className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2"><Crown className="h-5 w-5 text-primary"/>Jogador a votar</p>
                <CardTitle className="text-4xl font-headline">{currentPlayer.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 text-center -mt-4 mb-8">
                <p className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2"><User className="h-5 w-5 text-rose-500"/>Sendo avaliado</p>
                <p className="text-3xl font-bold">{playerBeingVotedOn.name}</p>
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
      <footer className="w-full p-4 mt-auto">
        <div className="container mx-auto text-center text-xs text-muted-foreground">
          <p>Propaganda Remunerada</p>
          {adBanner && (
            <div className="mt-2 flex justify-center">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src={adBanner.imageUrl}
                  alt={adBanner.description}
                  width={728}
                  height={90}
                  data-ai-hint={adBanner.imageHint}
                  className="rounded-lg"
                />
              </a>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}