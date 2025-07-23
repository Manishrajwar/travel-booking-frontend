import { useRef, useState, useEffect } from "react";
import "../../components/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import left from "../../assets/leftbtns.png";
import right from "../../assets/rightbtns.png";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import { FaFilter } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { motion, AnimatePresence } from "framer-motion";

function ShowHotels({ allHotels }) {
  const swiperRef = useRef(null);

  const [showFilter, setShowFilter] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);

  const [filteredHotels, setFilteredHotels] = useState([...allHotels]);


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

  const handleApplyFilters = () => {
    const filtered = allHotels.filter((hotel) => {
      const matchPrice =
        hotel.pricePerNight >= priceRange[0] &&
        hotel.pricePerNight <= priceRange[1];
      const matchRating =
        hotel.rating >= ratingRange[0] && hotel.rating <= ratingRange[1];
      return matchPrice && matchRating;
    });

    setFilteredHotels(filtered);

    toast.success("Filters Applied!");
    setShowFilter(false);
  };

  const handleClearFilters = () => {
    setPriceRange([0, 5000]);
    setRatingRange([0, 5]);
    setFilteredHotels(allHotels);
    toast.success("Filters Cleared!");
    setShowFilter(false);
  };

  // Optional: Close filter on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".filter-panel") &&
        !e.target.closest(".filter-icon")
      ) {
        setShowFilter(false);
      }
    };
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  useEffect(()=>{
   setFilteredHotels(allHotels);
  },[allHotels]);

  return (
    <div className="hsec5wrap">
      <div className="hsec5cont">
        <div className="hotel-header">
          <h2>Explore Hotels</h2>
          <FaFilter
            size={24}
            className="filter-icon"
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>

        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="filter-panel"
            >
              <h3>Filter Options</h3>

              <div className="filter-section">
                <label>
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <Slider
                  range
                  min={0}
                  max={10000}
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

              <div className="filter-section">
                <label>
                  Star Rating: {ratingRange[0]} - {ratingRange[1]}
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

              <div className="filter-buttons">
                <button className="apply-btn" onClick={handleApplyFilters}>
                  Apply
                </button>
                <button className="clear-btn" onClick={handleClearFilters}>
                  Clear All
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

       {
        filteredHotels?.length > 0 ?
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
                slidesPerView: 2,
              },
              850: {
                slidesPerView: 2,
              },
              200: {
                slidesPerView: 1.15,
              },
            }}
          >
            {filteredHotels.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <div className="sec5Item">
                  <img src={item.image} alt="img" className="sec5img" />

                  <div className="s5conteent">
                    <div className="s5itemclock">
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

                    <p className="s5imepara">{item.title}</p>
                  </div>

                  <p className="perperontext"> ₹ {item.pricePerNight} </p>
                  <p className="perperontext">
                    {item?.description?.slice(0, 80)}..
                  </p>

                  <button
                    onClick={() => toast.success("Your Hotel has been Booked")}
                    className="checkdetabtns1"
                  >
                    <span>Book Now</span>
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
        :
        <p className="Nohotelfound">No Hotel Found</p>
       }
      </div>

      
    </div>
  );
}

export default ShowHotels;
