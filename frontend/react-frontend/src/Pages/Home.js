import React, { useEffect, useState, Suspense, lazy } from "react";
import HomeSlid from "../Components/HomeSlid";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import Companies from "./Companies";
import { ContantHolder } from "./StyledCompanies";
import { API_BASE_URL } from "../config";
import { usertags, adjectives, nouns } from "../Constants/constants";
import {
  MainContainer,
  AskQuestionModal1,
  AskQuestionModal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  CloseButton,
  SubmitButton,
} from "./StyledCompaniesProfile";
import "./Home.css";
import "../index.css";

const Popular = lazy(() => import("../Components/Popular"));
const Answer = lazy(() => import("../Components/Answer"));

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [caption1, setCaption] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [companyid, setCompanyid] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [companyName, setCompanyName] = useState([]);

  const handleStartDiscussionClick = () => {
    setShowModal(true);
  };

  const ask_a_question = async () => {
    const randomUsername = localStorage.getItem("random-username");

    const payload = {
      title,
      caption: caption1,
      is_anonymous: anonymous,
      company_ids: companyid ? [companyid] : [],
      tag_names: selectedTags,
      dateposted: new Date().toISOString(),
      author: "AuthorName",
      randomUsername: randomUsername,
    };

    const config = {
      headers: {},
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/ask_a_question/`, payload, config);
      alert("Question submitted successfully!");
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error(
        "Error submitting question:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to submit question.");
    }
  };

  const handleSubmit = () => {
    ask_a_question();
  };

  const handleSelect = (event) => {
    const selectedTag = event.target.value;
    if (selectedTag && !selectedTags.includes(selectedTag)) {
      setSelectedTags([...selectedTags, selectedTag]);
    }
  };

  const handleRemove = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleCompanyChange = (e) => {
    setCompanyid(e.target.value);
  };

  const token = localStorage.getItem("access-token");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeComponent, setActiveComponent] = useState("Popular");

  const generateRandomUsername = () => {
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${randomAdjective}${randomNoun}${randomNumber}`;
  };

  useEffect(() => {
    let randomUsername = localStorage.getItem("random-username");

    if (!randomUsername) {
      randomUsername = generateRandomUsername();
      localStorage.setItem("random-username", randomUsername);
      console.log("Generated new random username:", randomUsername);
    } else {
      console.log("Existing random username found:", randomUsername);
    }
  }, []);

  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/companies`);
        setCompanyName(response.data);
      } catch (error) {
        console.error("Error fetching company names:", error);
      }
    };
    fetchCompanyName();
  }, []);

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length >= 3) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/search_bar/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { qury: query },
        });
        setSearchResults(response.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else if (query.length < 3) {
      setSearchResults([]);
    } else {
      setSearchResults(null);
    }
  };

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-stretch">
              {/* Trending Discussions section */}
              <div className="trending-discussions w-100">
                <div className="mx-3 mx-md-5 px-md-5 pt-3 pt-md-5 d-flex justify-content-between align-items-center">
                  <h2 className="title" style={{ marginRight: "auto" }}>
                    Trending Discussions
                  </h2>
                  <button
                    className="btn"
                    style={{
                      width: "200px",
                      height: "40px",
                      backgroundColor: "#333333",
                      color: "white",
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
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = "#333333";
                      e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#333333";
                      e.target.style.color = "white";
                      e.target.style.boxShadow = "none";
                    }}
                    onClick={handleStartDiscussionClick}
                  >
                    Start Discussion
                  </button>
                </div>

                <div className="olll">
                  <ContantHolder>
                    <HomeSlid />
                  </ContantHolder>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Starting a Discussion */}
      {showModal && (
        <AskQuestionModal1>
          <AskQuestionModal>
            <ModalHeader>
              <CloseButton onClick={() => setShowModal(false)}>X</CloseButton>
              <h2>Start a Discussion</h2>
            </ModalHeader>
            <ModalContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="row">
                  <div className="pt-4">
                    <div className="content-box pt-4 mb-5">
                      <div className="">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="anonymousCheck"
                            checked={anonymous}
                            onChange={() => setAnonymous(!anonymous)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="anonymousCheck"
                          >
                            Post anonymously
                          </label>
                        </div>
                      </div>
                      <div className="pt-4">
                        <div className="pb-3">
                          <label className="fw-bold ">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="">
                        <label className="fw-bold ">Company Name</label>
                        <select
                          className="form-control"
                          value={companyid}
                          onChange={handleCompanyChange}
                        >
                          <option value="" hidden>
                            Select a company...
                          </option>
                          {companyName.length > 0 ? (
                            companyName.map((company, index) => (
                              <option key={index} value={company.id}>
                                {company.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>Loading...</option>
                          )}
                        </select>
                      </div>
                      <div className="pt-2">
                        <div className="">
                          <label className="fw-bold ">Tags</label>
                          <select
                            className="form-control"
                            onChange={handleSelect}
                          >
                            <option value="" hidden>
                              Select tags...
                            </option>
                            {usertags.map((tag, index) => (
                              <option key={index} value={tag}>
                                {tag}
                              </option>
                            ))}
                          </select>
                          <div className="selected-tags mt-2">
                            {selectedTags.map((tag, index) => (
                              <span
                                key={index}
                                className="badge bg-secondary me-2"
                              >
                                {tag}
                                <button
                                  type="button"
                                  className="btn-close btn-close-white ms-2"
                                  aria-label="Remove"
                                  onClick={() => handleRemove(tag)}
                                />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <div className="pb-3">
                          <textarea
                            className="form-control"
                            rows="4"
                            value={caption1}
                            onChange={(e) => setCaption(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <ModalFooter>
                <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
              </ModalFooter>
            </ModalContent>
          </AskQuestionModal>
        </AskQuestionModal1>
      )}

      <Footer />
    </>
  );
};

export default Home;
