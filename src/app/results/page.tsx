"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Home, BarChart, Download } from 'lucide-react';
import type { Player, StoredVote, GameResults } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// --- Categorias de Verdade ---
function getTruthCategory(percentage: number): string {
  if (percentage >= 96) return "🧠 Sábio da Verdade – Íntegro e confiável";
  if (percentage >= 91) return "🔷 Guardião da Consciência – Ético e justo";
  if (percentage >= 81) return "🔵 Construtor da Verdade – Honesto, pensa antes de agir";
  if (percentage >= 71) return "🧩 Viajante Consciente – Busca evolução, ainda em formação";
  if (percentage >= 61) return "🔄 Aprendiz de Si Mesmo – Oscilante, mas em evolução";
  if (percentage >= 51) return "🎭 Camaleão Emocional – Busca aceitação, muda conforme ambiente";
  if (percentage >= 41) return "😶 Sobrevivente Interno – Mente para se proteger";
  if (percentage >= 31) return "🌀 Fuga Emocional – Reativo, mente impulsivamente";
  if (percentage >= 21) return "🔥 Enganador Afetivo – Manipulador";
  return "⚫ Desconectado de Si – Alheio à verdade";
}

// --- Categorias de Assertividade ---
function getAssertivenessCategory(percentage: number): string {
  if (percentage >= 96) return "💎 Mestre da Inteligência Emocional – Extremamente assertivo";
  if (percentage >= 91) return "🧭 Guia Inspirador – Líder positivo, equilibra razão e emoção";
  if (percentage >= 81) return "🔷 Comunicador Autêntico – Firme e respeitoso";
  if (percentage >= 71) return "🧘 Equilibrado e Empático – Age com calma e consciência";
  if (percentage >= 61) return "🌿 Crescimento Assertivo – Em desenvolvimento";
  if (percentage >= 51) return "🎈 Intenção Positiva – Boa intenção, mas erra execução";
  if (percentage >= 41) return "🤷 Neutro/Reativo – Passivo em conflitos";
  if (percentage >= 31) return "🧨 Emocional Inconstante – Impulsivo e instável";
  if (percentage >= 21) return "⚠ Inassertivo Crônico – Evita conflitos, acumula frustrações";
  return "🔴 Bloqueado Emocionalmente – Dificuldade extrema de comunicação";
}

interface PlayerStats {
    id: string;
    name: string;
    truth: number;
    lie: number;
    assertive: number;
    inassertive: number;
    truthPercentage: number;
    assertivePercentage: number;
    truthCategory: string;
    assertivenessCategory: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const resultsData = localStorage.getItem('gameResults');
    if (resultsData) {
      const { players, votes }: GameResults = JSON.parse(resultsData);
      
      const playerStats = players.map(player => {
        const votesReceived = votes.filter(vote => vote.votedOnId === player.id);
        
        const truth = votesReceived.filter(v => v.stage2 === 'truth').length;
        const lie = votesReceived.filter(v => v.stage2 === 'lie').length;
        const assertive = votesReceived.filter(v => v.stage1 === 'assertive').length;
        const inassertive = votesReceived.filter(v => v.stage1 === 'inassertive').length;

        const totalTruthLie = truth + lie;
        const totalAssertiveInassertive = assertive + inassertive;

        const truthPercentage = totalTruthLie > 0 ? Math.round((truth / totalTruthLie) * 100) : 0;
        const assertivePercentage = totalAssertiveInassertive > 0 ? Math.round((assertive / totalAssertiveInassertive) * 100) : 0;
        
        return {
            id: player.id,
            name: player.name,
            truth,
            lie,
            assertive,
            inassertive,
            truthPercentage,
            assertivePercentage,
            truthCategory: getTruthCategory(truthPercentage),
            assertivenessCategory: getAssertivenessCategory(assertivePercentage),
        }
      });

      setResults(playerStats);
    } else {
      router.push('/');
    }
    setLoading(false);
  }, [router]);


  const handlePlayAgain = () => {
    localStorage.removeItem('gameResults');
    localStorage.removeItem('gameSettings');
    router.push('/');
  }

  const handleDownloadPDF = async () => {
    const resultsCard = document.getElementById('results-card');
    if (!resultsCard) return;

    setIsDownloading(true);

    try {
        const canvas = await html2canvas(resultsCard, {
            scale: 2, // Aumenta a resolução para melhor qualidade
            useCORS: true, 
            backgroundColor: null // Fundo transparente para o canvas
        });
        const imgData = canvas.toDataURL('image/png');
        
        // Ajusta as dimensões do PDF para o conteúdo
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('resultado-jogo-da-decisao.pdf');
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
    } finally {
        setIsDownloading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
      <Card className="w-full max-w-6xl shadow-lg" id="results-card">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 text-primary">
                <BarChart className="h-14 w-14" />
            </div>
          <CardTitle className="font-headline text-3xl">📊 Resultado Final - Jogo da Decisão</CardTitle>
          <CardDescription>O jogo terminou. Veja o placar final e as categorias.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Verdade</TableHead>
                      <TableHead>Mentira</TableHead>
                      <TableHead>Azul</TableHead>
                      <TableHead>Vermelho</TableHead>
                      <TableHead>% Verdade</TableHead>
                      <TableHead>% Azul</TableHead>
                      <TableHead>Categoria Verdade</TableHead>
                      <TableHead>Categoria Assertividade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">{player.name}</TableCell>
                        <TableCell>{player.truth}</TableCell>
                        <TableCell>{player.lie}</TableCell>
                        <TableCell>{player.assertive}</TableCell>
                        <TableCell>{player.inassertive}</TableCell>
                        <TableCell>{player.truthPercentage}%</TableCell>
                        <TableCell>{player.assertivePercentage}%</TableCell>
                        <TableCell>{player.truthCategory}</TableCell>
                        <TableCell>{player.assertivenessCategory}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </div>
        </CardContent>
        </Card>
        <div className="flex justify-center items-center gap-4 mt-6">
           <Button onClick={handlePlayAgain}>
                <Home className="mr-2 h-4 w-4" />
                Jogar Novamente
            </Button>
            <Button onClick={handleDownloadPDF} disabled={isDownloading}>
                {isDownloading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Download className="mr-2 h-4 w-4" />
                )}
                Baixar Resultado (PDF)
            </Button>
        </div>
    </main>
  );
}
