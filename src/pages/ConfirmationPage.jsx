import { useHistory } from "react-router-dom";
import "./ConfirmationPage.css";

export default function ConfirmationPage({ siparis, axiosYaniti }) {
  const history = useHistory();

  if (!siparis) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-bos">
          <p>Henüz bir sipariş verilmedi.</p>
          <button className="confirmation-btn" onClick={() => history.push("/")}>
            Anasayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  const { isim, boyut, hamur, malzemeler = [], not, adet, secimFiyat, toplamFiyat } = siparis;

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
              <span className="detay-etiket">İsim:</span>
              <span className="detay-deger">{isim}</span>
            </div>
            <div className="detay-satir">
              <span className="detay-etiket">Boyut:</span>
              <span className="detay-deger">{boyut}</span>
            </div>
            <div className="detay-satir">
              <span className="detay-etiket">Hamur:</span>
              <span className="detay-deger">{hamur}</span>
            </div>
            <div className="detay-satir">
              <span className="detay-etiket">Adet:</span>
              <span className="detay-deger">{adet}</span>
            </div>
            <div className="detay-satir detay-satir--malzeme">
              <span className="detay-etiket">Ek Malzemeler:</span>
              <span className="detay-deger">
                {malzemeler.length > 0 ? malzemeler.join(", ") : "-"}
              </span>
            </div>
            {not && (
              <div className="detay-satir">
                <span className="detay-etiket">Not:</span>
                <span className="detay-deger">{not}</span>
              </div>
            )}
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

          {axiosYaniti && (
            <div className="axios-yaniti">
              <p className="axios-baslik">Sunucu Yanıtı</p>
              <pre className="axios-icerik">
                {JSON.stringify(axiosYaniti, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <button className="confirmation-btn" onClick={() => history.push("/")}>
          Anasayfaya Dön
        </button>
      </main>
    </div>
  );
}