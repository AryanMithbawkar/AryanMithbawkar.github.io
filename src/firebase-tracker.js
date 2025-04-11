import { db, collection, addDoc } from "./firebase.js";
import { v4 as uuidv4 } from "uuid";

const MEASUREMENT_ID = "G-EEFVNJD2GC"; // Replace with your Measurement ID
const API_SECRET = "Beq0nJHZTRKcr9I0Ip9TdA"; // Replace with your API Secret
const GA_ENDPOINT = `https://www.google-analytics.com/debug/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;

// Generate or retrieve session ID
let sessionId = sessionStorage.getItem("sessionId");
if (!sessionId) {
  sessionId = uuidv4();
  sessionStorage.setItem("sessionId", sessionId);
}

// Track page visit
export async function trackVisit() {
  const timestamp = new Date();
  try {
    // Store in Firestore
    await addDoc(collection(db, "visits"), {
      sessionId,
      timestamp,
    });

    // Send to Google Analytics
    await sendToGA("page_visit", {
      session_id: sessionId,
      timestamp: timestamp.toISOString(),
    });

    console.log("Page visit recorded with sessionId:", sessionId);
  } catch (error) {
    console.error("Error tracking visit:", error);
  }
}

// Track button clicks
export async function trackClick(buttonName) {
  const timestamp = new Date();
  try {
    // Store in Firestore
    await addDoc(collection(db, "clicks"), {
      sessionId,
      timestamp,
      button: buttonName,
    });

    // Send to Google Analytics
    await sendToGA("button_click", {
      session_id: sessionId,
      button: buttonName,
      timestamp: timestamp.toISOString(),
    });

    console.log(`Click recorded for ${buttonName} with sessionId: ${sessionId}`);
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}

// Send event to Google Analytics
async function sendToGA(eventName, params = {}) {
  const body = {
    client_id: sessionId, // unique user/session identifier
    events: [
      {
        name: eventName,
        params,
      },
    ],
  };

  try {
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("GA response not OK:", response.status, text);
    }

  } catch (error) {
    console.error("Failed to send event to Google Analytics:", error);
  }
}
