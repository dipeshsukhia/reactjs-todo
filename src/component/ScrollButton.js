import React, { useState } from "react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      className={`position-fixed end-0 mx-2 cursor-pointer ${
        visible ? "d-block" : "d-none"
      }`}
      style={{
        bottom: "50px",
      }}
    >
      <i onClick={scrollToTop} className="btn btn-dark rounded-circle border-5">
        &#8593;
      </i>
    </div>
  );
};

export default ScrollButton;