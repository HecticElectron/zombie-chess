import React, { Component, createContext, useContext, useReducer, useRef, useState, Suspense, lazy, useEffect } from 'react';
import GameStateProvider, { useGameStateContext, rowDictionary, columnDictionary } from './GameStateProvider';
import Square from './Square';

export function Row({ rowIndex }) {
  return (
    <div className={`row row${rowDictionary[rowIndex]}`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Square
          rowIndex={rowIndex}
          columnIndex={i}
          key={`$row${rowDictionary[rowIndex]}column${columnDictionary[i]}`}
        />
      ))}
    </div>
  );
}

export function Chessboard() {
  return (
      <div className='chessboard'>
        {useGameStateContext().gameState.boardState.map((row, rowIndex) => {
          return (<Row key={`row${rowDictionary[rowIndex]}`} rowIndex={rowIndex} />)
        })}
      </div>
  );
}

export default function App() {
  return (
    <Chessboard />
  );
}