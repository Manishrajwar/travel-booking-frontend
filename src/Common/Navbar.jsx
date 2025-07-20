import { useEffect, useRef , useState } from "react";
import "./common.css";
import logo from "../assets/logo.png";
import smallnav from "../assets/smallnav.png"
import cross22 from "../assets/cross22.png"
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const data = [
  {
    title:"Home" ,
    link:"/"
  } ,
  {
    title:"AboutUs" ,
    link:"/"
  } ,
  {
    title:"Contact" ,
    link:"/"
  } 
]

function Navbar() {

  const [opensidebar, setOpensidebar] = useState(false);

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

    <nav className={`navbarwrapper ${scrolled ? "scrolled" : ""}`}>

      <div className="navcont">

        <NavLink to={"/"}> <img src={logo} alt="logo" className="logo" /> </NavLink>

        <ul className="navitems">
          {data.map((d, index) =>
            index !== 4 ?
            <NavLink to={d.link} >  <li  key={index}>{d.title}</li> </NavLink>
           :
           <li key={index}>{d.title}</li>

          )}
        </ul>

          <img onClick={()=>setOpensidebar(true)} src={smallnav} loading="lazy" alt="smallnav" className="smallnav" />

      </div>


    </nav>



    <motion.div
            className={`slidebarslidecont ${opensidebar ? 'open' : ''}`}
            initial={{ x: '100%' }} 
            animate={{ x: opensidebar ? 0 : '100%' }} 
            transition={{ duration: 0.3 }}
        >
            <div className="cross22">
                <img onClick={() => setOpensidebar(false)} src={cross22} alt="Close" />
            </div>
            <div className="allnavitems">
                {data.map((item, index) => (
                  <NavLink to={item.link}> <p onClick={()=>{
                     if(item.title === "Contact"){
                      setOpensidebar(false)
                     }
                  }} key={index} className="sinnav">
                        {item.title}
                    </p> </NavLink>
                ))}
            </div>
        </motion.div>





    </>

  );
}

export default Navbar;
