import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <div className="navbar-brand">
          React Js Todo
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          
        </div>
      </nav>
      <div className="container" style={{"marginTop": "70px","marginBottom": "70px"}}>
          {children}
      </div>
      <footer className="navbar fixed-bottom bg-dark text-white justify-content-center">
          Copyright © {new Date().getFullYear()}.
          All Rights Reserved Dipesh Sukhia.
        </footer>
    </>
  );
};

export default Layout;
