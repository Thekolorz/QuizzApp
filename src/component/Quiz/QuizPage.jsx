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

      });
    }
  };

  // to handle the click on each option button
  handleOptionClick = (e) => {

    // to check if the user selected the correct option
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      setTimeout(() => {
        document.getElementById('correct-sound').play();
      }, 500 ) 
      // so that if answered quickly still the audio plays
      this.correctAnswer();
    } else {
      setTimeout(() => {
        document.getElementById('wrong-sound').play();
      }, 500 )
      
      this.WrongAnswer();
    }
  }

  // to control button sounds
handleButtonClick = () => {
  this.playButtonSound();
};
playButtonSound = () => {
  document.getElementById('button-sound').play();
}

  // handling wrong Answer 
  WrongAnswer = () => {
    navigator.vibrate(1000);
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
  render() {
    const { currentQuestion, currentQuestionIndex, numberOfQuestions } = this.state;

    return (
     
     
  
      <div id="classicformpage">
       
        < Navigation />
    
        <MDBView>
    
          <MDBMask className="d-flex justify-content-right align-items-center gradient">
            <MDBContainer>
            <Fragment>
      <audio id="correct-sound"  src={correctNotification}></audio>
      <audio id="wrong-sound"  src={wrongNotification}></audio>
      <audio  id="button-sound"src={buttonSound}></audio>
    </Fragment>
              <Fragment>
                <div className="questions">
                  ‍<h2> QUIZ PLAYGROUND </h2>
                  <div className="lifeLine-container">
                    <p>
                      <span className="lifeLine"> <IconButton color="inherit">
                        <FavoriteBorderOutlinedIcon /> </IconButton> 2 </span>
                    </p>
                    <p>
                      <span className="lifeLine" > <IconButton color="inherit">
                        <HighlightOutlinedIcon /> </IconButton> 2 hints </span>
                    </p>
                  </div>
           
                  <div className = "Timer-container">
                    <MDBRow className="mx-md-n5">
                      <MDBCol size="6" className="left py-3 px-md-5">
                        {currentQuestionIndex +1 } of { numberOfQuestions}
                       </MDBCol>

                      <MDBCol size="6" className="right py-3 px-md-5">
                        <IconButton color="inherit"> <HourglassEmptyOutlinedIcon />  00:10
                        </IconButton>
                      </MDBCol>
                    </MDBRow>
                  </div>

                  <h5> {currentQuestion.question} </h5>
                  <div className="option-container">

                    <MDBBtn onClick={this.handleOptionClick} className="option" tag="a" size="lg" floating gradient="purple">{currentQuestion.optionA}</MDBBtn>
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
                  <MDBBtn onClick={this.handleButtonClick}  outline color="white">
                    <ArrowBackIosIcon /> 
                    Previous 
                  </MDBBtn>

                  <MDBBtn onClick={this.handleButtonClick}  color="white">
                    Next 
                    <ArrowForwardIosIcon />
                  </MDBBtn>

                  <MDBBtn onClick={this.handleButtonClick} color="red">
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

{/*  <p>Counter: {this.state.counter} </p>
        <button onClick={this.increaseCount}  >Click me</button>
      </div> */}
