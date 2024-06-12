import React, { Component, createContext, useContext, useReducer, useRef, useState, Suspense, lazy, useEffect } from 'react';
import GameStateProvider, { useGameStateContext, rowDictionary, columnDictionary } from './GameStateProvider';

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

function PieceImage({ piece }) {
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

export function checkForLegalMove(piece, selectedSquare, { rowIndex, columnIndex }) {
  return true;
  // const sideAgnosticPiece = piece.toLowerCase();
  // switch (piece) {
  //   case 'p':
  //     return checkForLegalPawnMove(selectedSquare, { rowIndex, columnIndex });
  //   case 'r':
  //     return checkForLegalRookMove(selectedSquare, { rowIndex, columnIndex });
  //   case 'n':
  //     return checkForLegalKnightMove(selectedSquare, { rowIndex, columnIndex });
  //   case 'b':
  //     return checkForLegalBishopMove(selectedSquare, { rowIndex, columnIndex });
  //   case 'q':
  //     return checkForLegalQueenMove(selectedSquare, { rowIndex, columnIndex });
  //   case 'k':
  //     return checkForLegalKingMove(selectedSquare, { rowIndex, columnIndex });
  //   case 'z':
  //     return checkForLegalZombieMove(selectedSquare, { rowIndex, columnIndex });
  //   default:
  //     return false;
  // }
}

export default function Piece({ rowIndex, columnIndex, pieceName }) {
  return (
    <Suspense fallback={<div className='waiting-for-img'></div>}>
      <ErrorBoundary fallback={<div className='no-img'></div>}>
        <PieceImage piece={pieceName} />
      </ErrorBoundary>
    </Suspense>
  );
}