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
import { Home, Loader2, CheckCircle, XCircle, User, Crown, HelpCircle } from "lucide-react";
import type { GameSettings, Player, VoteStage, StoredVote, GameCard } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CARDS } from "@/lib/cards";


// Função para embaralhar o array de cartas (algoritmo Fisher-Yates)
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
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerBeingVotedOnIndex, setPlayerBeingVotedOnIndex] = useState(1);
  
  const [allVotes, setAllVotes] = useState<StoredVote[]>([]);
  const [currentVoteStage1, setCurrentVoteStage1] = useState<'assertive' | 'inassertive' | null>(null);
  const [voteStage, setVoteStage] = useState<VoteStage>('stage1');
  const adBanner = useMemo(() => PlaceHolderImages.find(img => img.id === 'paid-ad-banner'), []);
  
  // Card game state
  const [shuffledDeck, setShuffledDeck] = useState<GameCard[]>([]);
  const [activeCard, setActiveCard] = useState<GameCard | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [cardPlayerIndex, setCardPlayerIndex] = useState(0); // Player who draws a card
  const [voterForCardPlayerIndex, setVoterForCardPlayerIndex] = useState(1); // Player who votes on the card player


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

    if(parsedSettings.useOnlineCards) {
      // Embaralha as cartas no início do jogo e armazena no estado
      const deck = shuffleArray(CARDS);
      setShuffledDeck(deck);
      setVoteStage('cardSelection');
      setCardPlayerIndex(0);
    } else {
      // Initial voter is player 0, person being voted on is player 1
      setCurrentPlayerIndex(0);
      setPlayerBeingVotedOnIndex(1 % parsedSettings.numPlayers);
    }

  }, [router]);
  
  // Efeito para comprar uma nova carta quando o baralho ou o índice do jogador do cartão mudam
  useEffect(() => {
    if (settings?.useOnlineCards && voteStage === 'cardSelection' && shuffledDeck.length > 0) {
      drawNewCard();
    }
  }, [shuffledDeck, cardPlayerIndex, settings, voteStage]);


  const endGame = (finalVote: StoredVote) => {
    localStorage.setItem('gameResults', JSON.stringify({ players, votes: [...allVotes, finalVote] }));
    router.push('/results');
  };

  // --- Regular Game Logic ---
  const currentPlayer = useMemo(() => players[currentPlayerIndex], [players, currentPlayerIndex]);
  const playerBeingVotedOn = useMemo(() => players[playerBeingVotedOnIndex], [players, playerBeingVotedOnIndex]);

  // --- Card Game Logic ---
  const cardPlayer = useMemo(() => players[cardPlayerIndex], [players, cardPlayerIndex]);
  const voterForCardPlayer = useMemo(() => players[voterForCardPlayerIndex], [players, voterForCardPlayerIndex]);

  const drawNewCard = () => {
    if (shuffledDeck.length === 0) return; // Add guard clause
    const [nextCard, ...restOfDeck] = shuffledDeck;
    
    if (nextCard) {
      setActiveCard(nextCard);
      setShuffledDeck(restOfDeck); // Atualiza o baralho sem reembaralhar
      setSelectedAnswer(null);
    } else {
      // Se não houver mais cartas, encerra o modo de cartas.
      // O jogo pode continuar no modo normal se houver rodadas restantes.
      setActiveCard(null);
      // Muda para a votação normal para o restante do jogo
      setVoteStage('stage1');
      setCurrentPlayerIndex(0);
      setPlayerBeingVotedOnIndex(1 % (settings?.numPlayers || 1));
    }
  }

  const handleSelectAnswer = (answerText: string) => {
    setSelectedAnswer(answerText);
    setVoteStage('stage1');
    let nextVoterIndex = (cardPlayerIndex + 1) % players.length;
     // Pula o jogador da carta para que ele não vote em si mesmo
    if (nextVoterIndex === cardPlayerIndex) {
        nextVoterIndex = (nextVoterIndex + 1) % players.length;
    }
    setVoterForCardPlayerIndex(nextVoterIndex);
  }

  const handleVoteOnCardPlayer = (stage: 'stage1' | 'stage2', vote: 'assertive' | 'inassertive' | 'truth' | 'lie') => {
     if (!settings || !voterForCardPlayer || !cardPlayer) return;

    if (stage === 'stage1') {
      setCurrentVoteStage1(vote as 'assertive' | 'inassertive');
      setVoteStage('stage2');
      return;
    }

    // Stage 2
    if (!currentVoteStage1) return;
    const newVote: StoredVote = {
      round,
      voterId: voterForCardPlayer.id,
      votedOnId: cardPlayer.id, // The person being voted on is the one who chose the card answer
      stage1: currentVoteStage1,
      stage2: vote as 'truth' | 'lie',
      isCardVote: true,
      cardAnswer: selectedAnswer
    };
    setAllVotes(prev => [...prev, newVote]);
    
    // Reset for next voter
    setCurrentVoteStage1(null);
    setVoteStage('stage1');
    
    let nextVoterIndex = (voterForCardPlayerIndex + 1) % players.length;

    // Pula o jogador da carta
    if (nextVoterIndex === cardPlayerIndex) {
      nextVoterIndex = (nextVoterIndex + 1) % players.length;
    }
    
    // Check if everyone has voted on the current card player
    // The last voter is the one before the card player
    const lastVoterIndex = (cardPlayerIndex - 1 + players.length) % players.length;
    if (voterForCardPlayerIndex === lastVoterIndex) {
        
      // End of voting for this card. Move to the next player to draw a card.
      const nextCardPlayerIndex = (cardPlayerIndex + 1) % players.length;

      // Check for end of round
      if (nextCardPlayerIndex === 0) {
        if (round + 1 > settings.numRounds) {
          endGame(newVote);
          return;
        }
        setRound(r => r + 1);
      }
      
      // Check if there are cards left before moving to the next card player
      if (shuffledDeck.length > 0) {
        setCardPlayerIndex(nextCardPlayerIndex);
        setVoteStage('cardSelection');
        // drawNewCard() will be called by useEffect
      } else {
        // No cards left, switch to normal mode
        setActiveCard(null);
        setVoteStage('stage1');
        // Start normal voting from where it would be
        setCurrentPlayerIndex(0);
        setPlayerBeingVotedOnIndex(1 % settings.numPlayers);
      }
    } else {
      // Just move to the next voter
      setVoterForCardPlayerIndex(nextVoterIndex);
    }
  };


  const handleStage1Vote = (vote: 'assertive' | 'inassertive') => {
    if(settings?.useOnlineCards && activeCard) {
      handleVoteOnCardPlayer('stage1', vote);
    } else {
      setCurrentVoteStage1(vote);
      setVoteStage('stage2');
    }
  };

  const handleStage2Vote = (vote: 'truth' | 'lie') => {
    if(settings?.useOnlineCards && activeCard) {
      handleVoteOnCardPlayer('stage2', vote);
      return;
    }

    if (!currentVoteStage1 || !settings || !currentPlayer || !playerBeingVotedOn) return;

    const newVote: StoredVote = {
      round,
      voterId: currentPlayer.id,
      votedOnId: playerBeingVotedOn.id,
      stage1: currentVoteStage1,
      stage2: vote,
      isCardVote: false,
    };
    setAllVotes(prev => [...prev, newVote]);

    // Reset for next voter
    setCurrentVoteStage1(null);
    setVoteStage('stage1');

    // --- Advance Logic ---
    let nextVoterIndex = (currentPlayerIndex + 1) % players.length;
    
    if (nextVoterIndex === playerBeingVotedOnIndex) {
      nextVoterIndex = (nextVoterIndex + 1) % players.length;
    }

    // Have all players (except the one being voted on) voted?
    // The last voter is the one right before playerBeingVotedOnIndex.
    const lastVoterIndex = (playerBeingVotedOnIndex - 1 + players.length) % players.length;

    if (currentPlayerIndex === lastVoterIndex) {
      // End of votes for this player. Move to the next player to be voted on.
      const nextPlayerBeingVotedOnIndex = (playerBeingVotedOnIndex + 1) % players.length;
      
      // Check for end of round
      if (nextPlayerBeingVotedOnIndex === 0) { 
        if(round + 1 > settings.numRounds) {
          endGame(newVote);
          return;
        }
        setRound(r => r + 1);
      }
      
      let nextVoterIndexAfterRoundEnd = (nextPlayerBeingVotedOnIndex + 1) % players.length;
      setPlayerBeingVotedOnIndex(nextPlayerBeingVotedOnIndex);
      setCurrentPlayerIndex(nextVoterIndexAfterRoundEnd);

    } else {
      // Just move to next voter
      setCurrentPlayerIndex(nextVoterIndex);
    }
  };
  
  if (!settings || players.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // --- RENDER CARD SELECTION ---
  if (settings.useOnlineCards && voteStage === 'cardSelection' && activeCard && cardPlayer) {
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
                        <p className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2"><Crown className="h-5 w-5 text-primary"/>Jogador a escolher</p>
                        <CardTitle className="text-4xl font-headline">{cardPlayer.name}</CardTitle>
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
                                onClick={() => handleSelectAnswer(ans.text)}
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
  
  // --- RENDER VOTING STAGES (FOR BOTH MODES) ---
  const personVoting = settings.useOnlineCards && activeCard ? voterForCardPlayer : currentPlayer;
  const personBeingVotedOn = settings.useOnlineCards && activeCard ? cardPlayer : playerBeingVotedOn;

  if (!personVoting || !personBeingVotedOn) {
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
                    <p className="text-3xl font-bold">{personBeingVotedOn.name}</p>
                    {settings.useOnlineCards && selectedAnswer && (
                      <blockquote className="text-xl italic border-l-4 pl-4 mt-2">"{selectedAnswer}"</blockquote>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2 text-center mb-6">
                <p className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2"><Crown className="h-5 w-5 text-primary"/>Jogador a votar</p>
                <CardTitle className="text-4xl font-headline">{personVoting.name}</CardTitle>
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
