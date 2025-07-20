import { useRef } from "react";
import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import left from "../assets/leftbtns.png";
import right from "../assets/rightbtns.png";
import toast from "react-hot-toast";

function CityAttraction({ allAttraction ,location }) {
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
        <h2>Must-Visit Places</h2>

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
            {allAttraction.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <div className="sec5Item">
                  <img src={item.image} alt="img" className="sec5img" />

                    <p className="s5imepara">{item.name}</p>

                    <p>{location}</p>
                

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

export default CityAttraction;
