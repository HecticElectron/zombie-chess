import React, { Component, createContext, useContext, useReducer, useRef, useState, Suspense, lazy, useEffect } from 'react';
import GameStateProvider, { useGameStateContext, rowDictionary, columnDictionary } from './GameStateProvider';

import image_p from './img/bP.png';
import image_r from './img/bR.png';
import image_n from './img/bN.png';
import image_b from './img/bB.png';
import image_q from './img/bQ.png';
import image_k from './img/bK.png';
import image_z from './img/bZ.png';
import image_P from './img/wP.png';
import image_R from './img/wR.png';
import image_N from './img/wN.png';
import image_B from './img/wB.png';
import image_Q from './img/wQ.png';
import image_K from './img/wK.png';
import image_Z from './img/wZ.png';

export function Piece({ piece }) {
  switch (piece) {
    case 'p':
      return (<img src={image_p} alt={piece} />)
    case 'r':
      return (<img src={image_r} alt={piece} />)
    case 'n':
      return (<img src={image_n} alt={piece} />)
    case 'b':
      return (<img src={image_b} alt={piece} />)
    case 'q':
      return (<img src={image_q} alt={piece} />)
    case 'k':
      return (<img src={image_k} alt={piece} />)
    case 'z':
      return (<img src={image_z} alt={piece} />)
    case 'P':
      return (<img src={image_P} alt={piece} />)
    case 'R':
      return (<img src={image_R} alt={piece} />)
    case 'N':
      return (<img src={image_N} alt={piece} />)
    case 'B':
      return (<img src={image_B} alt={piece} />)
    case 'Q':
      return (<img src={image_Q} alt={piece} />)
    case 'K':
      return (<img src={image_K} alt={piece} />)
    case 'Z':
      return (<img src={image_Z} alt={piece} />)
    default:
      return null
  }
}

export function checkForLegalMove(piece, sourceSquare, targetSquare) {
  return true;
  // const sideAgnosticPiece = piece.toLowerCase();
  // switch (piece) {
  //   case 'p':
  //     return checkForLegalPawnMove(sourceSquare, targetSquare);
  //   case 'r':
  //     return checkForLegalRookMove(sourceSquare, targetSquare);
  //   case 'n':
  //     return checkForLegalKnightMove(sourceSquare, targetSquare);
  //   case 'b':
  //     return checkForLegalBishopMove(sourceSquare, targetSquare);
  //   case 'q':
  //     return checkForLegalQueenMove(sourceSquare, targetSquare);
  //   case 'k':
  //     return checkForLegalKingMove(sourceSquare, targetSquare);
  //   case 'z':
  //     return checkForLegalZombieMove(sourceSquare, targetSquare);
  //   default:
  //     return false;
  // }
}

class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;
    if (error) return fallback;
    return children;
  }
};

// const initialGameState = {
//   isActiveGame: true,
//   isWhiteTurn: true,
//   sourceSquare: {
//     rowIndex: -1,
//     columnIndex: -1
//   },
//   targetSquare: {
//     rowIndex: -1,
//     columnIndex: -1
//   },
//   isCheck: false,
//   isCheckmate: false,
//   moveNumber: 1,
//   history: [],
//   boardState: [
//     ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'],
//     ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'],
//     ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', ''],
//     ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
//     ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
//   ]
// };

// const selectSquare = (rowIndex, columnIndex) => {
//   if (gameState.sourceSquare.rowIndex === -1) {
//     setGameState({
//       ...gameState,
//       sourceSquare: {
//         rowIndex,
//         columnIndex
//       }
//     });
//   } else {
//     setGameState({
//       ...gameState,
//       targetSquare: {
//         rowIndex,
//         columnIndex
//       }
//     });
//   }
// };

// const movePiece = () => {
//   const { sourceSquare, targetSquare } = gameState;
//   const boardState = gameState.boardState.map((row, rowIndex) => {
//     return row.map((piece, columnIndex) => {
//       if (rowIndex === sourceSquare.rowIndex && columnIndex === sourceSquare.columnIndex) {
//         return '';
//       } else if (rowIndex === targetSquare.rowIndex && columnIndex === targetSquare.columnIndex) {
//         return gameState.boardState[sourceSquare.rowIndex][sourceSquare.columnIndex];
//       } else {
//         return piece;
//       }
//     });
//   });
//   setGameState({
//     ...gameState,
//     boardState,
//     sourceSquare: {
//       rowIndex: -1,
//       columnIndex: -1
//     },
//     targetSquare: {
//       rowIndex: -1,
//       columnIndex: -1
//     }
//   });
// };

export default function Square({ rowIndex, columnIndex }) {
  const { gameState, selectSquare, movePiece } = useGameStateContext();
  const piece = gameState.boardState[rowIndex][columnIndex];
  const { sourceSquare, targetSquare } = gameState;
  const [squareState, setSquareState] = useState({
    isSourceSquare: false,
    isTargetSquare: false
  });
  return (
    <div
      className={`square ${squareState.isSourceSquare ? 'selected-source ' : (squareState.isTargetSquare ? 'selected-target ' : '')}row${rowDictionary[rowIndex]} column${columnDictionary[columnIndex]}`}
      onClick={() => {
        if (sourceSquare.rowIndex !== -1 && checkForLegalMove(piece, sourceSquare, { rowIndex, columnIndex })) {
          const pieceToMove = gameState.boardState[sourceSquare.rowIndex, sourceSquare.columnIndex];
          setSquareState({ ...squareState, isTargetSquare: true });
          movePiece(pieceToMove);
        } else {
          setSquareState({ ...squareState, isSourceSquare: true });
          selectSquare(rowIndex, columnIndex);
        }
      }}
    >
      <Suspense fallback={<div className='waiting-for-img'></div>}>
        <ErrorBoundary fallback={<div className='no-img'></div>}>
          <Piece piece={piece} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

