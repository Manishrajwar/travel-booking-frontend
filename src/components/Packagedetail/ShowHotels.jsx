import { useRef } from "react";
import "../../components/styles.css"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import left from "../../assets/leftbtns.png";
import right from "../../assets/rightbtns.png";
import toast from "react-hot-toast";
import StarRatings from 'react-star-ratings';

function ShowHotels({ allHotels }) {
  const swiperRef = useRef(null);


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

  return (
    <div className="hsec5wrap">
      <div className="hsec5cont">
        <h2>Explore Hotels</h2>

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
            {allHotels.map((item, index) => (
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
                    {" "}
                    {item?.description?.slice(0, 80)}..{" "}
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
      </div>
    </div>
  );
}

export default ShowHotels;
