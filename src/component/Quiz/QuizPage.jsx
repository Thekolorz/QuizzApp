import React, { Fragment } from 'react';
import 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import {
  MDBMask,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow
} from "mdbreact";
import Navigation from '../Landing/Navigation';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import IconButton from '@material-ui/core/IconButton';
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import HighlightOutlinedIcon from '@material-ui/icons/HighlightOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'; import '../Landing/landing.css';

import M from 'materialize-css';
import classnames from 'classnames';

import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';

import 'materialize-css/dist/css/materialize.min.css';
import "mdbreact/dist/css/mdb.css";
import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';

class QuizPlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: '',
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      // to prevent a random number that has been generated before 
      previousRandomNumbers:[],
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
      time: {}
    };
  }
  // to display the questions
  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
    this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);

  }

  // this method calls whenever the question changes
  displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        numberOfQuestions: questions.length,
        answer,
        // to make the hints work when we have only one hints left. => says to go back to empty array when the question changes but this one make it goes minues and works as well so we add an if to hints method
        previousRandomNumbers: []
        // to make the hints work when we have only 1 left because at this point the random number is part of the array and it doesn't work anymore
      }, () => { 
        this.showOptions();
        // we use this to bring back our options when the question is changed 
      });
    }
  };

  // to handle the click on each option button
  handleOptionClick = (e) => {

    // to check if the user selected the correct option
    if (e.target.text.toLowerCase() === this.state.answer.toLowerCase()) {
      setTimeout(() => {
        document.getElementById('correct-sound').play();
      }, 500)
      // so that if answered quickly still the audio plays
      this.correctAnswer();
    } else {
      setTimeout(() => {
        document.getElementById('wrong-sound').play();
      }, 500)

      this.WrongAnswer();
    }
  }

  // to make the next button functional-- show the next question
  handleNextButtonClick = () => {
    // if there is a next question ( at end doesn't any ) 
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }), () => {
        this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      });
      // we call it here to make sure it happens after the state has been updated (on the second parameter of our state with a callback)
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex - 1
      }), () => {
        this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      });
    }
  };

  handleQuitButtonClick = () => {
    this.playButtonSound();
    if (window.confirm('Are you sure you want to quit?')) {
     // to take us back to homepage
      this.props.history.push('/');
    }
  };



  // to control button sounds
  handleButtonClick = (e) => {
    // using switch to know which button is clicked
    switch (e.target.id) {
      // this is checking the id
      case 'next-button':
        this.handleNextButtonClick();
        break;

      case 'previous-button':
        this.handlePreviousButtonClick();
        break;

      case 'quit-button':
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }

  };

  playButtonSound = () => {
    document.getElementById('button-sound').play();
  }

  // handling wrong Answer 
  WrongAnswer = () => {
    
    M.toast({
      html: 'Wrong Answer',
      classes: 'toast-invalid',
      displayLength: 1500
    });
    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
      this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
    });
  }



  // handling Correct Answer 
  correctAnswer = () => {
    M.toast({
      html: 'Correct Answer!',
      classes: 'toast-valid',
      displayLength: 1500
    });
    this.setState(prevState => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
      this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion); // to change to another question 
    });
  }
// to undo the effect of hiding options due to using hints and we should call it at the end of display method options
showOptions = () => {
  const options = Array.from(document.querySelectorAll('.option'));
  options.forEach((option) => {
    option.style.visibility = 'visible';
  });
}

// handle hints and hides one option 
  handleHints = () => {
    // to prevent function being called when we don't have any hints left(hints goes minus) and we bring everything in if
    if (this.state.hints>0 ) {
      const options = Array.from(document.querySelectorAll('.option'));
      // query selector returns a node list which is like an array that's why we make an array
      // to get the index of the option that has the answers when we click on the hint icon
      let indexOfAnswer;
      // to loop through our options and get the index of the answer from that
      options.forEach((option, index) => {
        if (option.text.toLowerCase() === this.state.answer.toLowerCase()) {
          indexOfAnswer = index;
          // the index of answer we get here is going to restore in indexOfAnswer variable
        }
      });
      // because we want to get also a wrong answer we generate random numbers between 0-3
      // if the random number matches that index => hide that option
      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
          // to prevent a random number that has been generated before we check it by adding the include on if statement ( simply saying don't include the pre-generated one) 
        if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
          // to look through each option and if the index doesn't match to answer hide that option
          options.forEach((option, index) =>{
            if (index === randomNumber) {
              option.style.visibility = 'hidden';
              this.setState((prevState) =>({
                hints:prevState.hints -1,
                // and now we should append or push the generated number to our random number array if it does the if statement won't run and would generate another number
                previousRandomNumbers:prevState.previousRandomNumbers.concat(randomNumber)
            }));
          }
        });
        break;
        }
        // to not have an infinit loop if user uses all of the hints we
        if (this.state.previousRandomNumbers.length >=3)break;
      }
    }
   
  }

  render() {
    const { currentQuestion, currentQuestionIndex, numberOfQuestions, hints } = this.state;

    return (



      <div id="classicformpage">

        < Navigation />

        <MDBView>

          <MDBMask className="d-flex justify-content-right align-items-center gradient">
            <MDBContainer>
              <Fragment>
                <audio id="correct-sound" src={correctNotification}></audio>
                <audio id="wrong-sound" src={wrongNotification}></audio>
                <audio id="button-sound" src={buttonSound}></audio>
              </Fragment>
              <Fragment>
                <div className="questions">
                  ‍<h2> QUIZ PLAYGROUND </h2>
                  <div className="lifeLine-container" >
                    <p>
                      <span className="lifeLine" > <IconButton color="inherit">
                        <FavoriteBorderOutlinedIcon className="lifeLine-icon" /> </IconButton> 2 </span>
                    </p>
                    <p>
                      <span className="lifeLine" > <IconButton onClick={this.handleHints} color="inherit">
                        <HighlightOutlinedIcon className="lifeLine-icon" /> </IconButton>  {hints} </span>
                    </p>
                  </div>
                  <div className="lifeLine-container" >
                    <p>
                      <span className="lifeLine" > {currentQuestionIndex + 1} of {numberOfQuestions}</span>
                    </p>
                    <p>
                      <span className="lifeLine" > <IconButton color="inherit"> <HourglassEmptyOutlinedIcon />  00:10
                        </IconButton></span>
                    </p>
                  </div>

                

                  <h5> {currentQuestion.question} </h5>
                  <div className="option-container">

                    <MDBBtn  onClick={this.handleOptionClick} className="option" tag="a" size="lg" floating gradient="purple">{currentQuestion.optionA}</MDBBtn>
                    <MDBBtn onClick={this.handleOptionClick} className="option" tag="a" size="lg" floating gradient="purple">{currentQuestion.optionB}</MDBBtn>

                  </div>
                  <div className="option-container">
                    <MDBBtn onClick={this.handleOptionClick} className="option" tag="a" size="lg" floating gradient="purple">
                      {currentQuestion.optionC}
                    </MDBBtn>
                    <MDBBtn onClick={this.handleOptionClick} className="option" tag="a" size="lg" floating gradient="purple">
                      {currentQuestion.optionD}
                    </MDBBtn>
                  </div>

                </div>
                <div className="button-contaier">
                  <MDBBtn id="previous-button" onClick={this.handleButtonClick} outline color="white">
                    <ArrowBackIosIcon />
                    Previous
                  </MDBBtn>

                  <MDBBtn id="next-button" onClick={this.handleButtonClick} color="white">
                    Next
                    <ArrowForwardIosIcon />
                  </MDBBtn>

                  <MDBBtn id='quit-button' onClick={this.handleButtonClick} color="red">
                    Quit
                    <CloseIcon />
                  </MDBBtn>

                </div>
              </Fragment>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>


    );


  }
}

export default QuizPlay;
