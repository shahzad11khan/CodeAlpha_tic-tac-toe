import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";

const ENDPOINT = "http://localhost:5000";

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on("move", (data) => {
      setPosition(data);
    });

    return () => socket.disconnect();
  }, [socket]);

  const handleKeyPress = (e) => {
    let newPosition = { ...position };
    if (e.key === "ArrowUp") newPosition.y -= 10;
    if (e.key === "ArrowDown") newPosition.y += 10;
    if (e.key === "ArrowLeft") newPosition.x -= 10;
    if (e.key === "ArrowRight") newPosition.x += 10;

    setPosition(newPosition);
    socket.emit("move", newPosition);
  };

  return (
    <div tabIndex="0" onKeyDown={handleKeyPress} className="game-area">
      <div
        className="player"
        style={{
          left: position.x,
          top: position.y,
        }}
      ></div>
    </div>
  );
};

export default App;
