import  { useEffect, useState , useRef } from "react";
import "./navbar.css";
import logo from "../assets/logo.png";
import { IoReorderThreeSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import {motion} from "framer-motion"
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


function Navbar2() {

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
    <div>



      <div className={`navbar2wrap ${scrolled ? "scrolled" : ""}`}>

        <div className="navbarCont2">
         <NavLink to={"/"}> <img src={logo} className="logo" alt="" /> </NavLink>

          <ul className="navitems2">
            {data.map((d, index) =>
              index !== 4 ?
              <NavLink to={d.link} >  <li  key={index}>{d.title}</li> </NavLink>
             :
             <li  className="cursor-pointer"  key={index}>{d.title}</li>

            )}
          </ul>


<IoReorderThreeSharp onClick={()=>setOpensidebar(true)} className="IoReorderThreeSharp "  />


        </div>


      </div>

      <motion.div
            className={`slidebarslidecont ${opensidebar ? 'open' : ''}`}
            initial={{ x: '100%' }} 
            animate={{ x: opensidebar ? 0 : '100%' }} 
            transition={{ duration: 0.3 }} 
        >
            <div className="cross22">
                <ImCross fontSize={40} color="white" onClick={() => setOpensidebar(false)} />

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


    </div>



    </>
  );
}

export default Navbar2;
