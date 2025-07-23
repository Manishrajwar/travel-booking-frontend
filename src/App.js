import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PackageDetail from "./pages/PackageDetail";
import TravelChatbot from "./Common/TravelChatbot";
import HotelLikePage from "./pages/HotelLikePage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/packageDetail" element={<PackageDetail />} />
        <Route path="/likes" element={<HotelLikePage />} />
        
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>

      <TravelChatbot />
    </div>
  );
}

export default App;
