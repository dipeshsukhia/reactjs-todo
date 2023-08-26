import React from "react";
import ScrollButton from "./ScrollButton";

const Layout = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <div className="navbar-brand">React Js Todo</div>
        </div>
      </nav>
      <div
        className="container"
        style={{ marginTop: "70px", marginBottom: "70px" }}
      >
          {children}
          <ScrollButton/>
      </div>
      <footer className="navbar fixed-bottom bg-dark text-white justify-content-center">
        Copyright © {new Date().getFullYear()}. All Rights Reserved &nbsp;{" "}
        <a
          href="https://dipeshsukhia.github.io/"
          className=" text-bg-dark"
          target="_blnk"
        >
          Dipesh Sukhia.
        </a>
      </footer>
    </>
  );
};

export default Layout;
