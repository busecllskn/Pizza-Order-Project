import { Link } from "react-router-dom";
import homeImg from "../assets/Home.png";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">

      {/* Hero — arka plan resim */}
      <div className="hero" style={{ backgroundImage: `url(${homeImg})` }}>
        <div className="hero-content">
          <Link to="/order">
            <button className="hero-btn">ACIKTIM</button>
          </Link>
        </div>
      </div>

      {/* Kategori bar */}
      <div className="kategori-bar">
        {["🍜 YENİ! Kore", "🍕 Pizza", "🍔 Burger", "🍟 Kızartmalar", "🌮 Fast food", "🥤 Gazlı İçecek"].map((item) => (
          <span key={item} className="kategori-item">{item}</span>
        ))}
      </div>

      {/* Öne çıkan kartlar */}
      <div className="featured-section">
        <div className="featured-grid">

          {/* Sol büyük kart */}
          <div className="featured-card featured-card--red">
            <div className="featured-card-content">
              <h2>Özel<br />Lezzetus</h2>
              <p>Position:Absolute Acı Burger</p>
              <Link to="/order">
                <button className="featured-btn">SİPARİŞ VER</button>
              </Link>
            </div>
          </div>

          {/* Sağ küçük kartlar */}
          <div className="featured-right">
            <div className="featured-card featured-card--dark">
              <div className="featured-card-content">
                <h3>Hackathlon<br />Burger Menü</h3>
                <Link to="/order">
                  <button className="featured-btn">SİPARİŞ VER</button>
                </Link>
              </div>
            </div>

            <div className="featured-card featured-card--yellow">
              <div className="featured-card-content">
                <h3><span className="highlight">Çoooook</span> hızlı<br />npm gibi kurye</h3>
                <Link to="/order">
                  <button className="featured-btn">SİPARİŞ VER</button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Menüler */}
      <div className="menu-section">
        <p className="menu-subtitle">en çok paketlenen menüler</p>
        <h2 className="menu-title">Acıktıran Kodlara Doyuran Lezzetler</h2>

        <div className="menu-tabs">
          {["🍜 Ramen", "🍕 Pizza", "🍔 Burger", "🍟 French fries", "🌮 Fast food", "🥤 Soft drinks"].map((tab, i) => (
            <button key={tab} className={`menu-tab ${i === 1 ? "menu-tab--active" : ""}`}>{tab}</button>
          ))}
        </div>

        <div className="menu-grid">
          {[
            { ad: "Terminal Pizza", puan: "4.9", yorum: "(200)", fiyat: "60₺" },
            { ad: "Position Absolute Acı Pizza", puan: "4.9", yorum: "(928)", fiyat: "85₺" },
            { ad: "useEffect Tavuklu Burger", puan: "4.9", yorum: "(462)", fiyat: "75₺" },
          ].map((urun) => (
            <div key={urun.ad} className="menu-card">
              <div className="menu-card-img" />
              <div className="menu-card-info">
                <p className="menu-card-name">{urun.ad}</p>
                <div className="menu-card-meta">
                  <span>{urun.puan}</span>
                  <span>{urun.yorum}</span>
                  <span className="menu-card-fiyat">{urun.fiyat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Teknolojik<br />Yemekler</h3>
            <p>📍 341 Londonderry Road, İstanbul Türkiye</p>
            <p>✉️ aciktim@teknolojikyemekler.com</p>
            <p>📞 +90 216 123 45 67</p>
          </div>
          <div className="footer-links">
            <h4>Sıcacık Menuler</h4>
            <ul>
              <li>Terminal Pizza</li>
              <li>5 Kişilik Hackathlon Pizza</li>
              <li>useEffect Tavuklu Pizza</li>
              <li>Beyaz Console Frosty</li>
              <li>Testler Geçti Mutlu Burger</li>
              <li>Position Absolute Acı Burger</li>
            </ul>
          </div>
          <div className="footer-instagram">
            <h4>Instagram</h4>
            <div className="instagram-grid">
              {[1,2,3,4].map((i) => (
                <div key={i} className="instagram-item" />
              ))}
            </div>
          </div>
        </div>
        <p className="footer-bottom">© 2023 Teknolojik Yemekler.</p>
      </footer>

    </div>
  );
}