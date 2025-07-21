import { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../assets/logo.png";
import { IoReorderThreeSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import NavbarLayout from "./NavbarLayout";

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
    title: "Contact",
    link: "/",
  },
];

function Navbar2() {
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
      <NavbarLayout showContact={showContact} showAbout={showAbout} setShowAbout={setShowAbout} setShowContact={setShowContact}>
          <div className={`navbar2wrap ${scrolled ? "scrolled" : ""}`}>
          <div className="navbarCont2">
            <NavLink to={"/"}>
              {" "}
              <img src={logo} className="logo" alt="" />{" "}
            </NavLink>

            <ul className="navitems2">
              {data.map((d, index) =>
                index === 0 ? (
                  <NavLink to={d.link}>
                    {" "}
                    <li key={index}>{d.title}</li>{" "}
                  </NavLink>
                ) : (
                  <li className="cursor-pointer"
                    onClick={() => {
                      if (d.title === "AboutUs") {
                        setShowAbout(true);
                      } else {
                        setShowContact(true);
                      }
                    }}
                    key={index}
                  >
                    {d.title}
                  </li>
                )
              )}
            </ul>

            <IoReorderThreeSharp
              onClick={() => setOpensidebar(true)}
              className="IoReorderThreeSharp "
            />
          </div>
        </div>

        <motion.div
          className={`slidebarslidecont ${opensidebar ? "open" : ""}`}
          initial={{ x: "100%" }}
          animate={{ x: opensidebar ? 0 : "100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="cross22">
            <ImCross
              fontSize={40}
              color="white"
              onClick={() => setOpensidebar(false)}
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

export default Navbar2;
