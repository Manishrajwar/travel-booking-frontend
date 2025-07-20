import  { useEffect, useRef, useState } from "react";
import "./home.css";
import Navbar2 from "../Common/Navbar2";
import PDSec1 from "../components/Packagedetail/PDSec1";
import PDSec2 from "../components/Packagedetail/PDSec2";
import PDSec3 from "../components/Packagedetail/PDSec3";
import PdSec1Animation from "../components/Packagedetail/PdSec1Animation";
import { useLocation } from "react-router-dom";
import CityAttraction from "../components/CityAttraction";
import axios from "axios";
import { Endpoints } from "../services/api";

function PackageDetail() {


  const location = useLocation();
  const state = location.state;

  const [allAttraction , setAllAttractions] = useState([]);

  console.log("state",state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isInView2, setIsInView2] = useState(true);
  const sectionRef2 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView2(entry.isIntersecting);
      },
      {
        threshold: 0.1, 
      }
    );

    if (sectionRef2.current) {
      observer.observe(sectionRef2.current);
    }

    return () => {
      if (sectionRef2.current) {
        observer.unobserve(sectionRef2.current);
      }
    };
  }, []);

  const fetchCityAttaraction = async()=>{
     try{

      const resp = await axios.get(Endpoints.GET_CITY_ATTRACTIONS +  `/${state.cityId}`)
       if(resp.data){
         setAllAttractions(resp.data.data);
       }

     } catch(error){
       console.log(error);
     }
  }

  useEffect(()=>{
    if(state){
      fetchCityAttaraction();
    }
  },[state])

  console.log("allAttraction" ,allAttraction);

  return (
    <section className="packageWrap">
      <Navbar2 />

      <div className="pacakageWrapCont">
        <PDSec1 image={state.img} />

        <PdSec1Animation data={state} />

        <PDSec2
        data={state}
          isInView2={isInView2}
        />

             <CityAttraction location={state.title} allAttraction={allAttraction} />

        <PDSec3 sectionRef2={sectionRef2} />

      </div>

    </section>
  );
}

export default PackageDetail;
