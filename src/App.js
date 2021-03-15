import "./App.css";
import React, { useState, useEffect } from "react";
import { getBindingIdentifiers } from "@babel/types";

//TODO
//1) Add picture
//2) Fix Errors
//3) UI
//4) Add other APIs?
//5) FUCK IT WE'RE DOING IT LIVE

function Header() {
  return (
    <header>
      <h1 style={{ textAlign: "center" }}>Which Picture is Better</h1>
    </header>
  );
}

function getPic() {
  let data;
  return fetch("/apod/")
    .then(response => response.text())
    .then(result => {
      data = JSON.parse(result); //ADD A FOR WHEN THERE IS A ERROR (i.e. Garth Brooks)
      console.log(data);
      return data;
      // Now that `data` has been defined, we can do something with it
    })
    .catch(error => console.log("error", error));
}

function Input() {
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  return (
    <div>
      <img
        id="pic"
        src={img1["apod"]}
        width="400"
        height="400"
        onLoad={event => {
          console.log("TEST");
          getPic().then(response => {
            setImg1(response);
          });
          getPic().then(response => {
            setImg2(response);
          });
        }}
        onClick={event => {
          getPic().then(response => {
            setImg1(response);
          });
          getPic().then(response => {
            setImg2(response);
          });
        }}
      ></img>
      <img
        id="pic"
        src={img2["apod"]}
        width="400"
        height="400"
        onClick={event => {
          getPic().then(response => {
            setImg1(response);
          });
          getPic().then(response => {
            setImg2(response);
          });
        }}
      ></img>
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
