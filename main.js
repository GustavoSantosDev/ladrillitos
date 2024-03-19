import "./style.css";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <canvas></canvas>
`;

setupCounter(document.querySelector("#counter"));
