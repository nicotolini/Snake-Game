import React, { useEffect, useState } from "react";
import Redes from "../component/Redes";
import "./snake.css";
const Snake = () => {
  const [food, setFood] = useState({
    foodX: "",
    foodY: "",
  });
  let initialstate = {
    snakeX: "3",
    snakeY: "4",
  };
  const [snake, setSnake] = useState(initialstate);
  const [snakeBody, setSnakeBody] = useState([[snake.snakeX, snake.snakeY]]);
  const [score, setScore] = useState(0);
  const [hasCollided, setHasCollided] = useState(false);
  3;
  const [lastDirection, setLastDirection] = useState("");

  const [velocity, setVelocity] = useState({
    velocityX: "",
    velocityY: "",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const changeFood = () => {
    setFood({
      foodX: Math.floor(Math.random() * 30) + 1,
      foodY: Math.floor(Math.random() * 30) + 1,
    });
  };
  useEffect(() => {
    changeFood();
  }, []);

  if (snake.snakeX === food.foodX && snake.snakeY === food.foodY) {
    changeFood();
    setScore(score + 1);
    setSnakeBody((prevBody) => prevBody.concat([[food.foodX, food.foodY]]));
  }
  useEffect(() => {
    if (score > localStorage.getItem("highscore")) {
      localStorage.setItem("highscore", score);
    }
  }, [score]);

  useEffect(() => {
    const highscore = localStorage.getItem("highscore");
    if (!highscore) {
      localStorage.setItem("highscore", 0);
    }
  }, []);
  const highscore = localStorage.getItem("highscore");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (hasCollided) {
        return;
      }
      switch (e.keyCode) {
        case 38:
          if (lastDirection !== "down") {
            setVelocity({ velocityX: -1, velocityY: 0 });
            setLastDirection("up");
          }
          break;
        case 40:
          if (lastDirection !== "up") {
            setVelocity({ velocityX: 1, velocityY: 0 });
            setLastDirection("down");
          }
          break;
        case 37:
          if (lastDirection !== "right") {
            setVelocity({ velocityX: 0, velocityY: -1 });
            setLastDirection("left");
          }
          break;
        case 39:
          if (lastDirection !== "left") {
            setVelocity({ velocityX: 0, velocityY: 1 });
            setLastDirection("right");
          }
          break;
        default:
          break;
      }
      setIsPlaying(true);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lastDirection]);
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const newSnakeHead = {
          snakeX: parseInt(snake.snakeX) + velocity.velocityX,
          snakeY: parseInt(snake.snakeY) + velocity.velocityY,
        };

        setSnake(newSnakeHead);
        setSnakeBody((prevBody) => {
          const newBody = [...prevBody];
          for (let i = newBody.length - 1; i > 0; i--) {
            newBody[i] = newBody[i - 1];
          }
          newBody[0] = [newSnakeHead.snakeX, newSnakeHead.snakeY];
          return newBody;
        });
        if (
          newSnakeHead.snakeX < 1 ||
          newSnakeHead.snakeX > 30 ||
          newSnakeHead.snakeY < 1 ||
          newSnakeHead.snakeY > 30
        ) {
          setHasCollided(true);
        }
        for (let i = 1; i < snakeBody.length; i++) {
          if (
            newSnakeHead.snakeX === snakeBody[i][0] &&
            newSnakeHead.snakeY === snakeBody[i][1]
          ) {
            setHasCollided(true);
          }
        }
        if (hasCollided) {
          setIsPlaying(false);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [velocity, snake, isPlaying]);
  const foodStyle = {
    gridArea: `${food.foodX} / ${food.foodY}`,
  };
  const restart = () => {
    setSnake(initialstate);
    setHasCollided(false);

    setSnakeBody([[3, 4]]);
    setScore(0);
    setHasCollided(false);
    setLastDirection("");
    setVelocity({
      velocityX: "",
      velocityY: "",
    });
    setIsPlaying(false);
    changeFood();
  };

  return (
    <div className="container">
      <Redes/>
      {hasCollided && (
        <div className="game-over">
          <h1>Game over</h1>
          <button className="button" onClick={restart}>
            Restart
          </button>
        </div>
      )}
      <div className="wrapper">
        <div className="game-details">
          <span>Score:{score}</span>
          <span>High Score:{highscore}</span>
        </div>
        <div className="play-board">
          {<div className="food" style={foodStyle}></div>}
          {snakeBody.map((segment, index) => (
            <div
              key={index}
              className={index === 0 ? "head" : "bodyy"}
              style={{ gridArea: `${segment[0]} / ${segment[1]}` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Snake;
