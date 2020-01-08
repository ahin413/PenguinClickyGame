import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Penguins from "./components/Penguins";
import images from "./images";


class App extends Component {
  state = {
    score: 0,
    highScore: 0,

    // stores the class value to assign to navMessage based on a good or bad click
    navMsgColor: '',

    // contains intro, success, and failure message
    navMessage: 'Click a picture to start!',

    // contains an array of image urls
    allPenguins: this.shuffleArray(),

    // will track  each clicked element.
    wasClicked: [],

    // shakes the container on an incorrect guess if set to true
    shake: false
  };

  // binds the current this context to checkClicked to have access to the current state
  // when passed down to the Puppies component
  clickEvent = this.checkClicked.bind(this);

  // used to shuffle the array of images when the DOM loads, and when an image is clicked
  shuffleArray() {
    // creates a copy of the current Puppies array to modify it by value, and not by reference
    const newArr = images.slice();

    // will store the shuffled array
    const shuffleArr = [];

    // each loop through an index gets spliced from newArr, reducing its length
    // gets a random index based off the current length of newArr
    // splices the value from newArr, and pushes it to shuffleArr
    while (newArr.length > 0) {
      shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
    }

    return shuffleArr;
  }

  checkClicked(clickedElem) {
    // creates a copy of the wasClicked array to modify it by value, and not by reference. wasClicked stores all previous clicked images
    const prevState = this.state.wasClicked.slice();

    // shuffles the images
    const shuffled = this.shuffleArray();

    // tracks score
    let score = this.state.score;
    let highScore = this.state.highScore;

    // if the clicked item is not in wasClicked, then it hasn't been clicked and the score is increased
    if (!this.state.wasClicked.includes(clickedElem)) {
      // if score and highScore are the same, then there is a new highScore value
      if (score === highScore) {
        score++;
        highScore++;

   
      } else {
        score++;
      }

      prevState.push(clickedElem);
    }

   
    if (this.state.wasClicked.includes(clickedElem)) {
      let score = 0;
      return this.setState({
        score: score,
        highScore: highScore,
        navMsgColor: 'incorrect',
        navMessage: 'You Guessed Wrong!',
        allPenguins: shuffled,
        wasClicked: [],
        shake: true
      });
    }

    // if this runs, then the same element has not been clicked twice and the score is increased
    this.setState({
      score: score,
      highScore: highScore,
      navMsgColor: 'correct',
      navMessage: 'Correct! Keep Guessing!',
      allPenguins: shuffled,
      wasClicked: prevState,
      shake: false
    });

    return setTimeout(() => this.setState({ navMsgColor: '' }), 500);
  }


  render() { 
    const state = this.state;
    return (
      <div>
        <NavBar
          score={state.score}
          highScore={state.highScore}
          navMessage={state.navMessage}
          navMsgColor={state.navMsgColor}
        />
        
        <Container
          shake={state.shake}
          Penguins={state.allPenguins}
          clickEvent={this.clickEvent}
        />
        <Footer />
      </div>
    );
  }
}

export default App;