import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Game = () => {
  const [game, setGame] = useState({
    board: Array(9).fill(null),
    turn: "X",
    winner: null,
  });

  useEffect(() => {
    socket.on("updateGame", (updatedGame) => {
      setGame(updatedGame);
    });

    return () => socket.off("updateGame");
  }, []);

  const handleClick = (index) => {
    if (game.board[index] || game.winner) return;
    socket.emit("makeMove", { gameId: game._id, index, player: game.turn });
  };

  const renderSquare = (index) => (
    <button onClick={() => handleClick(index)}>{game.board[index]}</button>
  );

  const renderBoard = () => (
    <div>
      <div>{[0, 1, 2].map((i) => renderSquare(i))}</div>
      <div>{[3, 4, 5].map((i) => renderSquare(i))}</div>
      <div>{[6, 7, 8].map((i) => renderSquare(i))}</div>
    </div>
  );

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {renderBoard()}
      {game.winner && <h2>Winner: {game.winner}</h2>}
    </div>
  );
};

export default Game;
