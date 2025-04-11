import { db, analytics } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { v4 as uuidv4 } from "uuid";

let sessionId = sessionStorage.getItem("sessionId");
if (!sessionId) {
  sessionId = uuidv4();
  sessionStorage.setItem("sessionId", sessionId);
}

export async function trackVisit() {
  try {
    const data = {
      sessionId: sessionId,
      timestamp: new Date(),
    };

    await addDoc(collection(db, "visits"), data);

    // Also log to Google Analytics
    logEvent(analytics, "page_visit", {
      session_id: sessionId,
      timestamp: Date.now(),
    });

    console.log("Page visit recorded with sessionId:", sessionId);
  } catch (error) {
    console.error("Error tracking visit:", error);
  }
}

export async function trackClick(buttonName) {
  try {
    const data = {
      sessionId: sessionId,
      timestamp: new Date(),
      button: buttonName,
    };

    await addDoc(collection(db, "clicks"), data);

    // Also log to Google Analytics
    logEvent(analytics, "button_click", {
      session_id: sessionId,
      button_name: buttonName,
      timestamp: Date.now(),
    });

    console.log(`Click recorded for ${buttonName} with sessionId: ${sessionId}`);
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}
