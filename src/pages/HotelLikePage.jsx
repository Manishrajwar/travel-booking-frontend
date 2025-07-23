import { useState, useEffect } from "react";
import Navbar2 from "../Common/Navbar2";
import "./home.css";
import clock from "../assets/clock.png";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Endpoints } from "../services/api";


function HotelLikePage() {
  const navigate = useNavigate();

  const [likeHistory, setLikeHistory] = useState(() => {
    const saved = localStorage.getItem("likeHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [allTrips, setAllTrips] = useState([]);

  useEffect(() => {
    const fetchAllCityTripHandler = async () => {
      try {
        const tripresp = await axios.get(Endpoints.GET_ALL_TRIPS);
        if (tripresp.data) {
          setAllTrips(tripresp.data?.data || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllCityTripHandler();
  }, []);

  const toggleLike = (id) => {
    let updatedLikes;

    if (likeHistory.includes(id)) {
      updatedLikes = likeHistory.filter((likeId) => likeId !== id);
      toast.success("Successfully removed");
    } else {
      updatedLikes = [...likeHistory, id];
      toast.success("Successfully added");
    }

    setLikeHistory(updatedLikes);
    localStorage.setItem("likeHistory", JSON.stringify(updatedLikes));
  };

  const likedTrips = allTrips.filter((trip) => likeHistory.includes(trip.id));

  return (
    <section className="packageWrap">
      <Navbar2 />

      <main className="mainpaclives">
        {likedTrips.length > 0 ? (
          likedTrips.map((item, index) => (
            <div key={index} className="sec5Item">
              <img src={item.img} alt="img" className="sec5img" />

              <div className="s5conteent">
                <div className="addtolive">
                  <div className="s5itemclock">
                    <img src={clock} alt="" />
                    <span>{item.duration}</span>
                  </div>

                  <FaHeart
                    fontSize={22}
                    className="cursor-pointer"
                    onClick={() => toggleLike(item.id)}
                    style={{ color: "red" }}
                  />
                </div>

                <p className="s5imepara">{item.title}</p>
              </div>

              <p className="perperontext"> ₹ {item.price} </p>
              <p className="perperontext">
                {item?.description?.slice(0, 80)}...
              </p>

              <button
                onClick={() => navigate(`/packageDetail`, { state: item })}
                className="checkdetabtns1"
              >
                <span>CHECK DETAILS</span>
              </button>
            </div>
          ))
        ) : (
          <p className="Nohotelfound">No liked hotels found.</p>
        )}
      </main>
    </section>
  );
}

export default HotelLikePage;
