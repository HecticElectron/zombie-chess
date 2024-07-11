import React, { Component, createContext, useContext, useReducer, useRef, useState, Suspense, lazy, useEffect } from 'react';
import GameStateProvider, { useGameStateContext, rowDictionary, columnDictionary } from './GameStateProvider';
import Piece, { checkForLegalMove } from './Piece';

export default function Square({ rowIndex, columnIndex, children }) {
  const { gameState, setSelectedSquare, movePiece } = useGameStateContext();
  const selectedSquare = gameState.selectedSquare;
  const isThisSquareSelected = selectedSquare.rowIndex === rowIndex && selectedSquare.columnIndex === columnIndex;
  const [squareState, setSquareState] = useState({
    pieceHere: ''
  });

  return (
    <div
      data-row={rowIndex}
      data-column={columnIndex}
      className={`square ${isThisSquareSelected ? 'selected-source ' : ''}row${rowDictionary[rowIndex]} column${columnDictionary[columnIndex]}`}
      onClick={(event) => {
        if (isThisSquareSelected) {
          // this square was previously clicked. The player wants to unclick it:
          setSelectedSquare(-1, -1);
        } else {
          const selectedPiece = gameState.selectedPiece;
          // this is the first time _this_ square has been clicked this turn. 
          // It may be the first or second square clicked this turn.
          // check to see if a piece has been selected already, i.e., if this is the _second_ square clicked this turn:
          if (selectedPiece) {
            // this is the second square clicked this turn.
            // (The first square clicked always has a piece on it, so selectedPiece is never blank.)
            // check to see if that piece can be moved to this square:
            if (checkForLegalMove(selectedPiece, selectedSquare, { rowIndex, columnIndex })) {
              // if so, register the selected piece as the piece on this square:
              setSquareState({ pieceHere: selectedPiece });
              // then move the piece from the original square to this square:
              movePiece(selectedPiece, selectedSquare, { rowIndex, columnIndex });
            } else {
              //if the piece can't be moved to this square, reset the originally clicked square:
              setSelectedSquare(-1, -1);
            }
          } else {
            // this is the _first_ square clicked this turn. No piece has been selected yet.
            // see if a piece is on this square:
            const pieceHere = children.props.pieceName;
            if (pieceHere) {
              //if so, tell gameState that this is the new selected piece:
              setSquareState({ pieceHere });
              setSelectedSquare(rowIndex, columnIndex, pieceHere);
            } else {
              //otherwise, reset this square's selected value and the selected value of any other square:
            }
          }
        }
      }}
    >
      {children}
    </div>
  );
}

