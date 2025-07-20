import  { useState, useEffect } from "react";
import "./pd.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";


const randomChooseArray = ["https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994210/images_1_las5mp.jpg", "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994210/images_o7yvs0.jpg", "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994382/download_3_b1zem3.jpg", "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994518/images_eohqsk.jpg", "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994518/download_3_fzfcas.jpg" , "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994632/download_5_mp8dv7.jpg"];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function PdSec1Animation() {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray([...randomChooseArray]);
    setShuffledImages(shuffled);
  }, []);

  if (shuffledImages.length === 0) return null;

  return (
    <div className="pdsec1aniwrap">
      <Swiper
        pagination={true}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {shuffledImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="singhersmalwidth">
              <img src={img} alt={`slide-${index}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PdSec1Animation;
