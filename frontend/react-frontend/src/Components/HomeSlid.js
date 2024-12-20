import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomeSlid.css";
import { FaEye } from "react-icons/fa";
import { LiaComments } from "react-icons/lia";
import AnswersGiven from "./AnswersGiven";
import GiveAnswer from "./GiveAnswer";
import Loader from "./Loader";
import { ThreadCompanyPic } from "../Pages/StyledCompanyCard";
import { API_BASE_URL } from "../config";

const HomeSlid = () => {
  const [pollStates, setPollStates] = useState([]);
  const [pollStates1, setPollStates1] = useState([]);
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(7);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access-token");
  const randomUsername = localStorage.getItem("random-username");

  const getQuestions = async () => {
    const url = `${API_BASE_URL}/api/asked_questions/`;
    try {
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const sortedQuestions = response.data.sort(
          (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
        );
        setData(sortedQuestions);
        setPollStates(new Array(sortedQuestions.length).fill(false));
        setPollStates1(new Array(sortedQuestions.length).fill(false));
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching content data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

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
                                margin: "8px",
                              }}
                            >
                              {" "}
                              {/* Display block ensures proper spacing */}
                              {item.companies
                                .map((company) => company.name)
                                .join(", ")}
                            </span>
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
                  <div
                    className="mt-2"
                    style={{
                      display: "inline-flex", // Use inline-flex to keep all children in the same line
                      justifyContent: "space-between", // Distribute space between child divs
                      alignItems: "center", // Align items vertically
                      width: "100%", // Ensure the container spans the full width
                      whiteSpace: "nowrap", // Prevent wrapping of content
                    }}
                  >
                    {/* Views and Comments Section */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        marginRight: "20px", // Space between this and the next section
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                          gap: "5px",
                        }}
                      >
                        <span className="views-icon">
                          <FaEye size={16} className="me-1" />
                        </span>
                        <span>{item.view_count || 0} Views</span>
                      </div>

                      <button
                        className="btn btn-link text-muted d-flex align-items-center"
                        style={{
                          marginLeft: "10px",
                        }}
                        onClick={() => toggleDropdown(index)}
                      >
                        <LiaComments size={16} />
                        <span className="comments-text ms-1">Comments</span>
                      </button>
                    </div>

                    {/* Upvotes and Comment Button Section */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px", // Space between upvote/downvote and Comment button
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px", // Space between upvote and downvote
                        }}
                      >
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

          {/* Load More Button */}
          {visibleCount < data.length && (
            <div className="col-12 mt-3">
              <button
                className="btn w-100"
                style={{
                  width: "190px",
                  height: "50px",
                  backgroundColor: "white",
                  color: "#333333",
                  border: "1px solid #333333",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "500",
                  letterSpacing: "1px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#333333";
                  e.target.style.color = "white";
                  e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "#333333";
                  e.target.style.boxShadow = "none";
                }}
                onClick={loadMoreQuestions}
              >
                Load More Questions
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeSlid;
