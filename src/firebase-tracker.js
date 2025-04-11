const MEASUREMENT_ID = "G-EEFVNJD2GC"; // Replace with your Measurement ID
const API_SECRET = "yThycJ0mSMKoZ2WcwfMMgQ"; // Replace with your API Secret
const GA_ENDPOINT = `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;

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
      sessionId,
      timestamp: new Date(),
    });

    // Send to GA
    await sendToGA("page_visit", { session_id: sessionId });

    console.log("Page visit recorded with sessionId:", sessionId);
  } catch (error) {
    console.error("Error tracking visit:", error);
  }
}

// Track button clicks
export async function trackClick(buttonName) {
  try {
    await addDoc(collection(db, "clicks"), {
      sessionId,
      timestamp: new Date(),
      button: buttonName,
    });

    // Send to GA
    await sendToGA("button_click", { session_id: sessionId, button: buttonName });

    console.log(`Click recorded for ${buttonName} with sessionId: ${sessionId}`);
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}

// Send event to GA
async function sendToGA(eventName, params = {}) {
  try {
    await fetch(GA_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        client_id: sessionId, // Can use sessionId or other unique identifier
        events: [
          {
            name: eventName,
            params,
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to send event to Google Analytics:", error);
  }
}
