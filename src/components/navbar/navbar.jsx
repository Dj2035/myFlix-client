import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

import "./navbar.scss";

export function Menubar({ user }) {

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  }

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  return (
    <Navbar className="main-nav" sticky="top" expand="lg" bg="dark" variant="blue">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href="/">Home</Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link href="/">Sign-in</Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link href="/register">Sign-up</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={onLoggedOut}>Logout</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}