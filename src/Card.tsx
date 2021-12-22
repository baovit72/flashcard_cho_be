import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./App.css";
import ReactCardFlip from "react-card-flip";

const Speech = require("react-speech");
const TextToIPA = require("text-to-ipa");
const axios = require("axios");

// TextToIPA.loadDict();
function GetState(initValue: any) {
  const [value, setValue] = useState(initValue);
  return { value, setValue };
}
function Card(props: any) {
  const { cardInfo } = props;
  const flip = GetState(false);
  return (
    <ReactCardFlip flipDirection={"horizontal"} isFlipped={flip.value}>
      <div>
        {/* <Speech text="Welcome to react speech"></Speech> */}
        <div
          onClick={() => flip.setValue(!flip.value)}
          className={
            (cardInfo.id % 2 ? "bg-fox" : "bg-bear") + " m-auto div-card"
          }
        >
          <div>
            <div>{cardInfo.field4}</div>
            <div>{cardInfo.field5}</div>
          </div>
        </div>
      </div>

      <div
        onClick={() => flip.setValue(!flip.value)}
        className={
          (cardInfo.id % 2 ? "bg-fox" : "bg-bear") + " m-auto div-card"
        }
      >
        <div>
          <div style={{ fontSize: "1.45rem" }}>{cardInfo.field6}</div>
        </div>
      </div>
    </ReactCardFlip>
  );
}

export default Card;
