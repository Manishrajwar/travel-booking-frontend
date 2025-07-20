import  { useEffect, useRef, useState } from "react";
import "./home.css";
import Navbar2 from "../Common/Navbar2";
import PDSec1 from "../components/Packagedetail/PDSec1";
import PDSec2 from "../components/Packagedetail/PDSec2";
import PDSec3 from "../components/Packagedetail/PDSec3";
import PdSec1Animation from "../components/Packagedetail/PdSec1Animation";
import { useLocation, useNavigate } from "react-router-dom";
import CityAttraction from "../components/CityAttraction";
import axios from "axios";
import { Endpoints } from "../services/api";

function PackageDetail() {


  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const [allAttraction , setAllAttractions] = useState([]);

  const [loading , setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionRef2 = useRef(null);

  const fetchCityAttaraction = async()=>{
     try{
         setLoading(true);
      const resp = await axios.get(Endpoints.GET_CITY_ATTRACTIONS +  `/${state.cityId}`)
       if(resp.data){
         setAllAttractions(resp.data.data);
       }

     } catch(error){
       console.log(error);
     } finally{
      setLoading(false);
     }
  }

  useEffect(()=>{
    if(state){
      fetchCityAttaraction();
    }
    else{
        navigate("/");
    }
  },[state , location])

  const contactRef = useRef(null);

  return (
    <section className="packageWrap">
      <Navbar2 />

      <div className="pacakageWrapCont">
        <PDSec1 image={state?.img} />

        <PdSec1Animation />

        <PDSec2 contactRef={contactRef}
        data={state}
        />

       <CityAttraction loading={loading} contactRef={contactRef} location={state?.title} allAttraction={allAttraction} />

        <PDSec3 sectionRef2={sectionRef2} />

      </div>

    </section>
  );
}

export default PackageDetail;
