import { Link } from "react-router-dom";
import homeImg from "../assets/Home.png";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="hero" style={{ backgroundImage: `url(${homeImg})` }}>
      <div className="hero-content">
        <p className="brand">Teknolojik Yemekler</p>
        <h1>KOD ACIKTIRIR<br />PİZZA, DOYURUR</h1>
        <Link to="/order">
          <button className="hero-btn">ACIKTIM</button>
        </Link>
      </div>
    </div>
  );
}