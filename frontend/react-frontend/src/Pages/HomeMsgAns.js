import React, { useEffect, useState, Suspense, lazy } from "react";
import { MdGroups } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import Homeslide21 from "../Components/Homeslid21";
import axios from "axios";
import Sidebar2 from "../Components/Sidebar2";
import { API_BASE_URL } from "../config";

const Popular = lazy(() => import("../Components/Popular"));
const Answer = lazy(() => import("../Components/Answer"));

const HomeMsgAns = () => {
  const [activeComponent, setActiveComponent] = useState("Popular");
  const [trendTags, setTrendTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem("access-token");

  const fetchTrendTags = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/trending_tags/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrendTags(response.data || []);
    } catch (error) {
      console.error("Error fetching trending tags:", error);
    }
  };

  useEffect(() => {
    fetchTrendTags();
  }, [token]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/search_bar/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { query }, // Pass the query parameter to the API
      });
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      // Trigger search only if query length is greater than 2
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
    }
  };

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <Navbar />
      <div className="mx-5">
        <div className="row">
          <div className="col-12 col-md-9 pt-4">
            <div className="homeimg text-white pb-3">
              <div className="text-center container pt-5">
                <h4>Share & grow the world's knowledge!</h4>
                <p className="container">
                  We want to connect the people who have knowledge to the people
                  who need it, to bring together people with different
                  perspectives so they can understand each other better, and to
                  empower everyone to share their knowledge.
                </p>
                <input
                  className="inp1"
                  type="search"
                  placeholder="Type Search Words..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="search-results">
                  {searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((result, index) => (
                        <li key={index}>
                          {typeof result === "string" ? result : result.name}
                        </li>
                      ))}
                    </ul>
                  ) : searchQuery.length > 0 ? (
                    <p>No results found</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className=" div1 mb-5">
              <div>
                <Homeslide21 />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3 pt-4">
            <Sidebar2 />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomeMsgAns;
