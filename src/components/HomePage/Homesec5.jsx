import { useEffect, useRef, useState } from "react";
import "../../components/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import left from "../../assets/leftbtns.png";
import right from "../../assets/rightbtns.png";
import clock from "../../assets/clock.png";
import { Endpoints } from "../../services/api";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HomeSec5Skeleton from "../../SkeletonUI/HomeSec5Skeleton";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "react-select";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import StarRatings from "react-star-ratings";
import Popup from "../../Common/Popup";

function Homesec5({ likeHistory, setLikeHistory }) {
  const swiperRef = useRef(null);

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [allTrips, setAllTrips] = useState([]);
  const [storeAllTrips, setStoreAllTrips] = useState([]);

  const [allHotels, setAllHotels] = useState([]);
  const [storeAllHotels, setStoreAllHotels] = useState([]);

  const [active, setActive] = useState("trip");
  const [showContact , setShowContact] = useState(false);

  const [cityTags, setCityTags] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [ratingRange, setRatingRange] = useState([0, 5]); 

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cityresp, tripresp, hotelResp] = await Promise.all([
        axios.get(Endpoints.GET_ALL_CITIES),
        axios.get(Endpoints.GET_ALL_TRIPS),
        axios.get(Endpoints.GET_ALL_HOTELS),
      ]);

      if (cityresp.data) {
        setCities(cityresp.data?.data);
      }
      if (tripresp.data) {
        setAllTrips(tripresp.data?.data);
        setStoreAllTrips(tripresp.data?.data);
      }
      if (hotelResp.data) {
        setAllHotels(hotelResp.data?.data);
        setStoreAllHotels(hotelResp.data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleTripSearch = () => {
    if (cityTags.length === 0) {
      toast.error("Please select at least one city!");
      return;
    }

    const selectedCityIds = cityTags.map((tag) => tag.value);

    const filteredTrips = storeAllTrips.filter((trip) => {
      const matchesCity = selectedCityIds.includes(trip.cityId);
      const matchesPrice =
        trip.price >= priceRange[0] && trip.price <= priceRange[1];
      return matchesCity && matchesPrice;
    });

    if (filteredTrips.length === 0) {
      toast.error("No trips found for selected filters!");
    }
      else{
      toast.success("Filter Applied");
    }

    setAllTrips(filteredTrips);
  };

  const handleHotelSearch = () => {
    if (cityTags.length === 0) {
      toast.error("Please select at least one city!");
      return;
    }

    const selectedCityIds = cityTags.map((tag) => tag.value);

    const filteredHotels = storeAllHotels.filter((hotel) => {
      const matchesCity = selectedCityIds.includes(hotel.cityId);
      const matchesPrice =
        hotel.pricePerNight >= priceRange[0] &&
        hotel.pricePerNight <= priceRange[1];
      const matchesRating =
        hotel.rating >= ratingRange[0] && hotel.rating <= ratingRange[1];
      return matchesCity && matchesPrice && matchesRating;
    });

    if (filteredHotels.length === 0) {
      toast.error("No hotels found for selected filters!");
    }
    else{
      toast.success("Filter Applied");
    }

    setAllHotels(filteredHotels);

  };

  const toggleLike = (id) => {
    let updatedLikes;

    if (likeHistory?.includes(id)) {
      updatedLikes = likeHistory?.filter((likeId) => likeId !== id);
      toast.success("Successfully removed");
    } else {
      updatedLikes = [...likeHistory, id];
      toast.success("Successfully added");
    }

    setLikeHistory(updatedLikes);
    localStorage.setItem("likeHistory", JSON.stringify(updatedLikes));
  };

  return (
    <div className="hsec5wrap">
      <div className="hsec5cont">
        <div className="city-search-wrap">
          <Select
            className="city-select"
            isMulti
            placeholder="Select Cities"
            options={cities?.map((city) => ({
              value: city.id,
              label: city.name,
            }))}
            value={cityTags}
            onChange={(selected) => {
              setCityTags(selected);
            }}
          />

          <div className="price-range">
            <label>
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </label>
            <Slider
              range
              min={0}
              max={20000}
              step={100}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              trackStyle={[{ backgroundColor: "#CCF32F" }]}
              handleStyle={[
                { borderColor: "#CCF32F", backgroundColor: "#CCF32F" },
                { borderColor: "#CCF32F", backgroundColor: "#CCF32F" },
              ]}
            />
          </div>

          {active === "other" && (
            <div className="rating-range">
              <label>
                Rating Range: {ratingRange[0]} - {ratingRange[1]}
              </label>
              <Slider
                range
                min={0}
                max={5}
                step={0.1}
                value={ratingRange}
                onChange={(value) => setRatingRange(value)}
                trackStyle={[{ backgroundColor: "#CCF32F" }]}
                handleStyle={[
                  { borderColor: "#CCF32F", backgroundColor: "#CCF32F" },
                  { borderColor: "#CCF32F", backgroundColor: "#CCF32F" },
                ]}
              />
            </div>
          )}

          <button
            className="city-search-btn"
            onClick={active === "trip" ? handleTripSearch : handleHotelSearch}
          >
            <IoSearch size={18} />
            <span>Search</span>
          </button>
        </div>

        <div className="toggle-wrapper">
          <div className="toggle-container">
            <motion.div
              className="toggle-slider"
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              animate={{ left: active === "trip" ? "0%" : "50%" }}
            />
            <button
              className={`toggle-btn ${active === "trip" ? "active" : ""}`}
              onClick={() => setActive("trip")}
            >
              Trip
            </button>
            <button
              className={`toggle-btn ${active === "other" ? "active" : ""}`}
              onClick={() => setActive("other")}
            >
             Hotels
            </button>
          </div>
        </div>

        <h2>
          Our All Best Selling {active === "trip" ? "Packages" : "Hotels"}
        </h2>

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
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
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
            {loading ? (
              <HomeSec5Skeleton />
            ) : active === "trip" ? (
              allTrips.length === 0 ? (
                <HomeSec5Skeleton />
              ) : (
                allTrips.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="sec5Item">
                      <img src={item.img} alt="img" className="sec5img" />
                      <div className="s5conteent">
                        <div className="addtolive">
                          <div className="s5itemclock">
                            <img src={clock} alt="" />
                            <span>{item.duration}</span>
                          </div>
                          {likeHistory?.includes(item.id) ? (
                            <FaHeart
                              fontSize={22}
                              className="cursor-pointer"
                              onClick={() => toggleLike(item.id)}
                              style={{ color: "red" }}
                            />
                          ) : (
                            <CiHeart
                              fontSize={22}
                              className="cursor-pointer"
                              onClick={() => toggleLike(item.id)}
                            />
                          )}
                        </div>
                        <p className="s5imepara">{item.title}</p>
                      </div>
                      <p className="perperontext">₹ {item.price}</p>
                      <p className="perperontext">
                        {item.description?.slice(0, 80)}...
                      </p>
                      <button
                        onClick={() =>
                          navigate(`/packageDetail`, { state: item })
                        }
                        className="checkdetabtns1"
                      >
                        <span>CHECK DETAILS</span>
                      </button>
                    </div>
                  </SwiperSlide>
                ))
              )
            ) : allHotels.length === 0 ? (
              <HomeSec5Skeleton />
            ) : (
              allHotels.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="sec5Item">
                    <img src={item.image} alt="img" className="sec5img" />
                    <div className="s5conteent">
                      <div className="addtolive">
                        <StarRatings
                          rating={item.rating}
                          starRatedColor="#f5c518"
                          starEmptyColor="#ccc"
                          starDimension="20px"
                          starSpacing="2px"
                          numberOfStars={5}
                          name="rating"
                        />
                      </div>
                      <p className="s5imepara">{item.name}</p>
                    </div>
                    <p className="perperontext">₹ {item.pricePerNight}</p>
                    <p className="perperontext">
                      {item.description?.slice(0, 80)}...
                    </p>
                    <button
                       onClick={()=>setShowContact(true)}
                      className="checkdetabtns1"
                    >
                      <span>Book Now</span>
                    </button>
                  </div>
                </SwiperSlide>
              ))
            )}
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

          <Popup isOpen={showContact} onClose={() => setShowContact(false)}>
        <h2>Contact Us</h2>
        <p>
Fill in your contact number and our team will reach out to you soon to help you book your hotel.        </p>

      <form onSubmit={(e)=>{
         e.preventDefault();
          toast.success("Our team will Contact you soon!");
          setShowContact(false);
          
      }} className="inputbtns">
           <input  type="text" placeholder="Enter Phone Number" required />

         <button type="submit">Submit</button>
         </form>
      </Popup>
    </div>
  );
}

export default Homesec5;
