// backend/routes/calendarRoutes.js
const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const fs = require("fs").promises;
const path = require("path");

// Debug logs
console.log("Calendar routes initialized");

// Add these constants
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TOKEN_PATH = path.join(__dirname, "..", "token.json");
const CREDENTIALS_PATH = path.join(__dirname, "..", "credentials.json");

// Debug function to check credentials
const checkCredentials = async () => {
  try {
    const content = await fs.readFile(CREDENTIALS_PATH);
    console.log("Credentials file found");
    return true;
  } catch (err) {
    console.error("Error reading credentials:", err);
    return false;
  }
};

// Initialize OAuth2 client
const getAuth = async () => {
  try {
    console.log("Getting auth...");
    const content = await fs.readFile(CREDENTIALS_PATH);
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } =
      credentials.installed || credentials.web;

    console.log("Creating OAuth2 client...");
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check for existing token
    try {
      console.log("Checking for existing token...");
      const token = await fs.readFile(TOKEN_PATH);
      oAuth2Client.setCredentials(JSON.parse(token));
      return oAuth2Client;
    } catch (err) {
      console.log("No token found:", err.message);
      return null;
    }
  } catch (err) {
    console.error("Error in getAuth:", err);
    throw err;
  }
};

// Auth URL endpoint
router.get("/auth-url", async (req, res) => {
  try {
    const hasCredentials = await checkCredentials();
    if (!hasCredentials) {
      return res.status(500).json({ error: "Credentials not found" });
    }

    const content = await fs.readFile(CREDENTIALS_PATH);
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } =
      credentials.installed || credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    res.json({ authUrl });
  } catch (err) {
    console.error("Error generating auth URL:", err);
    res.status(500).json({ error: "Failed to generate auth URL" });
  }
});

// OAuth callback endpoint
router.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;
  try {
    console.log("Received OAuth callback");
    const content = await fs.readFile(CREDENTIALS_PATH);
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } =
      credentials.installed || credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    const { tokens } = await oAuth2Client.getToken(code);
    await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
    res.redirect("/workoutLog"); // Adjust this to your frontend route
  } catch (err) {
    console.error("Error in OAuth callback:", err);
    res.status(500).json({ error: "Failed to get token" });
  }
});

// Create calendar event endpoint
router.post("/events", async (req, res) => {
  try {
    console.log("Received event creation request:", req.body);

    const auth = await getAuth();
    if (!auth) {
      console.log("No auth found, returning 401");
      return res.status(401).json({ error: "Authentication required" });
    }

    const calendar = google.calendar({ version: "v3", auth });
    console.log("Creating calendar event...");

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: req.body,
    });

    console.log("Event created successfully");
    res.json(response.data);
  } catch (err) {
    console.error("Error creating calendar event:", err);
    res.status(500).json({
      error: "Failed to create event",
      details: err.message,
    });
  }
});

module.exports = router;
