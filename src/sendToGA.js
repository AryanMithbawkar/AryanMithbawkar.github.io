// sendToGA.js
import { GA_MEASUREMENT_ID, GA_API_SECRET } from "./analyticsConfig.js";

export async function sendToGA(eventName, params = {}, clientId) {
  try {
    const payload = {
      client_id: clientId, // sessionId is fine for simple client_id
      events: [
        {
          name: eventName,
          params: params,
        },
      ],
    };

    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Failed to send GA event:", await res.text());
    }
  } catch (err) {
    console.error("Error sending event to GA4:", err);
  }
}
