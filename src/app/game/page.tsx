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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getRecommendation } from "@/app/actions";
import type { GameSettings, Player } from "@/lib/types";
import type { RecommendationOutput } from "@/ai/flows/ai-game-recommendation";
import { BrainCircuit, Crown, Gavel, Home, Loader2, ShieldCheck, User, Users } from "lucide-react";
import { AdBanner } from "@/components/ad-banner";

export default function GamePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [settings, setSettings] = useState<GameSettings | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [round, setRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [votingHistory, setVotingHistory] = useState<Record<string, Record<string, number>>>({});
  const [recommendation, setRecommendation] = useState<RecommendationOutput | null>(null);
  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

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

    const initialHistory: Record<string, Record<string, number>> = {};
    initialPlayers.forEach(p => {
        initialHistory[p.name] = {};
    });
    setVotingHistory(initialHistory);

  }, [router]);

  const currentPlayer = useMemo(() => players[currentPlayerIndex], [players, currentPlayerIndex]);
  const otherPlayers = useMemo(() => players.filter(p => p.id !== currentPlayer?.id), [players, currentPlayer]);
  
  const handleVote = (votedPlayer: Player) => {
    // Update nominations
    setPlayers(prev =>
      prev.map(p =>
        p.id === votedPlayer.id ? { ...p, nominations: p.nominations + 1 } : p
      )
    );

    // Update voting history
    setVotingHistory(prev => {
        const newHistory = {...prev};
        if(!newHistory[currentPlayer.name]) newHistory[currentPlayer.name] = {};
        newHistory[currentPlayer.name][votedPlayer.name] = (newHistory[currentPlayer.name][votedPlayer.name] || 0) + 1;
        return newHistory;
    });

    toast({
      title: "Voto Computado!",
      description: `${currentPlayer.name} votou em ${votedPlayer.name}.`,
    });

    // Advance to next player or round
    if (currentPlayerIndex === players.length - 1) {
      setRound(prev => prev + 1);
      setCurrentPlayerIndex(0);
    } else {
      setCurrentPlayerIndex(prev => prev + 1);
    }
  };

  const handleGetRecommendation = async () => {
    if (!currentPlayer) return;
    setIsRecommendationLoading(true);
    setRecommendation(null);
    
    const result = await getRecommendation({
        playerNames: players.map(p => p.name),
        votingHistory,
        currentPlayer: currentPlayer.name,
    });

    setIsRecommendationLoading(false);
    if ("error" in result) {
      toast({
        variant: "destructive",
        title: "Erro na IA",
        description: result.error,
      });
    } else {
      setRecommendation(result);
      setShowRecommendation(true);
    }
  };

  if (!settings || !currentPlayer) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary"/>
                <h1 className="text-3xl font-headline font-bold">Jogo da Decisão</h1>
            </div>
          <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
            <Home className="h-5 w-5"/>
            <span className="sr-only">Voltar ao início</span>
          </Button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Jogadores</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {players.map(player => (
                            <li key={player.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{player.name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{player.name}</span>
                                    {player.id === currentPlayer.id && <Crown className="h-4 w-4 text-amber-500"/>}
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
                <CardDescription className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-primary"/> Vez de <span className="font-bold text-foreground">{currentPlayer.name}</span> votar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Escolha um jogador para nominar:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {otherPlayers.map(player => (
                        <Button key={player.id} variant="secondary" className="h-auto flex-col p-4 gap-2" onClick={() => handleVote(player)}>
                            <User className="h-6 w-6"/>
                            <span className="text-base">{player.name}</span>
                        </Button>
                    ))}
                  </div>
                </div>
                <Separator/>
                <div className="space-y-4">
                     <h3 className="font-semibold text-lg">Assistente de Estratégia</h3>
                     <p className="text-sm text-muted-foreground">Não tem certeza em quem votar? Deixe nossa IA analisar o histórico de votos e sugerir uma jogada estratégica.</p>
                    <Button onClick={handleGetRecommendation} disabled={isRecommendationLoading}>
                        {isRecommendationLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <BrainCircuit className="mr-2 h-4 w-4" />
                        )}
                        Obter Recomendação da IA
                    </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <Dialog open={showRecommendation} onOpenChange={setShowRecommendation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
              <ShieldCheck className="h-6 w-6 text-primary"/>
              Recomendação Estratégica
            </DialogTitle>
            <DialogDescription>
              Baseado no histórico de votações, aqui está uma sugestão.
            </DialogDescription>
          </DialogHeader>
          {recommendation && (
            <div className="space-y-4 py-4">
              <Alert>
                <AlertTitle className="font-semibold">Jogadores Recomendados:</AlertTitle>
                <AlertDescription>
                    <ul className="list-disc pl-5">
                        {recommendation.recommendedPlayers.map(p => <li key={p}>{p}</li>)}
                    </ul>
                </AlertDescription>
              </Alert>
              <div>
                <h4 className="font-semibold mb-2">Raciocínio:</h4>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border">{recommendation.reasoning}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
