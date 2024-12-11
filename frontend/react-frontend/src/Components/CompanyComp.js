import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomeSlid.css";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { LiaComments } from "react-icons/lia";
import { FaEye } from "react-icons/fa";
import AnswersGiven from "./AnswersGiven";
import GiveAnswer from "./GiveAnswer";
import Loader from "./Loader";
import { API_BASE_URL } from "../config";
import { ThreadCompanyPic } from "../Pages/StyledCompanyCard";

const CompanyComp = ({ companyId, activesort, showModal }) => {
  const [pollStates, setPollStates] = useState([]);
  const [pollStates1, setPollStates1] = useState([]);
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(7);
  const [loading, setLoading] = useState(true);
  const [sortLoading, setSortLoading] = useState(false);
  const token = localStorage.getItem("access-token");
  const [msg, setMsg] = useState("");

  const getQuestions = async () => {
    const url = `${API_BASE_URL}/api/asked_questions/`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filteredData = response.data.filter((item) =>
        item.companies.some((company) => company.id === companyId)
      );
      if (activesort === "new") {
        const fetchedQuestions = filteredData;
        const sortedQuestions = fetchedQuestions.reverse();
        setData(sortedQuestions);
      } else if (activesort === "trending") {
        const sortedQuestions = filteredData.sort((a, b) => b.votes - a.votes);
        console.log(sortedQuestions);

        setData(filteredData || []);
      } else {
        const sortedQuestions = filteredData.sort(
          (a, b) => b.view_count - a.view_count
        );
        console.log(sortedQuestions);
        setData(filteredData || []);
      }

      setPollStates(new Array(filteredData.length).fill(false));
      setPollStates1(new Array(filteredData.length).fill(false));
    } catch (error) {
      console.error("Error fetching content data:", error);
    } finally {
      setLoading(false);
      setSortLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [companyId, activesort, showModal]);

  const toggleDropdown = (index) => {
    setPollStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const toggleDropdown1 = (index) => {
    setPollStates1((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const loadMoreQuestions = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleTagClick = (tagName) => {
    console.log(`Tag clicked: ${tagName}`);
  };
  const upvoteQuestion = async (questionId, index) => {
    if (!token) {
      alert("Please log in to upvote");
      return;
    }

    const url = `${API_BASE_URL}/api/upvote_question/${questionId}/`;

    try {
      await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, votes: item.votes + 1 } : item
        )
      );
    } catch (error) {
      console.error("Error upvoting question:", error);
      alert("You can't upvote again");
    }
  };

  const downvoteQuestion = async (questionId, index) => {
    if (!token) {
      alert("Please log in to downvote");
      return;
    }

    const url = `${API_BASE_URL}/api/downvote_question/${questionId}/`;

    try {
      await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, votes: item.votes - 1 } : item
        )
      );
    } catch (error) {
      console.error("Error downvoting question:", error);
      alert("You can't downvote again");
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="pb-5">
      {loading ? (
        <Loader />
      ) : (
        <div className="row d-flex flex-column">
          {data.slice(0, visibleCount).map((item, index) => (
            <div className="col-12 mt-3" key={item.id}>
              <div className="card pb-3">
                <div className="card-body">
                  {/* Header Section */}
                  <div className="d-flex justify-content-between align-items-center mb-3 mt-3 position-relative">
                    {/* First Column - Author Info */}
                    <div
                      className="px-2 position-relative"
                      style={{
                        flexBasis: "30%",
                        borderRight: "1px solid #dee2e6",
                      }}
                    >
                      <div className="d-inline-flex flex-row align-items-center">
                        <img
                          src={
                            item.author_picture
                              ? require(`../Images/${item.author_picture}`)
                              : require("../Images/default-profile.jpg")
                          }
                          alt="User"
                          className="rounded-circle me-3 profile-picture"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            border: "1px solid #dee2e6",
                            borderRadius: "50%",
                          }}
                        />
                        <div>
                          <p
                            className="mb-0"
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                          >
                            {item.author_username || "Anonymous"}
                          </p>
                          <p
                            className="text-muted mb-0"
                            style={{ fontSize: "12px" }}
                          >
                            Posted: {formatTime(item.date_posted)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Second Column - Company Info */}
                    <div
                      className="px-2 position-relative"
                      style={{
                        flexBasis: "40%",
                        borderRight: "1px solid #dee2e6",
                        margin: "0 20px 0 15px", // Added explicit left padding
                      }}
                    >
                      {item.companies && item.companies.length > 0 && (
                        <div className="row">
                          <ThreadCompanyPic
                            src={item.companies[0].picture}
                            alt={item.companies[0].name}
                          />
                          <div className="col-12">
                            {/* Company Names */}
                            <span
                              style={{
                                fontSize: "medium",
                                fontWeight: "bold",
                                display: "block",
                              }}
                            >
                              {" "}
                              {/* Display block ensures proper spacing */}
                              {item.companies
                                .map((company) => company.name)
                                .join(", ")}
                            </span>
                            <div>
                              {/* Company Sectors */}
                              <span
                                style={{
                                  fontSize: "medium",
                                  display: "block",
                                  marginTop: "5px",
                                }}
                              >
                                {" "}
                                {/* Adjust spacing */}
                                {item.companies
                                  .map((company) => company.sector)
                                  .join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Third Column - Tags */}
                    <div
                      className="px-2"
                      style={{
                        flexBasis: "30%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item.tags &&
                        item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="badge me-2 mb-1"
                            style={{
                              fontSize: "12px",
                              backgroundColor: "transparent",
                              color: "black",
                              border: "1px solid #dee2e6",
                            }}
                          >
                            {tag.name}
                          </span>
                        ))}
                    </div>
                  </div>

                  <hr
                    style={{
                      borderTop: "1px solid #adb5bd",
                      margin: "0",
                      width: "100%",
                    }}
                  />

                  {/* Discussion Details */}
                  <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                    <div>
                      <h5>{item.title}</h5>
                      <p className="text-muted">{item.caption}</p>
                    </div>
                  </div>

                  <hr
                    style={{
                      borderTop: "1px solid #adb5bd",
                      margin: "0",
                      width: "100%",
                    }}
                  />

                  {/* Actions Section */}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="d-flex align-items-center">
                      <div
                        className="d-flex align-items-center ms-3"
                        style={{ whiteSpace: "nowrap", gap: "5px" }}
                      >
                        <FaEye size={20} className="me-1" />
                        <span
                          className="text-muted"
                          style={{ fontSize: "14px" }}
                        >
                          {item.view_count || 0} Views
                        </span>
                      </div>

                      <button
                        className="btn btn-link text-muted me-3" // Adds space between "Comments" and "Views"
                        onClick={() => toggleDropdown(index)}
                      >
                        <LiaComments size={20} /> Comments
                      </button>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <div className="d-inline-flex flex-row align-items-center">
                        <button
                          className="btn border-0"
                          onClick={() => upvoteQuestion(item.id, index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4A4A4A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </button>
                        <span>{item.votes}</span>
                        <button
                          className="btn border-0"
                          onClick={() => downvoteQuestion(item.id, index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4A4A4A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                      </div>

                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "transparent",
                          color: "gray", // Set text color to gray
                          border: "1px solid gray", // Optional: Add a gray border for visibility
                        }}
                        onClick={() => toggleDropdown1(index)}
                      >
                        Comment
                      </button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {pollStates[index] && <AnswersGiven questionId={item.id} />}

                  {/* Add Comment Section */}
                  {pollStates1[index] && <GiveAnswer questionId={item.id} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyComp;
