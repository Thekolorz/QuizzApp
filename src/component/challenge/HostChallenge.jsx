import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import './challenge.css';
import { Link } from "react-router-dom";
import QuizCategories from '../Quiz/QuizCategories';
import QuizPage from '../Quiz/QuizPage';
import { MDBSelect } from "mdbreact";
import Form from 'react-bootstrap/Form'
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
  MDBAnimation
} from "mdbreact";

class FormsPage extends React.Component {
  state = {
    fname: {
      value: "Mark",
      valid: true
    },

    state: {
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
                  Create A Challenge
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
                      label="Game Room Name"
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
                      label="Game Room Pin"
                      required
                    >
                      <div className="invalid-feedback">
                        Please provide a valid Pin.
                </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBInput>
                  </MDBCol>

                </MDBRow>

                <MDBRow>

                  <MDBCol>
                    <Form>

                      <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                        <Form.Label>Pick a category</Form.Label>
                        <Form.Control as="select" size="lg" custom>
                          <option>Books</option>
                          <option>Entertainment</option>
                          <option>General Knowledge</option>
                          <option>Music</option>
                          <option>film</option>
                          <option>History</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                        <Form.Label>Pick A difficulty</Form.Label>
                        <Form.Control as="select" size="lm" custom>
                          <option>Easy</option>
                          <option>medium</option>
                          <option>Hard</option>

                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </MDBCol>

                </MDBRow>

                <MDBBtn color="white" type="submit">
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