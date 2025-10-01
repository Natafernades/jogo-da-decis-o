"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Home, Trophy, Gavel } from 'lucide-react';
import { Player, StoredVote } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ResultsPage() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [votes, setVotes] = useState<StoredVote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resultsData = localStorage.getItem('gameResults');
    if (resultsData) {
      const { players, votes } = JSON.parse(resultsData);
      setPlayers(players);
      setVotes(votes);
    } else {
      // No results, go home
      router.push('/');
    }
    setLoading(false);
  }, [router]);

  const results = useMemo(() => {
    if (!players.length || !votes.length) return [];

    const playerScores = players.map(player => {
        const nominationsReceived = votes.filter(vote => vote.votedOnId === player.id).length;
        return {
            ...player,
            nominations: nominationsReceived,
        }
    });

    return playerScores.sort((a, b) => b.nominations - a.nominations);

  }, [players, votes]);

  const handlePlayAgain = () => {
    localStorage.removeItem('gameResults');
    localStorage.removeItem('gameSettings');
    router.push('/');
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 text-amber-500">
                <Trophy className="h-14 w-14" />
            </div>
          <CardTitle className="font-headline text-3xl">Resultados Finais</CardTitle>
          <CardDescription>O jogo terminou. Veja o placar final.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Posição</TableHead>
                  <TableHead>Jogador</TableHead>
                  <TableHead className="text-right">Votos Recebidos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((player, index) => (
                  <TableRow key={player.id} className={index === 0 ? 'bg-amber-100 dark:bg-amber-900/30' : ''}>
                    <TableCell className="font-bold text-lg">{index + 1}º</TableCell>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell className="text-right font-bold text-lg flex items-center justify-end gap-2">
                        <Gavel className="h-4 w-4 text-muted-foreground"/>
                        {player.nominations}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
        <CardContent className="flex justify-center pt-6">
           <Button onClick={handlePlayAgain}>
                <Home className="mr-2 h-4 w-4" />
                Jogar Novamente
            </Button>
        </CardContent>
      </Card>
    </main>
  );
}
