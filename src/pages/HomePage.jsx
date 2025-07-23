import Home from "./Home";
import Homesec5 from "../components/HomePage/Homesec5";
import FrequentQuestion from "../Common/FrequentQuestion";
import { useState } from "react";

function HomePage() {

   const [likeHistory, setLikeHistory] = useState(() => {
      const saved = localStorage.getItem("likeHistory");
      return saved ? JSON.parse(saved) : [];
    });

  return (
    <div>
      <Home  likeHistory={likeHistory} setLikeHistory={setLikeHistory} />

      <Homesec5 likeHistory={likeHistory} setLikeHistory={setLikeHistory} />

      <FrequentQuestion />
    </div>
  );
}

export default HomePage;
