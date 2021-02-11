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
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/" exact component={landingPage} />      
        <Route path="/QuizPage" exact component={QuizPage} /> 
        <Route path="/QuizCategories" exact component={QuizCategories} /> 
        <Route path="/QuizSummary" exact component={QuizSummary} /> 
        
       

      </Switch>

    </div>
  </Router>
  );
}

export default App;
