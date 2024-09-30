import React, { Component, createContext, useContext, useReducer, useRef, useState, Suspense, lazy, useEffect } from 'react';
import GameStateProvider, { rowDictionary, columnDictionary } from './GameStateProvider';

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

function isMoveObstructed(startingPosition, endingPosition, boardState) {
  const { startRow, startColumn } = startingPosition;
  const { endRow, endColumn } = endingPosition;
  const rowDiff = Math.abs(endRow - startRow);
  const columnDiff = Math.abs(endColumn - startColumn);
  const rowDirection = endRow > startRow ? 1 : -1;
  const columnDirection = endColumn > startColumn ? 1 : -1;

  if (rowDiff === 0) {
    for (let column = startColumn + columnDirection; column !== endColumn; column += columnDirection) {
      // check if square (startRow, column) is occupied
      if (boardState[startRow][column] !== '') {
        return true; // Square is occupied, move is obstructed
      }
    }
  } else if (columnDiff === 0) {
    for (let row = startRow + rowDirection; row !== endRow; row += rowDirection) {
      // check if square (row, startColumn) is occupied
      if (boardState[row][startColumn] !== '') {
        return true; // Square is occupied, move is obstructed
      }
    }
  } else if (rowDiff === columnDiff) {
    for (let rowAndColumn = 1; rowAndColumn < rowDiff; rowAndColumn++) {
      const row = startRow + (rowAndColumn * rowDirection);
      const column = startColumn + (rowAndColumn * columnDirection);
      // console.log("Row is", row, "and column is", column);
      // check if square (row, column) is occupied
      if (boardState[row][column] !== '') {
        // console.log("Square at row #", row, "and column #", column, "is occupied by", boardState[row][column]);
        return true; // Square is occupied, move is obstructed
      }
    }
  } else {
    return true; // Invalid move, not along a straight or diagonal line
  }

  return false; // Move is unobstructed
}

function isMoveCapture(endingPosition, boardState) {
  const { endRow, endColumn } = endingPosition;
  return boardState[endRow][endColumn] !== '';
}

function isPawnStartingMove(startingPosition) {
  const { startRow } = startingPosition;
  return startRow === 1 || startRow === 6;
}

function isMoveCorrectDistanceAndDirection(piece, startingPosition, endingPosition, boardState) {
  const { startRow, startColumn } = startingPosition;
  const { endRow, endColumn } = endingPosition;
  const rowDiff = Math.abs(endRow - startRow);
  const columnDiff = Math.abs(endColumn - startColumn);

  if (rowDiff === 0 && columnDiff === 0) {
    return false; // Same position, not a valid move
  }

  switch (piece) {
    case 'p':
    case 'z':
      if (isMoveCapture(endingPosition, boardState)) {
        return rowDiff === 1 && columnDiff === 1;
      } else {
        if (isPawnStartingMove(startingPosition)) {
          return columnDiff === 0 && (rowDiff === 1 || rowDiff === 2);
        }
        return rowDiff === 1 && columnDiff === 0;
      }
    case 'r':
      return rowDiff === 0 || columnDiff === 0;
    case 'n':
      return (rowDiff === 2 && columnDiff === 1) || (rowDiff === 1 && columnDiff === 2);
    case 'b':
      return rowDiff === columnDiff;
    case 'q':
      return (rowDiff === 0 || columnDiff === 0) || (rowDiff === columnDiff);
    case 'k':
      return rowDiff <= 1 && columnDiff <= 1;
    default:
      return false;
  }
  
}

function checkForPieceColor(piece) {
  return piece === piece.toLowerCase() ? 'white' : 'black';
}

export function checkForLegalMove(piece, startingSquare, endingSquare, boardState) {
  const sideAgnosticPiece = piece.toLowerCase();
  const startingPosition = { startRow: startingSquare.rowIndex, startColumn: startingSquare.columnIndex };
  const endingPosition = { endRow: endingSquare.rowIndex, endColumn: endingSquare.columnIndex };

  // If the move is a capture and the piece at the end of the move is the same color as the attacking piece, return false:
  if (isMoveCapture(endingPosition, boardState)) {
    const startingPieceColor = checkForPieceColor(piece);
    const endingPieceColor = checkForPieceColor(boardState[endingPosition.endRow][endingPosition.endColumn]);
    if (startingPieceColor === endingPieceColor) {
      // console.log("Trying to capture own piece. startingPosition is ", startingPosition, " and endingPosition is ", endingPosition);
      return false;
    }
    // console.log("Trying to capture opponent's piece. startingPosition is ", startingPosition, " and endingPosition is ", endingPosition);
    return 'capture';
  }
  if (sideAgnosticPiece !== 'n' && isMoveObstructed(startingPosition, endingPosition, boardState)) {
    // console.log("Piece is not knight and move is obstructed. startingPosition is ", startingPosition, " and endingPosition is ", endingPosition);
    return false;
  }
  if (!isMoveCorrectDistanceAndDirection(sideAgnosticPiece, startingPosition, endingPosition, boardState)) {
    // console.log("Move is not correct distance or direction is ", startingPosition, " and endingPosition is ", endingPosition);
    return false;
  }
  // console.log("Move is legal. startingPosition is ", startingPosition, " and endingPosition is ", endingPosition);
  return 'move';
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