const c = document.querySelector(".c");
const cSharp = document.querySelector(".c-sharp");
const d = document.querySelector(".d");
const dSharp = document.querySelector(".d-sharp");
const e = document.querySelector(".e");
const f = document.querySelector(".f");
const fSharp = document.querySelector(".f-sharp");
const g = document.querySelector(".g");
const gSharp = document.querySelector(".g-sharp");
const a = document.querySelector(".a");
const aSharp = document.querySelector(".a-sharp");
const b = document.querySelector(".b");
const c2 = document.querySelector(".c-2");

const keyDiv = document.querySelector(".keys");

const firstKeyValue = document.querySelector("#firstKeyValue");
const secondKeyValue = document.querySelector("#secondKeyValue");

const interval = document.querySelector("#interval");
const clear = document.querySelector(".clear");
const joke = document.querySelector(".joke");
const realJoke = document.querySelector(".real-joke");
const facepalmBox = document.querySelector(".facepalm-box");
const jokeBox = document.querySelector(".joke-box");
const allKeys = document.querySelectorAll(".key");

let firstKeyName = "";
let counter = 0;

const changeNotenamesOnPage = {
  //change of name needed because it's not possible to name audio file i.e "C#".
  c: "C",
  "c-sharp": "C#",
  d: "D",
  "d-sharp": "D#",
  e: "E",
  f: "F",
  "f-sharp": "F#",
  g: "G",
  "g-sharp": "G#",
  a: "A",
  "a-sharp": "A#",
  b: "B",
  "c-2": "C2",
};

//Calculating Interval and giving it the name

function checkResult(first, second) {
  const dict = {
    C: 1,
    "C#": 2,
    D: 3,
    "D#": 4,
    E: 5,
    F: 6,
    "F#": 7,
    G: 8,
    "G#": 9,
    A: 10,
    "A#": 11,
    B: 12,
    C2: 13,
  };
  first = dict[first];
  second = dict[second];

  const intervalNames = {
    1: "Minor Second",
    2: "Major Second",
    3: "Minor Third",
    4: "Major Third",
    5: "Perfect Fourth",
    6: "Tritone",
    7: "Perfect Fifth",
    8: "Minor Sixth",
    9: "Major Sixth",
    10: "Minor Seventh",
    11: "Major Seventh",
    12: "Perfect Octave",
  };

  if (first === second) {
    return (interval.innerHTML = "Perfect Unison");
  }

  if (first > second) {
    let result = first - second;
    let resultString = intervalNames[result];
    return (interval.innerHTML = resultString);
  } else {
    let result = second - first;
    let resultString = intervalNames[result];
    return (interval.innerHTML = resultString);
  }
}

//First Key Clicked:

function firstKeyAudioText(firstKeyName) {
  let audio = new Audio("../Assets/" + firstKeyName + ".mp3");

  interval.innerHTML = "";
  secondKeyValue.innerHTML = "";
  firstKeyValue.innerHTML = changeNotenamesOnPage[firstKeyName];

  counter++;
  audio.play();
}

//Second Key Clicked:

function secondKeyAudioText(secondKeyName) {
  let audio = new Audio("../Assets/" + secondKeyName + ".mp3");

  secondKeyValue.innerHTML = changeNotenamesOnPage[secondKeyName];
  counter++;
  audio.play();

  checkResult(firstKeyValue.innerHTML, secondKeyValue.innerHTML);

  counter = 0;
}

// CLEAR Button

function clearMe() {
  firstKeyValue.innerHTML = "";
  secondKeyValue.innerHTML = "";
  interval.innerHTML = "";

  counter = 0;
}

//getJoke function

function getJoke() {
  firstKeyValue.innerHTML = "I";
  secondKeyValue.innerHTML = "am";
  interval.innerHTML = "a joke";

  setTimeout(() => {
    facepalmBox.innerHTML = "&#129318;";
  }, 2000);

  setTimeout(() => {
    facepalmBox.innerHTML = "";
    firstKeyValue.innerHTML = "";
    secondKeyValue.innerHTML = "";
    interval.innerHTML = "";
  }, 3700);
}

//Hide element function

function hideOnClick(variableName) {
  if (variableName.style.visibility === "visible") {
    variableName.style.visibility = "hidden";
  }
}

//Real Joke Box - Getting and Deleting on click

async function getRealJoke() {
  const response = await fetch("https://api.chucknorris.io/jokes/random");
  const data = response.json();
  const { value } = await data;

  jokeBox.innerHTML = value;
  howManyMiliSecJokeboxVisible(6000);
}

function howManyMiliSecJokeboxVisible(howManyMiliSec) {
  jokeBox.style.visibility = "visible";
  setTimeout(() => {
    jokeBox.style.visibility = "hidden";
  }, howManyMiliSec);
}

//Event Listeners

clear.addEventListener("click", () => {
  clearMe();
});

joke.addEventListener("click", () => {
  getJoke();
});

realJoke.addEventListener("click", () => {
  getRealJoke();
});

jokeBox.addEventListener("click", () => {
  hideOnClick(jokeBox);
});

for (let key of allKeys) {
  key.addEventListener("click", (e) => {
    const thisKeyName = e.target.classList[0]; // first class of each key is the same as key name
    if (counter === 0) {
      firstKeyAudioText(thisKeyName);
    } else {
      secondKeyAudioText(thisKeyName);
    }
  });
}
