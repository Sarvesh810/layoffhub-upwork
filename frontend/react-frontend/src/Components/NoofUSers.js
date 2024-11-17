import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const NoofUSers = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const token = localStorage.getItem("access-token");

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user-count/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalUsers(response.data.total_users || 0);
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  return (
    <div>
      <h3>{totalUsers}</h3>
    </div>
  );
};

export default NoofUSers;
