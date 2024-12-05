import React, { useEffect, useState, Suspense, lazy } from "react";
import HomeSlid from "../Components/HomeSlid";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import Companies from "./Companies";
import { ContantHolder } from "./StyledCompanies";
import { API_BASE_URL } from "../config";
import "./Home.css";

const Popular = lazy(() => import("../Components/Popular"));
const Answer = lazy(() => import("../Components/Answer"));

const Home = () => {
  const token = localStorage.getItem("access-token");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeComponent, setActiveComponent] = useState("Popular");

  const generateRandomUsername = () => {
    const adjectives = [
      "Agile",
      "Ancient",
      "Brave",
      "Bright",
      "Bold",
      "Calm",
      "Clever",
      "Cosmic",
      "Creative",
      "Crimson",
      "Crystal",
      "Curious",
      "Daring",
      "Deep",
      "Divine",
      "Dynamic",
      "Eager",
      "Electric",
      "Elegant",
      "Emerald",
      "Epic",
      "Eternal",
      "Fierce",
      "Flaming",
      "Flying",
      "Frozen",
      "Gentle",
      "Glowing",
      "Golden",
      "Grand",
      "Happy",
      "Harmony",
      "Hidden",
      "Honest",
      "Humble",
      "Infinite",
      "Jade",
      "Jolly",
      "Joyful",
      "Kind",
      "Laughing",
      "Legend",
      "Lunar",
      "Magic",
      "Majestic",
      "Marble",
      "Mega",
      "Merry",
      "Mighty",
      "Mystic",
      "Noble",
      "Nova",
      "Ocean",
      "Omega",
      "Onyx",
      "Opal",
      "Organic",
      "Pearl",
      "Perfect",
      "Phantom",
      "Phoenix",
      "Plasma",
      "Platinum",
      "Primal",
      "Prime",
      "Proud",
      "Pure",
      "Quick",
      "Quiet",
      "Radical",
      "Rapid",
      "Rare",
      "Royal",
      "Ruby",
      "Sacred",
      "Sage",
      "Secret",
      "Serene",
      "Sharp",
      "Shining",
      "Silent",
      "Silver",
      "Simple",
      "Skilled",
      "Smart",
      "Smooth",
      "Solar",
      "Solid",
      "Sonic",
      "Spark",
      "Spirit",
      "Spring",
      "Star",
      "Steel",
      "Storm",
      "Strong",
      "Summer",
      "Super",
      "Swift",
      "Techno",
      "Thunder",
      "Titan",
      "Tribal",
      "True",
      "Ultra",
      "Unique",
      "Urban",
      "Valor",
      "Vapor",
      "Vast",
      "Vector",
      "Velvet",
      "Vital",
      "Vivid",
      "Void",
      "Volt",
      "Wave",
      "Wild",
      "Winter",
      "Wise",
      "Wonder",
      "Worthy",
      "Xeno",
      "Young",
      "Zen",
      "Zero",
      "Zesty",
      "Zinc",
      "Zion",
      "Zodiac",
      "Alpha",
      "Beta",
      "Gamma",
      "Delta",
      "Cyber",
      "Digital",
      "Quantum",
      "Pixel",
      "Binary",
      "Neural",
      "Crypto",
      "Atomic",
      "Cosmic",
      "Astral",
      "Nebula",
      "Plasma",
      "Solar",
      "Lunar",
      "Stellar",
      "Galactic",
      "Arctic",
      "Desert",
      "Jungle",
      "Mountain",
      "Ocean",
      "Forest",
      "Crystal",
      "Diamond",
      "Emerald",
      "Ruby",
      "Sapphire",
      "Topaz",
      "Amber",
      "Jade",
      "Pearl",
      "Bronze",
      "Silver",
      "Golden",
      "Platinum",
      "Titanium",
      "Shadow",
      "Light",
      "Dark",
      "Bright",
      "Neon",
      "Laser",
      "Fusion",
      "Power",
      "Energy",
      "Force",
      "Metal",
      "Iron",
      "Steel",
      "Carbon",
      "Chrome",
      "Copper",
      "Nickel",
      "Cobalt",
      "Silicon",
      "Xenon",
    ];

    const nouns = [
      "Albatross",
      "Antelope",
      "Ape",
      "Badger",
      "Bear",
      "Beaver",
      "Bison",
      "Boar",
      "Buffalo",
      "Butterfly",
      "Camel",
      "Cheetah",
      "Cobra",
      "Condor",
      "Cougar",
      "Coyote",
      "Crane",
      "Crow",
      "Deer",
      "Dolphin",
      "Dragon",
      "Duck",
      "Eagle",
      "Elephant",
      "Falcon",
      "Ferret",
      "Fox",
      "Gazelle",
      "Gecko",
      "Giraffe",
      "Goat",
      "Gorilla",
      "Griffin",
      "Hawk",
      "Hedgehog",
      "Hippo",
      "Horse",
      "Husky",
      "Hyena",
      "Ibex",
      "Iguana",
      "Impala",
      "Jaguar",
      "Kangaroo",
      "Koala",
      "Koi",
      "Komodo",
      "Lemur",
      "Leopard",
      "Lion",
      "Llama",
      "Lynx",
      "Mammoth",
      "Manta",
      "Mantis",
      "Meerkat",
      "Monkey",
      "Moose",
      "Mouse",
      "Narwhal",
      "Octopus",
      "Orca",
      "Osprey",
      "Otter",
      "Owl",
      "Panda",
      "Panther",
      "Parrot",
      "Penguin",
      "Phoenix",
      "Pigeon",
      "Puma",
      "Python",
      "Rabbit",
      "Raccoon",
      "Ram",
      "Raven",
      "Rhino",
      "Robot",
      "Salamander",
      "Scorpion",
      "Shark",
      "Sheep",
      "Sloth",
      "Snake",
      "Spider",
      "Squid",
      "Squirrel",
      "Stag",
      "Swan",
      "Tiger",
      "Toad",
      "Turtle",
      "Unicorn",
      "Viper",
      "Vulture",
      "Walrus",
      "Wasp",
      "Wolf",
      "Wolverine",
      "Wombat",
      "Yak",
      "Zebra",
      "Zebu",
      "Alpaca",
      "Armadillo",
      "Axolotl",
      "Badger",
      "Bandicoot",
      "Basilisk",
      "Beetle",
      "Bumblebee",
      "Capybara",
      "Caracal",
      "Chameleon",
      "Chimera",
      "Chinchilla",
      "Cicada",
      "Cobra",
      "Corvid",
      "Crab",
      "Dingo",
      "Dragonfly",
      "Echidna",
      "Emu",
      "Fennec",
      "Firefly",
      "Flamingo",
      "Gazelle",
      "Gibbon",
      "Gryphon",
      "Hamster",
      "Hedgehog",
      "Hermit",
      "Heron",
      "Ibis",
      "Jackal",
      "Jellyfish",
      "Kestrel",
      "Kinkajou",
      "Kiwi",
      "Kraken",
      "Lemming",
      "Leopon",
      "Liger",
      "Lobster",
      "Locust",
      "Lotus",
      "Lungfish",
      "Lyrebird",
      "Magpie",
      "Manatee",
      "Mandrill",
      "Mantis",
      "Marlin",
      "Meerkat",
      "Mongoose",
      "Moth",
      "Numbat",
      "Ocelot",
      "Okapi",
      "Orangutan",
      "Orca",
      "Oryx",
      "Ostrich",
      "Pangolin",
      "Peacock",
      "Pelican",
      "Platypus",
      "Porcupine",
      "Quail",
      "Quokka",
      "Quoll",
      "Raptor",
      "Raven",
      "Reindeer",
      "Salamander",
      "Scorpion",
      "Seahorse",
      "Serval",
      "Shark",
      "Shrew",
      "Skunk",
      "Sloth",
      "Sparrow",
      "Sphinx",
      "Starling",
      "Stingray",
      "Tapir",
      "Tarantula",
    ];
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
                <div className="mx-3 mx-md-5 px-md-5 pt-3 pt-md-5">
                  <h2 class="title">Trending Discussions</h2>
                </div>
                <div className="olll">
                  <ContantHolder>
                    <HomeSlid />
                  </ContantHolder>
                </div>
              </div>

              {/* Companies section */}
              <div className="companies-section w-100">
                <Companies />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
