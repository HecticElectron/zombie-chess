import React, { createContext, useContext, useReducer, useRef, useState, Suspense, lazy, useEffect } from 'react';

const initialGameState = {
  isActiveGame: true,
  isWhiteTurn: true,
  sourceSquare: {
    rowIndex: -1,
    columnIndex: -1
  },
  targetSquare: {
    rowIndex: -1,
    columnIndex: -1
  },
  isCheck: false,
  isCheckmate: false,
  moveNumber: 1,
  history: [],
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

  const selectSquare = (rowIndex, columnIndex) => {
    if (gameState.sourceSquare.rowIndex === -1) {
      setGameState({
        ...gameState,
        sourceSquare: {
          rowIndex,
          columnIndex
        }
      });
    } else {
      setGameState({
        ...gameState,
        targetSquare: {
          rowIndex,
          columnIndex
        }
      });
    }
  };

  const movePiece = (movedPiece) => {
    const { sourceSquare, targetSquare } = gameState;
    const boardState = gameState.boardState.map((row, rowIndex) => {
      return row.map((piece, columnIndex) => {
        if (rowIndex === sourceSquare.rowIndex && columnIndex === sourceSquare.columnIndex) {
          return '';
        } else if (rowIndex === targetSquare.rowIndex && columnIndex === targetSquare.columnIndex) {
          return movedPiece;
        } else {
          return piece;
        }
      });
    });
    setGameState({
      ...gameState,
      boardState,
      sourceSquare: {
        rowIndex: -1,
        columnIndex: -1
      },
      targetSquare: {
        rowIndex: -1,
        columnIndex: -1
      }
    });
  };

  return (
    <GameStateContext.Provider value={{ gameState, selectSquare, movePiece }}>
      {children}
    </GameStateContext.Provider>
  );
}

