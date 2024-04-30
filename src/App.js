import React, { useState } from 'react';

let chessboardState = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["P", "P", "P", "P", "P", "P", "P", "P"]
];

function Square({ id }) {
  return <div className="square" id={id}></div>;
}

function Row({ id }) {
  return (
    <div className="row" id={id}>
      <Square id={`${id}fileA`} />
      <Square id={`${id}fileB`} />
      <Square id={`${id}fileC`} />
      <Square id={`${id}fileD`} />
      <Square id={`${id}fileE`} />
      <Square id={`${id}fileF`} />
      <Square id={`${id}fileG`} />
      <Square id={`${id}fileH`} />
    </div>
  );
}

function Chessboard() {
  return (
    <div className="chessboard">
      <Row id="row8" />
      <Row id="row7" />
      <Row id="row6" />
      <Row id="row5" />
      <Row id="row4" />
      <Row id="row3" />
      <Row id="row2" />
      <Row id="row1" />
    </div>
  );
}

export default function App() {
  return (
    <Chessboard />
  );
}