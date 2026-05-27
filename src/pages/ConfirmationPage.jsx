import { useLocation, useHistory } from "react-router-dom";
import "./ConfirmationPage.css";
 
export default function ConfirmationPage() {
  const history = useHistory();
  const location = useLocation();
  const siparis = location.state || {};
 
  const {
    boyut = "-",
    hamur = "-",
    malzemeler = [],
    secimFiyat = 0,
    toplamFiyat = 0,
  } = siparis;
 
  return (
    <div className="confirmation-page">
      <header className="confirmation-header">
        <h1>Teknolojik Yemekler</h1>
      </header>
 
      <main className="confirmation-main">
        <div className="confirmation-hero">
          <p className="lezzet-text">lezzetin yolda</p>
          <h2 className="siparis-alindi">SİPARİŞ ALINDI</h2>
        </div>
 
        <hr className="confirmation-divider" />
 
        <div className="siparis-detay">
          <h3 className="pizza-adi">Position Absolute Acı Pizza</h3>
 
          <div className="detay-satirlar">
            <div className="detay-satir">
              <span className="detay-etiket">Boyut:</span>
              <span className="detay-deger">{boyut}</span>
            </div>
            <div className="detay-satir">
              <span className="detay-etiket">Hamur:</span>
              <span className="detay-deger">{hamur}</span>
            </div>
            <div className="detay-satir detay-satir--malzeme">
              <span className="detay-etiket">Ek Malzemeler:</span>
              <span className="detay-deger">
                {malzemeler.length > 0 ? malzemeler.join(", ") : "-"}
              </span>
            </div>
          </div>
 
          <div className="ozet-kutu">
            <p className="ozet-baslik">Sipariş Toplamı</p>
            <div className="ozet-satir">
              <span>Seçimler</span>
              <span>{secimFiyat.toFixed(2)}₺</span>
            </div>
            <div className="ozet-satir ozet-satir--toplam">
              <span>Toplam</span>
              <span>{toplamFiyat.toFixed(2)}₺</span>
            </div>
          </div>
        </div>
 
        <button
          className="confirmation-btn"
          onClick={() => history.push("/")}
        >
          Anasayfaya Dön
        </button>
      </main>
    </div>
  );
}