import  { useState, useEffect } from 'react';
import "./pd.css";

const randomChooseArray = ["https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994210/images_1_las5mp.jpg", "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994210/images_o7yvs0.jpg", "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994382/download_3_b1zem3.jpg", "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994518/images_eohqsk.jpg", "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994518/download_3_fzfcas.jpg" , "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1752994632/download_5_mp8dv7.jpg"];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function PDSec1() {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray([...randomChooseArray]).slice(0, 5);
    setShuffledImages(shuffled);
  }, []);

  if (shuffledImages.length === 0) return null;

  return (
    <div className='pdsec1cont'>
      <img src={shuffledImages[0]} alt="d1" className='pdsec1d1' loading='lazy' />

      <div className="pdsec1images">
        <img src={shuffledImages[1]} alt="d2" loading='lazy' />
        <img src={shuffledImages[2]} alt="d2" loading='lazy' />
        <img src={shuffledImages[3]} alt="d2" loading='lazy' />
        <img src={shuffledImages[4]} alt="d2" loading='lazy' />
      </div>
    </div>
  );
}

export default PDSec1;
