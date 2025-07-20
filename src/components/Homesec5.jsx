import  { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import left from "../assets/leftbtns.png";
import right from "../assets/rightbtns.png";
import clock from "../assets/clock.png";
import { Endpoints } from "../services/api";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Homesec5() {
  const swiperRef = useRef(null);

  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  const [alltrips , setAllTrips] = useState([]);

      const [selectedCity, setSelectedCity] = useState("");

  const fetchAllCityTripHandler = async () => {
    try {
       const [cityresp , tripresp] = await Promise.all([
            axios.get(Endpoints.GET_ALL_CITIES) , 
            axios.get(Endpoints.GET_ALL_TRIPS) , 
       ])

      if (cityresp.data) {
        setCities(cityresp.data?.data);
      }
      if (tripresp.data) {
        setAllTrips(tripresp.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSearchClick = async() => {
    if (selectedCity) {
   try{

    const resp = await axios.get(Endpoints.GET_TRIPS_BY_CITY + `/${selectedCity}`);
    if(resp.data){
       setAllTrips(resp.data?.data);
    }

   } catch(error){
     console.log("error",error);
     toast.error("Something went wrong, Please try again");
   }
    } else {
      toast.error("Please select a city!");
    }
  };

  useEffect(() => {
    fetchAllCityTripHandler();
  }, []);


  return (
    <div className="hsec5wrap">
      <div className="hsec5cont">
   <div className="city-search-wrap">
      <select
        className="city-select"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">Select City</option>
        {cities?.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <button className="city-search-btn" onClick={handleSearchClick}>
        <IoSearch size={18} />
        <span>Search</span>
      </button>
    </div>

        <h2>Our All Best Selling Packages</h2>

        <div className="brwseritems">
          <img
            src={left}
            alt="left"
            onClick={handlePrevClick}
            className="bwseritembtn"
            style={{ cursor: "pointer" }}
          />

          <Swiper
            rewind={true}
            loop={true}
            modules={[Navigation]}
            className="mySwiper2"
            slidesPerView={3}
            spaceBetween={10}
            ref={swiperRef}
            breakpoints={{
              1250: {
                slidesPerView: 3,
              },
              850: {
                slidesPerView: 2,
              },
              200: {
                slidesPerView: 1.15,
              },
            }}
          >
            {alltrips.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <div className="sec5Item">
                  <img src={item.img} alt="img" className="sec5img" />

                  <div className="s5conteent">
                    <div className="s5itemclock">
                      <img src={clock} alt="" />
                      <span>{item.duration}</span>
                    </div>

                    <p className="s5imepara">{item.title}</p>
                  </div>

                  <p className="perperontext"> ₹ {item.price}  </p>
                  <p className="perperontext"> {item?.description?.slice(0, 80)}...  </p>

                    <button onClick={()=> navigate(`/packageDetail/${item.title}` , {state: item})} className="checkdetabtns1">
                      <span>CHECK DETAILS</span>
                    </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <img
            src={right}
            alt="right"
            onClick={handleNextClick}
            className="bwseritembtn"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Homesec5;
