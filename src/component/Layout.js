import React from "react";
import Navbar from "react-bootstrap/Navbar";
import ScrollButton from "./ScrollButton";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <div className="bg-body-secondary">
      <Navbar expand="lg" className="navbar-dark bg-dark fixed-top">
        <Container>
          <Navbar.Brand>React Js Todo</Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{ paddingTop: "70px", paddingBottom: "70px" }}>
        {children}
        <ScrollButton />
      </Container>
      <footer className="navbar fixed-bottom bg-dark text-white justify-content-center">
        Copyright © {new Date().getFullYear()}. All Rights Reserved &nbsp;
        <a
          href="https://dipeshsukhia.github.io/"
          className=" text-bg-dark"
          target="_blnk"
        >
          Dipesh Sukhia.
        </a>
      </footer>
    </div>
  );
};

export default Layout;
