import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Tanswers = () => {
  const [totalAnswers, setTotalAnswers] = useState(0);
  const token = localStorage.getItem("access-token");

  const fetchTotalAnswers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/total_answers/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalAnswers(response.data.total_answers || 0);
    } catch (error) {
      console.error("Error fetching total answers:", error);
    }
  };

  useEffect(() => {
    fetchTotalAnswers();
  }, []);

  return (
    <div>
      <h3> {totalAnswers}</h3>
    </div>
  );
};

export default Tanswers;
