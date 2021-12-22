import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Col, Container, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./Card";
import "./App.css";
const TextToIPA = require("text-to-ipa");
const axios = require("axios");

// TextToIPA.loadDict();
function GetState(initValue: any) {
  const [value, setValue] = useState(initValue);
  return { value, setValue };
}
function App() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let cardHeight = GetState(485);
  let cards = GetState([]);
  let loading = GetState(true);
  const csvToObject = (csv: any): any => {
    return new Promise((resolve, reject) => {
      const csvParser = require("csvtojson");
      csvParser({
        noheader: true,
        output: "json",
      })
        .fromString(csv)
        .then((csvRow: any) => {
          resolve(csvRow);
        });
    });
  };

  useEffect(() => {
    //1184/938
    axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSHMAZRALJ1Gp0DgGSojEL_t3G0HpIPlSZ3j7p35FqOsdmP36cKY9L_lNoSttMcbDDM5SryHfuIsfYV/pub?gid=0&single=true&output=csv"
      )
      .then(async (res: any) => {
        cards.setValue((await csvToObject(res.data)).slice(2));
        setTimeout(() => loading.setValue(false), 2000);
      });
  }, []);
  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-center carousel-container">
          <div style={{ display: loading.value ? "none" : "block" }}>
            <Slider {...settings}>
              {cards.value
                .filter((card: any) => card.field4.length)
                .sort((a: any, b: any) => a.field4.localeCompare(b.field4))
                .map((card: any, index: any) => (
                  <Card cardInfo={{ ...card, id: index }}></Card>
                ))}
            </Slider>
          </div>
          <div
            style={{
              display: !loading.value ? "none" : "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              flexDirection: "column",
              backgroundColor: "white",
              width: "100vw",
              height: "100vh",
            }}
          >
            <div className="load-text">wait a little bit my bear</div>
            <img
              style={{ width: "100vw", maxWidth: "500px" }}
              src="https://c.tenor.com/8bz7KTSlKyQAAAAC/couple-goma.gif"
            />
          </div>
        </Row>
      </Container>
      <div id="cover">
        <form method="get" action="">
          <div className="tb">
            <div className="td">
              <input type="text" placeholder="Search" required />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
