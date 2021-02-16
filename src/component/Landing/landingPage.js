import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './landing.css';
import { Link } from "react-router-dom";
import QuizCategories from '../Quiz/QuizCategories';
import QuizPage from '../Quiz/QuizPage';
import axios from 'axios';
import Navigation from './Navigation';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFormInline,
  MDBAnimation
} from "mdbreact";

import "./landing.css";

class ClassicFormPage extends React.Component {


  render() {

    return (
      <div id="classicformpage">
        <Navigation />


        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <MDBAnimation
                  type="fadeInLeft"
                  delay=".3s"
                  className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5" >
                  <h1 className="h1-responsive font-weight-bold ">
                    GUESS WHAT!
                  </h1>
                  <hr className="hr-light" />
                  <h4 className="h1-responsive font-weight-bold">
                    Are you up for a game?
                  </h4>
                  <h6 className="mb-4">
                    Here is a platform you enjoy questioning and being questioned about.
                  </h6>
                  <Link to="/"><MDBBtn color="white" >
                      Host A Challenge 
                  </MDBBtn> </Link>


                  <Link to="/challengeFriends">
                  <MDBBtn outline color="white">
                    Challenge your friends
                  </MDBBtn> 
                  </Link>
                </MDBAnimation>

                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <MDBCard id="classic-card">
                      <MDBCardBody className="white-text">
                        <h3 className="text-center">
                          <MDBIcon icon="user" /> Register:
                        </h3>
                        <hr className="hr-light" />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Your name"
                          icon="user" />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Your email"
                          icon="envelope" />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Your password"
                          icon="lock"
                          type="password" />
                        <div className="text-center mt-4 black-text">
                          <MDBBtn color="white">Sign Up</MDBBtn>

                          <div className="text-center d-flex justify-content-center white-label">
                            <a href="#!" className="p-2 m-2">
                              <MDBIcon
                                fab
                                icon="twitter"
                                className="white-text" />
                            </a>
                            <a href="#!" className="p-2 m-2">
                              <MDBIcon
                                fab icon="linkedin"
                                className="white-text" />
                            </a>
                            <a href="#!" className="p-2 m-2">
                              <MDBIcon
                                fab icon="instagram"
                                className="white-text" />
                            </a>
                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>


        {/*   <MDBContainer>
          <MDBRow className="py-5">
            <MDBCol md="12" className="text-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </MDBCol>ß
          </MDBRow>
        </MDBContainer> */}

      </div>
    );
  }
}

export default ClassicFormPage;
