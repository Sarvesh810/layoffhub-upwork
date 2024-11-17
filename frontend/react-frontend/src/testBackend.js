// src/TestBackend.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";

function TestBackend() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    console.log("Starting backend request...");
    axios
      .get(`${API_BASE_URL}/api/test/`)
      .then((response) => {
        console.log("Backend response:", response);
        setStatus(
          `Backend is reachable: ${response.data.status}.\nURL: ${API_BASE_URL}`
        );
        console.log(`URL: ${API_BASE_URL}`);
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
        setStatus(`Backend is not reachable.\nURL: ${API_BASE_URL}`);
        console.log(`URL: ${API_BASE_URL}`);
      });
  }, []);

  return (
    <div>
      <h2>Backend Connection Test</h2>
      <p>{status}</p>
    </div>
  );
}

export default TestBackend;
