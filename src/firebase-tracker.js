import { db, collection, addDoc } from "./firebase.js";
import { v4 as uuidv4 } from "uuid";
import { sendToGA } from "./sendToGA.js"; // NEW LINE

let sessionId = sessionStorage.getItem("sessionId");
if (!sessionId) {
  sessionId = uuidv4();
  sessionStorage.setItem("sessionId", sessionId);
}

export async function trackVisit() {
  try {
    const visitData = {
      sessionId: sessionId,
      timestamp: new Date(),
    };

    await addDoc(collection(db, "visits"), visitData);
    console.log("Page visit recorded with sessionId:", sessionId);

    // Also send to Google Analytics
    await sendToGA("page_visit", {}, sessionId);
  } catch (error) {
    console.error("Error tracking visit:", error);
  }
}

export async function trackClick(buttonName) {
  try {
    const clickData = {
      sessionId: sessionId,
      timestamp: new Date(),
      button: buttonName,
    };

    await addDoc(collection(db, "clicks"), clickData);
    console.log(`Click recorded for ${buttonName} with sessionId: ${sessionId}`);

    // Also send to Google Analytics
    await sendToGA("button_click", { button_name: buttonName }, sessionId);
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}
