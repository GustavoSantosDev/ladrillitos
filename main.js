import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <canvas></canvas>
  <script src="script/index.js"></script>
`;

setupCounter(document.querySelector("#counter"));
