"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Home,
  Loader2,
  Crown,
  Gavel,
  Users,
  User,
  CheckCircle,
  XCircle,
  HelpCircle,
  Award,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { GameSettings, Player, VoteStage, Vote } from "@/lib/types";
import { AdBanner } from "@/components/ad-banner";

export default function GamePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [settings, setSettings] = useState<GameSettings | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [round, setRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerBeingVotedOnIndex, setPlayerBeingVotedOnIndex] = useState(1);

  const [currentVote, setCurrentVote] = useState<Vote>({ stage1: null, stage2: null });
  const [voteStage, setVoteStage] = useState<VoteStage>('stage1');

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
      nominations: 0,
    }));
    setPlayers(initialPlayers);
  }, [router]);

  const currentPlayer = useMemo(() => players[currentPlayerIndex], [players, currentPlayerIndex]);
  const playerBeingVotedOn = useMemo(() => players[playerBeingVotedOnIndex], [players, playerBeingVotedOnIndex]);

  const handleStage1Vote = (vote: 'assertive' | 'inassertive') => {
    setCurrentVote(prev => ({ ...prev, stage1: vote }));
    setVoteStage('stage2');
  };

  const handleStage2Vote = (vote: 'truth' | 'lie') => {
    if (!currentVote.stage1) return; // Should not happen

    // Update nominations for the player being voted on
    setPlayers(prev =>
      prev.map(p =>
        p.id === playerBeingVotedOn.id ? { ...p, nominations: p.nominations + 1 } : p
      )
    );

    toast({
      title: "Voto Computado!",
      description: `${currentPlayer.name} votou em ${playerBeingVotedOn.name}.`,
    });

    // Reset for next voter
    setCurrentVote({ stage1: null, stage2: null });
    setVoteStage('stage1');

    // Advance to next voter
    let nextVoterIndex = (currentPlayerIndex + 1) % players.length;
    // Skip the player who is currently being voted on
    if (nextVoterIndex === playerBeingVotedOnIndex) {
      nextVoterIndex = (nextVoterIndex + 1) % players.length;
    }

    // Check if a full round of voting for this player is complete
    if (nextVoterIndex === (playerBeingVotedOnIndex + 1) % players.length) {
      // All players have voted, move to the next player to be voted on
      const nextPlayerBeingVotedOnIndex = (playerBeingVotedOnIndex + 1) % players.length;
      setPlayerBeingVotedOnIndex(nextPlayerBeingVotedOnIndex);

      // The new voter is the player after the newly selected "voted on" player
      let newVoterIndex = (nextPlayerBeingVotedOnIndex + 1) % players.length;
      setCurrentPlayerIndex(newVoterIndex);
      
      // If we've circled back to the first player, a full game round is complete
      if (nextPlayerBeingVotedOnIndex === 0) {
        setRound(r => r + 1);
      }

    } else {
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

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary"/>
            <h1 className="text-3xl font-headline font-bold">Jogo da Decisão</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
            <Home className="h-5 w-5"/>
            <span className="sr-only">Voltar ao início</span>
          </Button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Jogadores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {players.map(player => (
                    <li key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{player.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                        {player.id === currentPlayer.id && <Crown className="h-4 w-4 text-amber-500" title="Votando agora"/>}
                        {player.id === playerBeingVotedOn.id && <User className="h-4 w-4 text-rose-500" title="Recebendo Votos"/>}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Gavel className="h-4 w-4"/>
                        <span>{player.nominations} {player.nominations === 1 ? "voto" : "votos"}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <AdBanner/>
          </aside>

          <main className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-headline">Rodada {round}</CardTitle>
                 <CardDescription className="flex items-center gap-2 pt-1">
                  <Crown className="h-4 w-4 text-primary"/> Vez de <span className="font-bold text-foreground">{currentPlayer.name}</span> votar em <span className="font-bold text-foreground">{playerBeingVotedOn.name}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Etapa 1 */}
                <div className={`space-y-3 transition-opacity duration-300 ${voteStage !== 'stage1' ? 'opacity-30' : ''}`}>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary"/>
                    Etapa 1: Classificação
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button size="lg" className="h-20 flex-col gap-1 bg-blue-600 hover:bg-blue-700 text-white" disabled={voteStage !== 'stage1'} onClick={() => handleStage1Vote('assertive')}>
                      <CheckCircle/>
                      Assertivo
                    </Button>
                    <Button size="lg" className="h-20 flex-col gap-1 bg-red-600 hover:bg-red-700 text-white" disabled={voteStage !== 'stage1'} onClick={() => handleStage1Vote('inassertive')}>
                      <XCircle/>
                      Inassertivo
                    </Button>
                  </div>
                </div>

                {/* Etapa 2 */}
                <div className={`space-y-3 transition-opacity duration-300 ${voteStage !== 'stage2' ? 'opacity-30' : ''}`}>
                   <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary"/>
                    Etapa 2: Julgamento
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                     <Button size="lg" className="h-20 flex-col gap-1 bg-green-600 hover:bg-green-700 text-white" disabled={voteStage !== 'stage2'} onClick={() => handleStage2Vote('truth')}>
                      Verdade
                    </Button>
                    <Button size="lg" className="h-20 flex-col gap-1 bg-yellow-500 hover:bg-yellow-600 text-white" disabled={voteStage !== 'stage2'} onClick={() => handleStage2Vote('lie')}>
                      Mentira
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
