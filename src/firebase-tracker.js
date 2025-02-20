import { db, collection, addDoc } from "./firebase.js";
import { v4 as uuidv4 } from "uuid"; // Generate unique IDs

// Generate or retrieve session ID
let sessionId = sessionStorage.getItem("sessionId");
if (!sessionId) {
  sessionId = uuidv4(); // Generate new session ID
  sessionStorage.setItem("sessionId", sessionId);
}

// Track page visit
export async function trackVisit() {
  try {
    await addDoc(collection(db, "visits"), {
      sessionId: sessionId,
      timestamp: new Date(),
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
    console.log(`Click recorded for ${buttonName} with sessionId: ${sessionId}`);
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}
