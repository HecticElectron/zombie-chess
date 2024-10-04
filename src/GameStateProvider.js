import React, { createContext, useContext, useReducer, useRef, useState, Suspense, lazy, useEffect, useCallback } from 'react';

const initialGameState = {
  isActiveGame: true,
  isWhiteTurn: true,
  isCheck: false,
  isCheckmate: false,
  moveNumber: 1,
  boardStates: [
    [
      ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'],
      ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'],
      ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
    ]
  ],
  selectedPiece: '',
  selectedSquare: {
    rowIndex: -1,
    columnIndex: -1
  }
};

export const rowDictionary = [
  '1', '2', '3', '4', '5', '6', '7', '8'
];

export const columnDictionary = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
];

const GameStateContext = createContext();

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

  const setSelectedSquare = (rowIndex, columnIndex, piece) => {
    if (typeof piece !== 'undefined') {
      setGameState({
        ...gameState,
        selectedSquare: { rowIndex, columnIndex },
        selectedPiece: piece
      });
    } else {
      setGameState({
        ...gameState,
        selectedSquare: { rowIndex, columnIndex }
      });
    }
  }

  const movePiece = (selectedPiece, startingSquare, endingSquare, isCapture) => {
    let boardStates = gameState.boardStates;
    const boardState = boardStates[boardStates.length - 1];
    const newBoardState = boardState.map((row, rowIndex) => {
      return row.map((currentPiece, columnIndex) => {
        if (rowIndex === startingSquare.rowIndex && columnIndex === startingSquare.columnIndex) {
          if (isCapture === true && selectedPiece === 'Z') {
            return 'Z';
          }
          return '';
        } else if (rowIndex === endingSquare.rowIndex && columnIndex === endingSquare.columnIndex) {
          return selectedPiece;
        } else {
          return currentPiece;
        }
      });
    });

    boardStates.push(newBoardState);

    setGameState({
      ...gameState,
      selectedSquare: {
        rowIndex: -1,
        columnIndex: -1
      },
      selectedPiece: '',
      boardStates: boardStates,
      isWhiteTurn: !gameState.isWhiteTurn
    });
  };

  let bufferedBoardStates = [];

  const handleKeyDown = event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
      let boardStates = gameState.boardStates;

      if (event.shiftKey && bufferedBoardStates.length) { // Redo
        boardStates.push(bufferedBoardStates.pop());

        setGameState({
          ...gameState,
          selectedSquare: {
            rowIndex: -1,
            columnIndex: -1
          },
          selectedPiece: '',
          boardStates: boardStates,
          isWhiteTurn: !!(boardStates.length % 2)
        });
      } else if (!event.shiftKey && boardStates.length > 1) { // Undo
        bufferedBoardStates.push(boardStates.pop());

        setGameState({
          ...gameState,
          selectedSquare: {
            rowIndex: -1,
            columnIndex: -1
          },
          selectedPiece: '',
          boardStates: boardStates,
          isWhiteTurn: !!(boardStates.length % 2)
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <GameStateContext.Provider value={{ gameState, setSelectedPiece, setSelectedSquare, movePiece }}>
      {children}
    </GameStateContext.Provider>
  );
}

