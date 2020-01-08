import React from 'react';
import './style.css';

const NavBar = props => (
  <div className="navbar ">
    <div>Penguin Clicky Game</div>
    <div className={props.navMsgColor}>{props.navMessage}</div>
    <div>
      Score: {props.score} <span className="userScore">|</span> High Score: {props.highScore}
    </div>
  </div>
);

export default NavBar;