import React from 'react';
import 'react-router-dom';
import "../src/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import landingPage from './component/Landing/landingPage';
import navigation from './component/Landing/Navigation';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css'; 
import QuizPage from './component/Quiz/QuizPage';
import QuizCategories from './component/Quiz/QuizCategories';
import QuizSummary from './component/Quiz/QuizSummary';
import challengeFriends from './component/challenge/challengeFriends';
import { Link } from "react-router-dom";

import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import LoadingPage from './component/Multiplayer/components/LoadingPage';
import { setCategories, setQuestion, setMessage, setStatus, setScoreboard, resetGame} from './component/Multiplayer/actions/game';
import { addPlayer, removePlayer, setStroke, setScore, resetStroke, setPlayers } from './component/Multiplayer/actions/players';
import {resetType} from './component/Multiplayer/actions/clientType'


import 'normalize.css/normalize.css';
import './styles/styles.scss';

export const socket = io();
const store = configureStore();

socket.on("categories", (data) => {
   store.dispatch(setCategories(data));
});

socket.on("PLAYER-CONNECTED", (player) => {
   store.dispatch(addPlayer(player));
});

socket.on("PLAYER-DISCONNECT", (player) => {
   store.dispatch(removePlayer(player.name));
});

socket.on("ALL-DISCONNECT", () => {
   const state = store.getState();
   if(state.game.status !== "finished") {
      store.dispatch(resetGame());
      store.dispatch(setPlayers([]));
      store.dispatch(resetType());
      socket.disconnect();
      socket.connect();
      alert("All players disconnected. Taking you back to the home page.")
      history.push("/");
   }
});

socket.on("HOST-DISCONNECT", () => {
   const state = store.getState();
   if(state.game.status !== "finished") {
      store.dispatch(resetGame());
      store.dispatch(setPlayers([]));
      store.dispatch(resetType());
      socket.disconnect();
      socket.connect();
      alert("Host Disconnected. Taking you back to the home page.")
      history.push("/");
   }
});

socket.on("correctAnswer", (data) => {
   store.dispatch(setScore(data.name, data.score));
   store.dispatch(setStroke(data.name, "green"));
});

socket.on("incorrectAnswer", (player) => {
   store.dispatch(setStroke(player, "red"));
});

socket.on("gameFinished", (scoreboard) => {

   store.dispatch(setScoreboard(scoreboard));
   store.dispatch(setStatus("finished"));
});

socket.on("newQuestion", (res) => {
   
   if(res.wait === true) {
      setTimeout(() => {
         store.dispatch(setMessage(""));
         store.dispatch(resetStroke());
         store.dispatch(setQuestion(res.question));
         history.push("/play");
      }, 2000);
   } else {
      store.dispatch(setMessage(""));
      store.dispatch(setStatus("active"));
      store.dispatch(setQuestion(res.question));
      history.push("/play");
   }

   

});

const jsx = (
   <Provider store={store}>
      <AppRouter />
   </Provider>
);


ReactDOM.render(jsx, document.getElementById("app"));

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/" exact component={landingPage} />   
        <Route path="/QuizPage" exact component={QuizPage} /> 
        <Route path="/QuizCategories" exact component={QuizCategories} /> 
        <Route path="/QuizSummary" exact component={QuizSummary} /> 
        <Route path="/challengeFriends" exact component={challengeFriends} /> 

        
       

      </Switch>

    </div>
  </Router>
  );
}

export default App;
