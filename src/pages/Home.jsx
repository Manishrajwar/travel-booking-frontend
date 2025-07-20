import "./home.css";
import background from "../assets/homebackground.png";
import backgroundFilter from "../assets/homefilter.png";
import Navbar from "../Common/Navbar";
import {motion} from "framer-motion"

function Home({setOpenform}) {


  return (
    <div className="homeWrap">
        
      <img
        src={background}
        loading="lazy"
        alt="background"
        className="background"
      />
      <img
        src={backgroundFilter}
        alt="backgroundFilter"
        loading="lazy"
        className="backgroundFilter"
      />

      <Navbar setOpenform={setOpenform} />

      <div className="homeCont">

        <div 
      
        className="homeContent">
          <motion.h2 
           initial={{x:-100 , opacity:0}}
           animate={{x:0 , opacity:1}}
          transition={{delay:0.2 , x:{type:"spring" , stiffness:60 } , opacity:{duration:0.4} , ease:"easeIn" , duration:1}} 
          
          >Plan Your Perfect Getaway</motion.h2>
          <motion.p  
             initial={{x:-100 , opacity:0}}
             animate={{x:0 , opacity:1}}
            transition={{delay:0.2 , x:{type:"spring" , stiffness:60 } , opacity:{duration:1} , ease:"easeIn" , duration:0.6}} 
          >
            Discover top destinations, book cozy stays, and explore must-visit attractions — all in one place. Start your adventure today with hassle-free travel planning!
          </motion.p>
        
        </div>

      </div>


    </div>

  );
}

export default Home;
