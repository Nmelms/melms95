import React, { useRef, useState, useEffect, useContext } from "react";
import GlobalContext from "../../GlobalContext";
import file from "../../assets/mine.png";
import Tile from "./Tile";
import Bomb from "./Bomb";
import { getByTitle } from "@testing-library/dom";
import ScoreBoard from "./ScoreBoard";
import { useDrag } from "@use-gesture/react";

export default function MineSweeper() {
  const { mineRef, selected, setSelected, pages, setPages } =
    useContext(GlobalContext);
  const [newGame, setNewGame] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [fullScreen, setFullScreen] = useState("");
  const [gameBoard, setGameBoard] = useState([]);
  const [numOfFlags, setNumOfFlags] = useState(0);
  const [numOfBombs, setNumOfBombs] = useState(10);
  const tileRef = useRef([]);
  const gameOverRef = useRef();
  let gameOver = false;
  const row = 10;
  const col = 10;

  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });

  const bindWindowPos = useDrag((params) => {
    setWindowPosition({
      x: params.offset[0],
      y: params.offset[1],
    });
  });

  const initBoard = () => {
    let newGameBoard = [];
    let bombsArr = [];
    setNumOfFlags(0);
    setGameWon(false);
    const setNumbers = () => {
      newGameBoard.map((tile, index) => {
        let bombCount = 0;
        //check above all tiles not on top row
        if (tile.x !== 0 && newGameBoard[index - 10].value === "x") {
          if (tile.value !== "x") {
            bombCount++;
            tile.value = bombCount;
          }
        }
        //check top right on all tiles not on top row
        if (
          tile.x !== 0 &&
          tile.y !== 9 &&
          newGameBoard[index - 9].value === "x"
        ) {
          if (tile.value !== "x") {
            bombCount++;
            tile.value = bombCount;
          }
        }
        // check to right of all tiles not on right side
        if (tile.y !== 9 && newGameBoard[index + 1].value === "x") {
          if (tile.value !== "x") {
            bombCount++;
            tile.value = bombCount;
          }
        }
        //check bottom right of all tiles not on right side
        if (tile.x !== 9 && tile.y !== 9) {
          if (newGameBoard[index + 11].value === "x" && tile.value !== "x") {
            bombCount++;
            tile.value = bombCount;
          }
        }
        //check below every tile not on bottom row
        if (tile.x !== 9 && newGameBoard[index + 10].value === "x") {
          if (tile.value !== "x") {
            bombCount++;
            tile.value = bombCount;
          }
        }
        // check bottom left of every tile not on bottom
        if (tile.y !== 0 && tile.x !== 9) {
          if (tile.value !== "x" && newGameBoard[index + 9].value === "x") {
            bombCount++;
            tile.value = bombCount;
          }
        }
        //check left of every tile not on left side
        if (tile.y !== 0 && newGameBoard[index - 1].value === "x") {
          if (tile.value !== "x") {
            bombCount++;
            tile.value = bombCount;
          }
        }
        //check top left of every title
        if (tile.y !== 0 && tile.x !== 0) {
          if (tile.value !== "x" && newGameBoard[index - 11].value === "x") {
            bombCount++;
            tile.value = bombCount;
          }
        }
      });
    };

    //creates a new board
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        newGameBoard.push({ value: "", x: i, y: j, hidden: true, flag: false });
      }
    }

    //add mines
    while (bombsArr.length < numOfBombs) {
      const num = Math.floor(Math.random() * (99 - 0 + 1) + 0);
      if (!bombsArr.includes(num)) {
        bombsArr.push(num);
      }
    }
    for (let i = 0; i < bombsArr.length; i++) {
      newGameBoard[bombsArr[i]].value = "x";
    }
    //setnumber of mines on tile
    setNumbers();
    setGameBoard(newGameBoard);
  };

  const resetClick = () => {
    gameBoard.map((tile, i) => {
      tileRef.current[i].classList.remove("visible");
      tileRef.current[i].classList.remove("flag");
      tileRef.current[i].classList.remove("visibleBomb");
    });
    gameOverRef.current.style.display = "none";
    initBoard();
  };

  const handleTileClick = (tile, i) => {
    let count = 0;
    gameBoard.map((tile) => {
      tile.hidden === false && count++;
      if (count === row * col - numOfBombs - 1) {
        setGameWon(true);
      }
    });

    if (tile.flag === true) return;
    tileRef.current[i].classList.add("visible");
    tile.hidden = false;
    tile.value === "x" && bombClick();
    tile.value === "" && check(tile, i);
  };

  const bombClick = () => {
    gameOverRef.current.style.display = "block";
    gameBoard.map((tile, i) => {
      if (tile.value === "x") {
        tileRef.current[i].classList.add("visibleBomb");
      }
    });
  };

  const handleRightClick = (e, tile, i) => {
    e.preventDefault();
    if (tile.hidden === false) {
      tileRef.current[i].classList.remove("flag");
      return;
    }

    tile.flag = !tile.flag;
    tile.flag === true
      ? tileRef.current[i].classList.add("flag")
      : tileRef.current[i].classList.remove("flag");

    tile.flag === true
      ? setNumOfFlags(numOfFlags + 1)
      : setNumOfFlags(numOfFlags - 1);
  };

  const check = (tile, i) => {
    // //check top
    console.log(tile);
    if (
      tile.x !== 0 &&
      gameBoard[i - 10].hidden === true &&
      gameBoard[i - 10].flag === false
    ) {
      tileRef.current[i - 10].classList.add("visible");
      tile.hidden = false;
      handleTileClick(gameBoard[i - 10], i - 10);
    }
    //check top right
    if (
      tile.y !== 9 &&
      tile.x !== 0 &&
      gameBoard[i - 9].hidden === true &&
      gameBoard[i - 9].flag === false
    ) {
      tileRef.current[i - 9].classList.add("visible");
      tile.hidden = false;
      handleTileClick(gameBoard[i - 9], i - 9);
    }
    // check right
    if (
      tile.y !== 9 &&
      gameBoard[i + 1].hidden === true &&
      gameBoard[i + 1].flag === false
    ) {
      tileRef.current[i + 1].classList.add("visible");
      tile.hidden = false;
      handleTileClick(gameBoard[i + 1], i + 1);
    }
    //check bottom right
    if (
      tile.x !== 9 &&
      tile.y !== 9 &&
      gameBoard[i + 11].hidden === true &&
      gameBoard[i + 11].flag === false
    ) {
      tileRef.current[i + 11].classList.add("visible");
      tile.hidden = false;
      handleTileClick(gameBoard[i + 11], i + 11);
    }
    //check bottom
    if (
      tile.x !== 9 &&
      gameBoard[i + 10].hidden === true &&
      gameBoard[i + 10].flag === false
    ) {
      tileRef.current[i + 10].classList.add("visible");
      tile.hidden = false;
      handleTileClick(gameBoard[i + 10], i + 10);
    }
    //check bottom left
    if (
      tile.x !== 9 &&
      tile.y !== 0 &&
      gameBoard[i + 9].hidden === true &&
      gameBoard[i + 9].flag === false
    ) {
      tileRef.current[i + 9].classList.add("visible");
      tile.hidden = false;
      handleTileClick(gameBoard[i + 9], i + 9);
    }
    //check left
    if (
      tile.y !== 0 &&
      gameBoard[i - 1].hidden === true &&
      gameBoard[i - 1].flag === false
    ) {
      tileRef.current[i - 1].classList.add("visible");
      tile.hidden = false;
      handleTileClick(gameBoard[i - 1], i - 1);
    }
    //check top left
    if (
      tile.y !== 0 &&
      tile.x !== 0 &&
      gameBoard[i - 11].hidden === true &&
      gameBoard[i - 11].flag === false
    ) {
      tileRef.current[i - 11].classList.add("visible");
      tile.hidden = false;
      handleTileClick(gameBoard[i - 11], i - 11);
    }
  };
  const handleClick = () => {
    setSelected("Minesweeper");
  };

  const handleCloseClick = (event) => {
    const newArr = pages;
    const filtered = newArr.filter((item) => item !== "Minesweeper");
    setPages(filtered);
  };
  const handleFullScreenClick = () => {
    fullScreen === "fullScreen"
      ? setFullScreen("")
      : setFullScreen("fullScreen");
  };

  const handleMinimizeClick = (e) => {
    e.stopPropagation();
    setSelected("");
    mineRef.current.style.display = "none";
  };

  useEffect(() => {
    initBoard();
  }, []);

  //shows bombs when game is won
  gameWon &&
    gameBoard.map((tile, i) => {
      if (tile.value === "x") {
        tileRef.current[i].classList.add("visibleBomb");
      }
    });

  return (
    <div
      style={
        fullScreen === "fullScreen"
          ? { display: "flex", left: "0", top: "0" }
          : { display: "flex", left: windowPosition.x, top: windowPosition.y }
      }
      className="gameWrapper"
    >
      <div
        onPointerDown={handleClick}
        style={{ display: "flex" }}
        ref={mineRef}
        className={
          selected === "Minesweeper"
            ? `gameBoard top  ${fullScreen}`
            : "gameBoard"
        }
      >
        <nav {...bindWindowPos()} className="windowNav">
          <div className="nameAndIcon">
            <img style={{ height: "18px" }} src={file} />
            <p>MineSweeper</p>
          </div>
          <div className="windowNavBtns">
            <button
              onClick={(event) => handleMinimizeClick(event)}
              // onPointerDown={(e) => miniDown(e)}
              className="navBtn"
            >
              _
            </button>
            {/* <button
              onClick={(event) => handleFullScreenClick(event)}
              className="navBtn"
            >
              O
            </button> */}
            <button
              data-testid="npsClose"
              onClick={(event) => handleCloseClick(event)}
              className="navBtn"
            >
              X
            </button>
          </div>
        </nav>
        <ScoreBoard numOfBombs={numOfBombs} numOfFlags={numOfFlags} />
        {gameWon && (
          <div style={{ display: "flex" }} className="gameover">
            <h1>You Win!</h1>
            <button onClick={() => resetClick()}>Reset</button>
          </div>
        )}
        <div ref={gameOverRef} style={{ display: "none" }} className="gameover">
          <h1>GameOver</h1>
          <button onClick={() => resetClick()}>Reset</button>
        </div>
        {gameBoard.map((tile, i) => {
          return (
            <div
              ref={(ref) => (tileRef.current[i] = ref)}
              onContextMenu={(e) => handleRightClick(e, tile, i)}
              onClick={() => handleTileClick(tile, i)}
              className="tile"
            >
              {tile.value !== "x" && tile.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
