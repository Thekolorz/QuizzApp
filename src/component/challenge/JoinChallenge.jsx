import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import './challenge.css';
import { Link } from "react-router-dom";
import QuizCategories from '../Quiz/QuizCategories';
import QuizPage from '../Quiz/QuizPage';

import Navigation from '../Landing/Navigation';
import { 
  MDBRow, 
  MDBCol, 
  MDBInput, 
  MDBMask,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBFormInline,
  MDBAnimation } from "mdbreact";

class FormsPage extends React.Component {
  state = {
    fname: {
      value: "Mark",
      valid: true
    },
    lname: {
      value: "Otto",
      valid: true
    },
    email: {
      value: "",
      valid: false
    },
    city: {
      value: "",
      valid: false
    },
    state: {
      value: "",
      valid: false
    },
    zip: {
      value: "",
      valid: false
    }
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: { value: event.target.value, valid: !!event.target.value } });
  };

  render() {
    return (
      <div id="classicformpage">
         <Navigation />

        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
        <form>
        <h1 className="h1-responsive font-weight-bold ">
                    Join the Challenge 
                  </h1>
                  <hr className="hr-light" />
        <MDBRow>
            <MDBCol >
              <MDBInput
                value={this.state.fname.value}
                className={this.state.fname.valid ? "is-valid" : "is-invalid"}
                name="fname"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                label="Displayed Name"
                required
              >
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Provide a valid name!</div>
              </MDBInput>
            </MDBCol>
      
          </MDBRow>
          <MDBRow>
            
            <MDBCol>
              <MDBInput
                value={this.state.state.value}
                className={this.state.state.valid ? "is-valid" : "is-invalid"}
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="state"
                label="Game Pin"
                required
              >
                <div className="invalid-feedback">
                  Please provide a valid Pin.
                </div>
                <div className="valid-feedback">Looks good!</div>
              </MDBInput>
            </MDBCol>
           
          </MDBRow>
          
          <MDBBtn  color="white" type="submit">
            Join
          </MDBBtn>
        </form>
        </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

export default FormsPage;