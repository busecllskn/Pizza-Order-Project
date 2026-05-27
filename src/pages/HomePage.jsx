import { Link } from "react-router-dom";
import homeImg from "../assets/Home.png";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="hero" style={{ backgroundImage: `url(${homeImg})` }}>
      <div className="hero-content">
        <Link to="/order">
          <button className="hero-btn">ACIKTIM</button>
        </Link>
      </div>
    </div>
  );
}