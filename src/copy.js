import "./App.css";
import React, { useState, useEffect } from "react";
import { getBindingIdentifiers } from "@babel/types";

//TODO
//1) Fix DB section
//2) Fix Errors
//3) UI

function Header() {
  return (
    <header>
      <h1 style={{ textAlign: "center" }}>Which bands are one hit wonders</h1>
    </header>
  );
}

function testOneHit(name, setData) {
  let data;
  return fetch("/one_hit/" + name)
    .then(response => response.text())
    .then(result => {
      data = JSON.parse(result); //ADD A FOR WHEN THERE IS A ERROR (i.e. Garth Brooks)
      setData(data);
      console.log(data);
      if (data.is_one_hit) {
        document.getElementById("oneHitResults").innerHTML =
          data.band +
          "'s most popular song is " +
          data.song +
          ". \n" +
          data.band +
          " is a one hit wonder";
      } else {
        document.getElementById("oneHitResults").innerHTML =
          data.band +
          "'s most popular song is " +
          data.song +
          ". \n" +
          data.band +
          " is not a one hit wonder";
      }
      return data;
      // Now that `data` has been defined, we can do something with it
    })
    .catch(error => console.log("error", error));
}

function callDB(resp, data, setDbResp, setYes) {
  fetch("/db/" + data.uri + "/" + data.band + "/" + resp)
    .then(response => response.text())
    .then(result => {
      data = JSON.parse(result);
      setDbResp(data);
      setYes(true);
      console.log(data);
    });
}

function Input() {
  const [name, setIsName] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isDBCalled, setIsDBCalled] = useState(false);
  const [data, setData] = useState({});
  const [dbResp, setDbResp] = useState({});
  const [yesOrNoCalled, setYes] = useState(false);
  var temp;
  return (
    <div>
      <h2 style={{ textAlign: "center", paddingTop: "200px" }}>
        Which band/artist do you want to look up
      </h2>
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          onChange={event => {
            temp = (" " + event.target.value).slice(1);
          }}
        />
        <button
          onClick={event => {
            setYes(false);
            setIsName(temp);
            setIsClicked(true);
            setIsDBCalled(true);
            testOneHit(temp, setData).then(response => {
              setData(response);
            });
          }}
        >
          Enter
        </button>
        <div id="oneHitResults"></div>
        {isClicked && (
          <div id="DB_CALL">
            <p>Should {name} count as a "one hit wonder"?</p>
            {isDBCalled && (
              <div id="DB_BUTTONS">
                <button
                  id="DB_YES"
                  onClick={event => {
                    setIsDBCalled(false);
                    callDB("y", data, setDbResp, setYes);
                    console.log(dbResp.band);
                  }}
                >
                  YES
                </button>
                <button
                  id="DB_NO"
                  onClick={event => {
                    setIsDBCalled(false);
                    callDB("n", data, setDbResp, setYes);
                  }}
                >
                  NO
                </button>
              </div>
            )}
            {yesOrNoCalled && (
              <div id="DB_RESULT">
                <p>
                  {dbResp.band} is a "One Hit Wonder" accourding to{" "}
                  {dbResp.score[0]} in {dbResp.score[0] + dbResp.score[1]}{" "}
                  people
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function App({ login }) {
  return (
    <div>
      <Header />
      <Input />
    </div>
  );
}

export default App;
