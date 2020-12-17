import React from "react";
import TodoList from "./todo/TodoList";
import TodoAdd from "./todo/TodoAdd";

import "./App.css";

import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";

/*
       <Navbar bg="light" expand="lg">
         <Navbar.Brand href="#home">TODO</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="mr-auto">
             <Nav.Link href="#home">Domů</Nav.Link>
             <Nav.Link href="#link">Link</Nav.Link>
           </Nav>
         </Navbar.Collapse>
       </Navbar>;
*/

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <TodoAdd />
              <TodoList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
