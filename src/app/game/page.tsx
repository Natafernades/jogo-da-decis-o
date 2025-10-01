"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { GameSettings, Player, VoteStage, StoredVote, GameCard, GameStage, ArmWrestlingVote } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CARDS } from "@/lib/cards";

import { CardSelectionScreen } from "@/components/game/card-selection-screen";
import { VotingScreen } from "@/components/game/voting-screen";
import { ArmWrestlingSelectionScreen } from "@/components/game/arm-wrestling-selection-screen";
import { ArmWrestlingVotingScreen } from "@/components/game/arm-wrestling-voting-screen";


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

  const endGame = useCallback(() => {
    localStorage.setItem('gameResults', JSON.stringify({ players, votes: allVotes, armWrestlingVotes }));
    router.push('/pre-results');
  }, [players, allVotes, armWrestlingVotes, router]);
  
  const currentPlayer = useMemo(() => players[currentPlayerIndex], [players, currentPlayerIndex]);
  const playerBeingVotedOn = useMemo(() => players[playerBeingVotedOnIndex], [players, playerBeingVotedOnIndex]);


  const advanceToNextPlayerOrRound = useCallback(() => {
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
      const nextCardIndex = newEvaluatedPlayerCount;
      if (nextCardIndex < shuffledDeck.length) {
        setActiveCard(shuffledDeck[nextCardIndex]);
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
  }, [settings, evaluatedPlayerCount, players, playerBeingVotedOn, playerBeingVotedOnIndex, round, endGame, shuffledDeck]);

  const handleSelectCardAnswer = useCallback((answerText: string) => {
    setSelectedAnswer(answerText);
    setGameStage('voting');

    // Start voting process
    let firstVoterIndex = (playerBeingVotedOnIndex + 1) % players.length;
    setCurrentPlayerIndex(firstVoterIndex);
    setVoteStage('stage1');
  }, [playerBeingVotedOnIndex, players.length]);

  const handleVote = useCallback((stage1Vote: 'assertive' | 'inassertive', stage2Vote: 'truth' | 'lie') => {
    if (!settings || !currentPlayer || !playerBeingVotedOn) return;

    const newVote: StoredVote = {
      round,
      voterId: currentPlayer.id,
      votedOnId: playerBeingVotedOn.id,
      stage1: stage1Vote,
      stage2: stage2Vote,
      cardQuestion: settings.useOnlineCards && activeCard ? activeCard.question : undefined,
      cardAnswer: settings.useOnlineCards ? selectedAnswer : undefined,
    };
    setAllVotes(prev => [...prev, newVote]);

    // Reset for next voter
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
  }, [settings, currentPlayer, playerBeingVotedOn, round, activeCard, selectedAnswer, currentPlayerIndex, playerBeingVotedOnIndex, players.length, advanceToNextPlayerOrRound]);


  const handleArmWrestlingOpponentSelect = useCallback((opponent: Player) => {
      setArmWrestlingChallenger2(opponent);
      setGameStage('arm_wrestling_voting');
      // Find the first voter (not one of the challengers)
      let firstVoterIdx = 0;
      while (firstVoterIdx === players.findIndex(p => p.id === armWrestlingChallenger1?.id) || firstVoterIdx === players.findIndex(p => p.id === opponent.id)) {
          firstVoterIdx++;
      }
       if(firstVoterIdx >= players.length) {
         // This case happens if there are only 2 players. No one to vote.
         setArmWrestlingChallenger1(null);
         setArmWrestlingChallenger2(null);
         setArmWrestlingVoterIndex(null);
         advanceToNextPlayerOrRound(); // This will trigger the normal advancement
       } else {
         setArmWrestlingVoterIndex(firstVoterIdx);
       }
  }, [players, armWrestlingChallenger1, advanceToNextPlayerOrRound]);
  
  const handleArmWrestlingVote = useCallback((winner: Player) => {
    if (!armWrestlingChallenger1 || !armWrestlingChallenger2 || armWrestlingVoterIndex === null) return;
    
    const armWrestlingVoter = players[armWrestlingVoterIndex];

    const newVote: ArmWrestlingVote = {
        round,
        voterId: armWrestlingVoter.id,
        challenger1Id: armWrestlingChallenger1.id,
        challenger2Id: armWrestlingChallenger2.id,
        votedForWinnerId: winner.id,
    };
    const updatedVotes = [...armWrestlingVotes, newVote];
    setArmWrestlingVotes(updatedVotes);

    // Find next voter
    let nextVoterIndex = (armWrestlingVoterIndex + 1) % players.length;
    
    const challenger1Idx = players.findIndex(p => p.id === armWrestlingChallenger1.id);
    const challenger2Idx = players.findIndex(p => p.id === armWrestlingChallenger2.id);

    // Skip challengers
    while(nextVoterIndex === challenger1Idx || nextVoterIndex === challenger2Idx) {
      nextVoterIndex = (nextVoterIndex + 1) % players.length;
    }
    
    // Check if all eligible voters have voted
    const eligibleVoters = players.length - 2;
    if (updatedVotes.length >= eligibleVoters) {
        // End of arm wrestling, continue game
        setArmWrestlingChallenger1(null);
        setArmWrestlingChallenger2(null);
        setArmWrestlingVoterIndex(null);
        setGameStage('voting'); // Reset game stage
        advanceToNextPlayerOrRound(); // This will trigger the normal advancement
    } else {
        setArmWrestlingVoterIndex(nextVoterIndex);
    }
  }, [armWrestlingChallenger1, armWrestlingChallenger2, armWrestlingVoterIndex, players, round, armWrestlingVotes, advanceToNextPlayerOrRound]);
  
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
        <ArmWrestlingSelectionScreen 
            challenger={armWrestlingChallenger1}
            opponents={opponents}
            onOpponentSelect={handleArmWrestlingOpponentSelect}
            onGoHome={() => router.push('/')}
        />
    )
  }

  // --- RENDER ARM WRESTLING VOTING ---
 if (gameStage === 'arm_wrestling_voting' && armWrestlingChallenger1 && armWrestlingChallenger2 && armWrestlingVoterIndex !== null) {
    const armWrestlingVoter = players[armWrestlingVoterIndex];
    return (
        <ArmWrestlingVotingScreen
            challenger1={armWrestlingChallenger1}
            challenger2={armWrestlingChallenger2}
            voter={armWrestlingVoter}
            onVote={handleArmWrestlingVote}
        />
    )
  }

  // --- RENDER CARD SELECTION ---
  if (settings.useOnlineCards && gameStage === 'card_selection' && activeCard) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <CardSelectionScreen
                settings={settings}
                round={round}
                playerBeingVotedOn={playerBeingVotedOn}
                activeCard={activeCard}
                onSelectAnswer={handleSelectCardAnswer}
                onGoHome={() => router.push('/')}
            />
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
        <VotingScreen
            settings={settings}
            round={round}
            playerBeingVotedOn={playerBeingVotedOn}
            currentPlayer={currentPlayer}
            selectedAnswer={selectedAnswer}
            onVote={handleVote}
            onGoHome={() => router.push('/')}
        />
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

    