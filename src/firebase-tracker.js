import { db, collection, addDoc, analytics, logEvent } from "./firebase.js";
import { v4 as uuidv4 } from "uuid";

// Generate or retrieve session ID
let sessionId = sessionStorage.getItem("sessionId");
if (!sessionId) {
  sessionId = uuidv4();
  sessionStorage.setItem("sessionId", sessionId);
}

// Track page visit
export async function trackVisit() {
  try {
    await addDoc(collection(db, "visits"), {
      sessionId: sessionId,
      timestamp: new Date(),
    });

    // ✅ Also send to GA
    logEvent(analytics, "page_visit", {
      session_id: sessionId,
      timestamp: Date.now(),
    });

    console.log("Page visit recorded with sessionId:", sessionId);
  } catch (error) {
    console.error("Error tracking visit:", error);
  }
}

// Track button clicks
export async function trackClick(buttonName) {
  try {
    await addDoc(collection(db, "clicks"), {
      sessionId: sessionId,
      timestamp: new Date(),
      button: buttonName,
    });

    // ✅ Also send to GA
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
