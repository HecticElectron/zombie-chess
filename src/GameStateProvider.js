import React, { createContext, useContext, useReducer, useRef, useState, Suspense, lazy, useEffect } from 'react';

const initialGameState = {
  isActiveGame: true,
  isWhiteTurn: true,
  isCheck: false,
  isCheckmate: false,
  moveNumber: 1,
  history: [],
  selectedPiece: '',
  selectedSquare: {
    rowIndex: -1,
    columnIndex: -1
  },
  boardState: [
    ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'],
    ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'],
    ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
  ]
};

export const rowDictionary = [
  '1', '2', '3', '4', '5', '6', '7', '8'
];

export const columnDictionary = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
];

const GameStateContext = createContext();

// export const useGameStateContext = () => useContext(GameStateContext);

export function useGameStateContext () {
  return useContext(GameStateContext);
}

export default function GameStateProvider ({ children }) {
  const [gameState, setGameState] = useState(initialGameState);

  const setSelectedPiece = (piece) => {
    setGameState({
      ...gameState,
      selectedPiece: piece
    });
  }

  const setSelectedSquare = (rowIndex, columnIndex) => {
    setGameState({
      ...gameState,
      selectedSquare: { rowIndex, columnIndex }
      // boardState: newBoardState
    });
  }
  
  const movePiece = (selectedPiece, selectedSquare, { rowIndex, columnIndex }) => {
    const newBoardState = gameState.boardState.map((row, rIndex) => {
      return row.map((currentPiece, cIndex) => {
        if (rIndex === selectedSquare.rowIndex && cIndex === selectedSquare.columnIndex) {
          return '';
        } else if (rIndex === rowIndex && cIndex === columnIndex) {
          return selectedPiece;
        } else {
          return currentPiece;
        }
      });
    });

    setGameState({
      ...gameState,
      selectedSquare: {
        rowIndex: -1,
        columnIndex: -1
      },
      boardState: newBoardState
    });
  };

  return (
    <GameStateContext.Provider value={{ gameState, setSelectedPiece, setSelectedSquare, movePiece }}>
      {children}
    </GameStateContext.Provider>
  );
}

