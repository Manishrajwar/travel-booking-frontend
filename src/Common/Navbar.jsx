import { useEffect, useState } from "react";
import "./common.css";
import logo from "../assets/logo.png";
import smallnav from "../assets/smallnav.png";
import cross22 from "../assets/cross22.png";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import NavbarLayout from "./NavbarLayout";
import { FaBucket } from "react-icons/fa6";


const data = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "AboutUs",
    link: "/",
  },
  {
    title: <FaBucket />, 
    link: "/likes",
  },
];

function Navbar({likeHistory }) {
  const [opensidebar, setOpensidebar] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
     <NavbarLayout showContact={showContact} showAbout={showAbout} setShowAbout={setShowAbout} setShowContact={setShowContact} >

       <nav className={`navbarwrapper ${scrolled ? "scrolled" : ""}`}>
        <div className="navcont">
          <NavLink to={"/"}>
            {" "}
            <img src={logo} alt="logo" className="logo" />{" "}
          </NavLink>

          <ul className="navitems">
  <NavLink to="/">
    <li>Home</li>
  </NavLink>

  <li onClick={() => setShowAbout(true)}>AboutUs</li>

  <NavLink to={"/likes"}>
     <li  className="like-bucket">
    <FaBucket  fontSize={22} />
    {likeHistory.length > 0 && (
      <motion.span
        key={likeHistory.length} 
        initial={{ y: -5 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="like-count-badge"
      >
        {likeHistory.length}
      </motion.span>
    )}
  </li>
  </NavLink>
</ul>


          <img
            onClick={() => setOpensidebar(true)}
            src={smallnav}
            loading="lazy"
            alt="smallnav"
            className="smallnav"
          />
        </div>
      </nav>

      <motion.div
        className={`slidebarslidecont ${opensidebar ? "open" : ""}`}
        initial={{ x: "100%" }}
        animate={{ x: opensidebar ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="cross22">
          <img
            onClick={() => setOpensidebar(false)}
            src={cross22}
            alt="Close"
          />
        </div>
        <div className="allnavitems">
          {data.map((item, index) =>
            item.title === "Home" ? (
              <NavLink to={item.link}>
                <p key={index} className="sinnav">
                  {item.title}
                </p>
              </NavLink>
            ) : (
              <p
                onClick={() => {
                  setOpensidebar(false);

                  if (item.title === "AboutUs") {
                    setShowAbout(true);
                  } else if (item.title === "Contact") {
                    setShowContact(true);
                  }
                }}
                key={index}
                className="sinnav"
              >
                {item.title}
              </p>
            )
          )}
        </div>
      </motion.div>

     </NavbarLayout>

    </>
  );
}

export default Navbar;
