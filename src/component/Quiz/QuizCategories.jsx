import React from "react";
import {
  MDBMask,
  MDBBtn,
  MDBView,
  MDBContainer
} from "mdbreact";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Fragment } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../Landing/landing.css';
import Navigation from '../Landing/Navigation';

export default function quiz() {


  return (
    <div id="classicformpage">
      < Navigation />
      <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient">
          <MDBContainer>
            <div class="categories">
              <Fragment>
                <Link to="/QuizPage" ><MDBBtn color="red">Books</MDBBtn></Link>
                <MDBBtn color="unique">History</MDBBtn>
                <MDBBtn color="pink">Celebrities</MDBBtn>
                <MDBBtn color="purple">Movie</MDBBtn>
                <MDBBtn color="deep-purple">Music</MDBBtn>
                <MDBBtn color="indigo">Random</MDBBtn>
                <MDBBtn color="light-blue">Sports</MDBBtn>
                <MDBBtn color="cyan">General Knowledge</MDBBtn>
                <MDBBtn color="dark-green">Games</MDBBtn>
                {/*  <MDBBtn color="light-green">Light-green</MDBBtn>
                <MDBBtn color="yellow">Yellow</MDBBtn>
                <MDBBtn color="amber">Amber</MDBBtn>
                <MDBBtn color="deep-orange">Deep-orange</MDBBtn>
                <MDBBtn color="brown">Brown</MDBBtn>
                <MDBBtn color="blue-grey">Blue-grey</MDBBtn>
                <MDBBtn color="mdb-color">MDB</MDBBtn> */}
              </Fragment>
            </div>

            <Card class="heroCard" >
              <CardContent >
                <h1 color="white" gutterBottom>
                  How to Play the Game
                </h1>
                <hr className="hr-light" />

                <Typography color="white">
                  Each quiz has 4 options
                </Typography>
                <Typography variant="body2" component="p">
                  Each game has 2 lifelines normally.
                  <li> Two 50-50 chances which removes 2 of the wrong options </li>
                  <li> 5 hints. by clicking once it will remove one wrong option. you </li>

                </Typography>
              </CardContent>
            </Card>
          </MDBContainer>
        </MDBMask>
      </MDBView>
    </div>

  );
}


