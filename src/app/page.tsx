"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { BalanceIcon } from "@/components/icons";
import { Users, LogIn, BookOpenCheck, Repeat } from "lucide-react";
import type { GameSettings } from "@/lib/types";

export default function GameSetupPage() {
  const router = useRouter();
  const [numPlayers, setNumPlayers] = useState<number>(3);
  const [numRounds, setNumRounds] = useState<number>(1);
  const [playerNames, setPlayerNames] = useState<{ [key: number]: string }>({});
  const [useOnlineCards, setUseOnlineCards] = useState(false);

  const handlePlayerNameChange = (index: number, name: string) => {
    setPlayerNames((prev) => ({ ...prev, [index]: name }));
  };

  const isSetupComplete = useMemo(() => {
    if (numRounds < 1) return false;
    for (let i = 0; i < numPlayers; i++) {
      if (!playerNames[i] || playerNames[i].trim() === "") {
        return false;
      }
    }
    return true;
  }, [numPlayers, numRounds, playerNames]);
  
  const handleStartGame = () => {
    if (!isSetupComplete) return;

    const settings: GameSettings = {
      numPlayers,
      numRounds,
      useOnlineCards,
      playerNames,
    };
    
    localStorage.setItem("gameSettings", JSON.stringify(settings));
    router.push("/game");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 text-primary">
            <BalanceIcon className="h-12 w-12" />
          </div>
          <CardTitle className="font-headline text-3xl">Jogo da Decisão</CardTitle>
          <CardDescription>Configure sua partida e que comecem os jogos!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="num-players" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Jogadores
              </Label>
              <Select
                value={String(numPlayers)}
                onValueChange={(value) => setNumPlayers(Number(value))}
              >
                <SelectTrigger id="num-players">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} Jogador{num > 1 ? "es" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="num-rounds" className="flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                Rodadas
              </Label>
              <Input
                id="num-rounds"
                type="number"
                value={numRounds}
                onChange={(e) => setNumRounds(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-muted/50">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <BookOpenCheck className="h-4 w-4" />
                Ativar Cartas Online
              </Label>
              <p className="text-xs text-muted-foreground">
                Habilita funcionalidades extras durante o jogo.
              </p>
            </div>
            <Switch
              checked={useOnlineCards}
              onCheckedChange={setUseOnlineCards}
            />
          </div>

          {numPlayers > 0 && (
            <div className="space-y-4">
              <Label className="font-medium">Nomes dos Jogadores</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: numPlayers }, (_, i) => (
                  <div key={i} className="space-y-1">
                    <Input
                      id={`player-${i}`}
                      placeholder={`Jogador ${i + 1}`}
                      value={playerNames[i] || ""}
                      onChange={(e) => handlePlayerNameChange(i, e.target.value)}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleStartGame}
            disabled={!isSetupComplete}
          >
            Começar Jogo
            <LogIn className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
