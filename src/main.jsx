import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { trackVisit, trackClick } from "./firebase-tracker.js";

trackVisit();

// Function to track all button clicks dynamically
const trackButtons = () => {
  document.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      trackClick(event.target.innerText); // Log button click
    }
  });
};

// Ensure tracking starts after DOM is fully loaded
document.addEventListener("DOMContentLoaded", trackButtons);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
