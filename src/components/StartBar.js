import React, { useState, useRef, createRef, useContext } from "react";
import GlobalContext from "../GlobalContext";
import Time from "./Time";
import windowsIcon from "../assets/windowsIcon.png";
import computer from "../assets/mycomputer.png";
import file from "../assets/file.png";
import mine from "../assets/mine.png";
import folder from "../assets/folder2.png";

export default function StartBar({
  setShowMenu,
  showMenu,
  pages,
  activePages,
  setActivePages,
}) {
  const {
    selected,
    setSelected,
    planetRef,
    bioRef,
    burgerRef,
    pokeRef,
    projectRef,
    invoiceRef,
    mineRef,
    npsRef,
    mtgRef,
    visiblePages,
    setVisiblePages,
  } = useContext(GlobalContext);
  const allItemRefs = useRef([]);
  allItemRefs.current = pages.map(
    (element, i) => allItemRefs.current[i] ?? createRef()
  );
  const btnRef = useRef();
  const iconRef = useRef();
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    // setPressed(!pressed);
    setShowMenu(!showMenu);
    btnRef.current.classList.toggle("pressed");
  };

  const handleIconClick = (ref, page) => {
    selected === page ? setSelected("") : setSelected(page);
    if (page === "Bio") {
      bioRef.current.style.display =
        bioRef.current.style.display === "flex" &&
        bioRef.current.classList.contains("top")
          ? "none"
          : "flex";
    } else if (page === "Projects") {
      projectRef.current.style.display =
        projectRef.current.style.display === "flex" &&
        projectRef.current.classList.contains("top")
          ? "none"
          : "flex";
    } else if (page === "Planet Facts") {
      planetRef.current.style.display =
        planetRef.current.style.display === "block" &&
        planetRef.current.classList.contains("top")
          ? "none"
          : "block";
    } else if (page === "National Parks") {
      npsRef.current.style.display =
        npsRef.current.style.display === "block" &&
        npsRef.current.classList.contains("top")
          ? "none"
          : "block";
    } else if (page === "Invoice App") {
      invoiceRef.current.style.display =
        invoiceRef.current.style.display === "block" &&
        invoiceRef.current.classList.contains("top")
          ? "none"
          : "block";
    } else if (page === "Minesweeper") {
      mineRef.current.style.display =
        mineRef.current.style.display === "flex" &&
        mineRef.current.classList.contains("top")
          ? "none"
          : "flex";
    } else if (page === "MTG Deck Builder") {
      mtgRef.current.style.display =
        mtgRef.current.style.display === "block" &&
        mtgRef.current.classList.contains("top")
          ? "none"
          : "block";
    } else if (page === "Burger") {
      burgerRef.current.style.display =
        burgerRef.current.style.display === "block" &&
        burgerRef.current.classList.contains("top")
          ? "none"
          : "block";
    } else if (page === "Pokedex") {
      pokeRef.current.style.display =
        pokeRef.current.style.display === "block" &&
        pokeRef.current.classList.contains("top")
          ? "none"
          : "block";
    }
  };

  return (
    <div className="startBar">
      <button ref={btnRef} className="startBtn" onClick={handleClick}>
        <div className="btnContentWrapper">
          <img
            style={{ paddingRight: "0", height: "25px", width: "23px" }}
            className="startBtnIcon"
            src={windowsIcon}
          />
          Start
        </div>
      </button>
      <div className="openWindows">
        {pages.map((page, index) => {
          return (
            <div
              key={index}
              id={page}
              ref={allItemRefs.current[index]}
              onClick={() => handleIconClick(allItemRefs.current[index], page)}
              className={selected === page ? "pressed" : "notPressed"}
            >
              {page === "Bio" && (
                <img style={{ height: "100%" }} src={computer} />
              )}
              {page === "Projects" && (
                <img style={{ height: "100%" }} src={folder} />
              )}
              {page === "Minesweeper" && (
                <img style={{ height: "100%" }} src={mine} />
              )}
              {page === "Planet Facts" && (
                <img style={{ height: "100%" }} src={file} />
              )}
              {page === "National Parks" && (
                <img style={{ height: "100%" }} src={file} />
              )}
              {page === "Invoice App" && (
                <img style={{ height: "100%" }} src={file} />
              )}
              {page === "MTG Deck Builder" && (
                <img style={{ height: "100%" }} src={file} />
              )}
              {page === "Burger" && (
                <img style={{ height: "100%" }} src={file} />
              )}
              {page === "Pokedex" && (
                <img style={{ height: "100%" }} src={file} />
              )}
              {page}
            </div>
          );
        })}
      </div>
      <div data-testid="clock" className="clock">
        <Time />
      </div>
    </div>
  );
}
