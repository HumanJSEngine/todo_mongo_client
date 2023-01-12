import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import RiseLoader from "react-spinners/RiseLoader";
import PacmanLoader from "react-spinners/PacmanLoader";
import * as s from '../styles/Styletest';

const LoadingSpinner = () => {
  return (
    <s.PacmanDiv>
        <PacmanLoader color="#36d7b7" size={45} />
    </s.PacmanDiv>
  );
};

export default LoadingSpinner;
