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
import { Home, Loader2, CheckCircle, XCircle, User, Crown, HelpCircle, Swords, Shield } from "lucide-react";
import type { GameSettings, Player, VoteStage, StoredVote, GameCard, GameStage, ArmWrestlingVote } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CARDS } from "@/lib/cards";


// Função para embaralhar o array (algoritmo Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


export default function GamePage() {
  const router = useRouter();

  const [settings, setSettings] = useState<GameSettings | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [round, setRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Who is voting
  const [playerBeingVotedOnIndex, setPlayerBeingVotedOnIndex] = useState(0); // Who is being evaluated
  
  const [allVotes, setAllVotes] = useState<StoredVote[]>([]);
  const [currentVoteStage1, setCurrentVoteStage1] = useState<'assertive' | 'inassertive' | null>(null);
  const [voteStage, setVoteStage] = useState<VoteStage>('stage1');
  const [gameStage, setGameStage] = useState<GameStage>('voting');

  const adBanner = useMemo(() => PlaceHolderImages.find(img => img.id === 'paid-ad-banner'), []);
  
  // Card game state
  const [shuffledDeck, setShuffledDeck] = useState<GameCard[]>([]);
  const [activeCard, setActiveCard] = useState<GameCard | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Arm wrestling state
  const [evaluatedPlayerCount, setEvaluatedPlayerCount] = useState(0);
  const [armWrestlingChallenger1, setArmWrestlingChallenger1] = useState<Player | null>(null);
  const [armWrestlingChallenger2, setArmWrestlingChallenger2] = useState<Player | null>(null);
  const [armWrestlingVotes, setArmWrestlingVotes] = useState<ArmWrestlingVote[]>([]);
  const [armWrestlingVoterIndex, setArmWrestlingVoterIndex] = useState<number | null>(null);


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

    setPlayerBeingVotedOnIndex(0);

    if (parsedSettings.useOnlineCards) {
      const deck = shuffleArray(CARDS);
      setShuffledDeck(deck);
      setGameStage('card_selection');
      setActiveCard(deck[0] || null); // Draw the first card
    } else {
      setGameStage('voting');
      // Initial voter is player 1, person being voted on is player 0
      setCurrentPlayerIndex(1 % parsedSettings.numPlayers);
    }
  }, [router]);

  const endGame = () => {
    localStorage.setItem('gameResults', JSON.stringify({ players, votes: allVotes, armWrestlingVotes }));
    router.push('/results');
  };
  
  const currentPlayer = useMemo(() => players[currentPlayerIndex], [players, currentPlayerIndex]);
  const playerBeingVotedOn = useMemo(() => players[playerBeingVotedOnIndex], [players, playerBeingVotedOnIndex]);
  const armWrestlingVoter = useMemo(() => armWrestlingVoterIndex !== null ? players[armWrestlingVoterIndex] : null, [players, armWrestlingVoterIndex]);


  const advanceToNextPlayerOrRound = () => {
    if (!settings) return;
    
    // Check if it's time for Arm Wrestling
    const newEvaluatedPlayerCount = evaluatedPlayerCount + 1;
    setEvaluatedPlayerCount(newEvaluatedPlayerCount);
    
    if (newEvaluatedPlayerCount % 3 === 0 && newEvaluatedPlayerCount > 0 && players.length > 1) {
        setGameStage('arm_wrestling_selection');
        setArmWrestlingChallenger1(playerBeingVotedOn);
        return;
    }

    // --- End of votes for the current player. Move to the next player to be voted on.
    const nextPlayerBeingVotedOnIndex = (playerBeingVotedOnIndex + 1) % players.length;

    // Check for end of round
    if (nextPlayerBeingVotedOnIndex === 0) {
      if (round + 1 > settings.numRounds) {
        endGame();
        return;
      }
      setRound(r => r + 1);
    }
    
    setPlayerBeingVotedOnIndex(nextPlayerBeingVotedOnIndex);
    
    if (settings.useOnlineCards) {
      // Draw a new card for the next player
      const nextCardIndex = allVotes.filter(v => v.cardAnswer !== undefined).length / (players.length > 1 ? players.length -1 : 1);
      if (nextCardIndex < shuffledDeck.length) {
        setActiveCard(shuffledDeck[Math.floor(nextCardIndex)]);
        setGameStage('card_selection');
        setSelectedAnswer(null); // Clear previous answer
      } else {
        // No cards left, switch to normal voting for the rest of the game
        setGameStage('voting');
        setActiveCard(null);
        let nextVoter = (nextPlayerBeingVotedOnIndex + 1) % players.length;
        setCurrentPlayerIndex(nextVoter);
      }
    } else {
        // Set the next voter for normal mode
        let nextVoter = (nextPlayerBeingVotedOnIndex + 1) % players.length;
        setCurrentPlayerIndex(nextVoter);
    }
  };

  const handleSelectCardAnswer = (answerText: string) => {
    setSelectedAnswer(answerText);
    setGameStage('voting');

    // Start voting process
    let firstVoterIndex = (playerBeingVotedOnIndex + 1) % players.length;
    setCurrentPlayerIndex(firstVoterIndex);
    setVoteStage('stage1');
    setCurrentVoteStage1(null);
  }

  const handleVote = (stage: VoteStage, vote: 'assertive' | 'inassertive' | 'truth' | 'lie') => {
    if (!settings || !currentPlayer || !playerBeingVotedOn) return;

    if (stage === 'stage1') {
      setCurrentVoteStage1(vote as 'assertive' | 'inassertive');
      setVoteStage('stage2');
      return;
    }

    // Stage 2 vote
    if (!currentVoteStage1) return;

    const newVote: StoredVote = {
      round,
      voterId: currentPlayer.id,
      votedOnId: playerBeingVotedOn.id,
      stage1: currentVoteStage1,
      stage2: vote as 'truth' | 'lie',
      cardQuestion: settings.useOnlineCards && activeCard ? activeCard.question : undefined,
      cardAnswer: settings.useOnlineCards ? selectedAnswer : undefined,
    };
    setAllVotes(prev => [...prev, newVote]);

    // Reset for next voter
    setCurrentVoteStage1(null);
    setVoteStage('stage1');
    
    // --- Advance Logic ---
    let nextVoterIndex = (currentPlayerIndex + 1) % players.length;
    
    // Skip the person being voted on
    if (nextVoterIndex === playerBeingVotedOnIndex) {
      nextVoterIndex = (nextVoterIndex + 1) % players.length;
    }

    // Have all players (except the one being voted on) voted?
    // The last voter is the one right before playerBeingVotedOnIndex.
    const lastVoterIndex = (playerBeingVotedOnIndex - 1 + players.length) % players.length;

    if (currentPlayerIndex === lastVoterIndex || players.length <= 1) {
      advanceToNextPlayerOrRound();
    } else {
      // Just move to next voter
      setCurrentPlayerIndex(nextVoterIndex);
    }
  };

  const handleArmWrestlingOpponentSelect = (opponent: Player) => {
      setArmWrestlingChallenger2(opponent);
      setGameStage('arm_wrestling_voting');
      // Find the first voter (not one of the challengers)
      let firstVoterIdx = 0;
      while (firstVoterIdx === players.findIndex(p => p.id === armWrestlingChallenger1?.id) || firstVoterIdx === players.findIndex(p => p.id === opponent.id)) {
          firstVoterIdx++;
      }
      setArmWrestlingVoterIndex(firstVoterIdx);
  };
  
  const handleArmWrestlingVote = (winner: Player) => {
    if (!armWrestlingChallenger1 || !armWrestlingChallenger2 || !armWrestlingVoter) return;

    const newVote: ArmWrestlingVote = {
        round,
        voterId: armWrestlingVoter.id,
        challenger1Id: armWrestlingChallenger1.id,
        challenger2Id: armWrestlingChallenger2.id,
        votedForWinnerId: winner.id,
    };
    setArmWrestlingVotes(prev => [...prev, newVote]);

    // Find next voter
    let nextVoterIndex = (armWrestlingVoterIndex! + 1) % players.length;
    
    const challenger1Idx = players.findIndex(p => p.id === armWrestlingChallenger1.id);
    const challenger2Idx = players.findIndex(p => p.id === armWrestlingChallenger2.id);

    // Skip challengers
    while(nextVoterIndex === challenger1Idx || nextVoterIndex === challenger2Idx) {
      nextVoterIndex = (nextVoterIndex + 1) % players.length;
    }
    
    // Check if all eligible voters have voted
    const eligibleVoters = players.length - 2;
    if (armWrestlingVotes.length + 1 >= eligibleVoters) {
        // End of arm wrestling, continue game
        setArmWrestlingChallenger1(null);
        setArmWrestlingChallenger2(null);
        setArmWrestlingVoterIndex(null);
        advanceToNextPlayerOrRound(); // This will trigger the normal advancement
    } else {
        setArmWrestlingVoterIndex(nextVoterIndex);
    }
  };
  
  if (!settings || players.length === 0 || !playerBeingVotedOn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // --- RENDER ARM WRESTLING SELECTION ---
  if (gameStage === 'arm_wrestling_selection' && armWrestlingChallenger1) {
    const opponents = players.filter(p => p.id !== armWrestlingChallenger1.id);
    return (
         <div className="flex flex-col min-h-screen bg-background">
            <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-2xl">
                     <header className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-headline font-bold">Queda de Braço!</h1>
                        <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
                            <Home className="h-5 w-5"/>
                            <span className="sr-only">Voltar ao início</span>
                        </Button>
                    </header>
                    <Card className="shadow-xl">
                        <CardHeader className="text-center">
                           <div className="mx-auto mb-4 text-primary"><Swords className="h-14 w-14"/></div>
                           <CardTitle className="text-4xl font-headline">{armWrestlingChallenger1.name}, escolha seu oponente!</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {opponents.map(opponent => (
                                <Button key={opponent.id} size="lg" className="h-28 text-xl" onClick={() => handleArmWrestlingOpponentSelect(opponent)}>
                                    <User className="mr-2"/> {opponent.name}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
         </div>
    )
  }

  // --- RENDER ARM WRESTLING VOTING ---
 if (gameStage === 'arm_wrestling_voting' && armWrestlingChallenger1 && armWrestlingChallenger2 && armWrestlingVoter) {
    return (
         <div className="flex flex-col min-h-screen bg-background">
            <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-2xl">
                     <header className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-headline font-bold">Queda de Braço - Votação</h1>
                     </header>
                    <Card className="shadow-xl">
                        <CardHeader className="text-center">
                           <div className="mx-auto mb-4 text-muted-foreground"><p className="text-lg">Vez de: <span className="font-bold text-primary">{armWrestlingVoter.name}</span></p></div>
                           <CardTitle className="text-4xl font-headline">Quem você acha que vence?</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-6">
                            <div className="text-center space-y-4">
                               <p className="text-3xl font-bold">{armWrestlingChallenger1.name}</p>
                               <Button size="lg" className="h-24 w-full text-xl" onClick={() => handleArmWrestlingVote(armWrestlingChallenger1)}>
                                  <CheckCircle className="mr-2"/>Votar
                               </Button>
                            </div>
                             <div className="text-center space-y-4">
                               <p className="text-3xl font-bold">{armWrestlingChallenger2.name}</p>
                               <Button size="lg" className="h-24 w-full text-xl" onClick={() => handleArmWrestlingVote(armWrestlingChallenger2)}>
                                  <CheckCircle className="mr-2"/>Votar
                               </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
         </div>
    )
  }

  // --- RENDER CARD SELECTION ---
  if (settings.useOnlineCards && gameStage === 'card_selection' && activeCard) {
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
                                onClick={() => handleSelectCardAnswer(ans.text)}
                            >
                                {ans.text}
                            </Button>
                        ))}
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
  
  // --- RENDER VOTING STAGES ---
  if (!currentPlayer) {
     return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

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
                  <Button size="lg" className="h-24 flex-col gap-1 bg-blue-600 hover:bg-blue-700 text-white text-lg" disabled={voteStage !== 'stage1'} onClick={() => handleVote('stage1', 'assertive')}>
                    <CheckCircle/>
                    Assertivo
                  </Button>
                  <Button size="lg" className="h-24 flex-col gap-1 bg-red-600 hover:bg-red-700 text-white text-lg" disabled={voteStage !== 'stage1'} onClick={() => handleVote('stage1', 'inassertive')}>
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
                  <Button size="lg" className="h-24 flex-col gap-1 bg-green-600 hover:bg-green-700 text-white text-lg" disabled={voteStage !== 'stage2'} onClick={() => handleVote('stage2', 'truth')}>
                    Verdade
                  </Button>
                  <Button size="lg" className="h-24 flex-col gap-1 bg-yellow-500 hover:bg-yellow-600 text-white text-lg" disabled={voteStage !== 'stage2'} onClick={() => handleVote('stage2', 'lie')}>
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
