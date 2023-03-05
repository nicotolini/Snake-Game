import React from "react";
import { Link } from "react-router-dom";
import Redes from "../component/Redes";
import "./start.css";
const GameStart = () => {
  return (
    <main className="game-start">
      <Redes/>
      <div className="center">
        <h1 className="title">Snake Game</h1>
        <Link to="/snake"><button className="button">Start</button></Link>
      </div>
    </main>
  );
};

export default GameStart;
