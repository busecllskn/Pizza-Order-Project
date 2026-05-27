import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./OrderPage.css";

const malzemelerListesi = [
  "Pepperoni",
  "Domates",
  "Biber",
  "Sosis",
  "Mısır",
  "Sucuk",
  "Kanada Jambonu",
  "Ananas",
  "Tavuk Izgara",
  "Jalepeno",
  "Kabak",
  "Soğan",
  "Sarımsak",
];

const initialForm = {
  boyut: "",
  hamur: "",
  malzemeler: [],
  isim: "",
  not: "",
  adet: 1,
};

export default function OrderPage() {
  const history = useHistory();
  const [formData, setFormData] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  //3 koşulu sağlıyor mu kontrolünü etmek için
  useEffect(() => {
    const isimValid = formData.isim.trim().length >= 3;
    const malzemeValid =
      formData.malzemeler.length >= 4 && formData.malzemeler.length <= 10;
    const boyutValid = formData.boyut !== "";
    setIsValid(isimValid && malzemeValid && boyutValid);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      if (checked && formData.malzemeler.length >= 10) return;
      const yeniMalzemeler = checked
        ? [...formData.malzemeler, value]
        : formData.malzemeler.filter((item) => item !== value);
      setFormData({ ...formData, malzemeler: yeniMalzemeler });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAdetArtir = () => {
    setFormData((prev) => ({ ...prev, adet: prev.adet + 1 }));
  };

  const handleAdetAzalt = () => {
    setFormData((prev) => ({
      ...prev,
      adet: prev.adet > 1 ? prev.adet - 1 : 1,
    }));
  };

  const birimFiyat = 85.5 + formData.malzemeler.length * 5;
  const toplamFiyat = birimFiyat * formData.adet;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    setLoading(true);
    axios
      .post("https://reqres.in/api/pizza", formData, {
        headers: { "x-api-key": "reqres-free-v1" },
      })
      .then((response) => {
        console.log("Sipariş Özeti:", response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setFormData(initialForm);
        history.push("/confirmation");
      });
  };

  return (
    <div className="order-page">
      <header className="order-header">
        <h1>Teknolojik Yemekler</h1>
        <nav className="altbaslik">
          <a href="/">Anasayfa</a>
          <span> - </span>
          <span>Seçenekler</span>
          <span> - </span>
          <strong>Sipariş Oluştur</strong>
        </nav>
      </header>

      <main className="order-main">
        <form onSubmit={handleSubmit}>
          <h2 className="pizza-baslik">Position Absolute Acı Pizza</h2>

          <div className="pizza-meta">
            <span className="fiyat">85.50₺</span>
            <span className="puan">4.9</span>
            <span className="görüntülenme">(200)</span>
          </div>

          <p className="pizza-aciklama">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen lezzetli bir
            İtalyan yemeğidir.
          </p>

          {/* Pizza boyutu */}
            <div className="form-row">
            <div className="form-group">
              <label className="group-label">
                Boyut Seç <span className="zorunlu">*</span>
              </label>
              {["Küçük", "Orta", "Büyük"].map((boyut) => (
                <label key={boyut} className="radio-label">
                  <input
                    type="radio"
                    name="boyut"
                    value={boyut}
                    onChange={handleChange}
                    checked={formData.boyut === boyut}
                  />
                  {boyut}
                </label>
              ))}
            </div>

            {/* Hamur seçimi */}
            <div className="form-group">
              <label className="group-label">
                Hamur Seç <span className="zorunlu">*</span>
              </label>
              <select
                name="hamur"
                value={formData.hamur}
                onChange={handleChange}
              >
                <option value="">Hamur Kalınlığı</option>
                <option value="İnce">İnce</option>
                <option value="Normal">Normal</option>
                <option value="Kalın">Kalın</option>
              </select>
            </div>
          </div>

          {/* Malzeme seçimi*/}
          <div className="form-group">
            <label className="group-label">Ek Malzemeler</label>
            <p className="hint">En fazla 10 malzeme seçebilirsiniz. 5₺</p>
            <div className="malzeme-grid">
              {malzemelerListesi.map((malzeme) => (
                <label key={malzeme} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={malzeme}
                    onChange={handleChange}
                    checked={formData.malzemeler.includes(malzeme)}
                    disabled={
                      !formData.malzemeler.includes(malzeme) &&
                      formData.malzemeler.length >= 10
                    }
                  />
                  {malzeme}
                </label>
              ))}
            </div>
            {formData.malzemeler.length < 4 && (
              <span className="error-msg">
                En az 4 malzeme seçmelisiniz. ({formData.malzemeler.length}/4)
              </span>
            )}
          </div> 

          {/* İsim butonu */}
          <div className="form-group">
            <label className="group-label">
              İsim <span className="zorunlu">*</span>
            </label>
            <input
              type="text"
              name="isim"
              placeholder="Adınızı giriniz"
              value={formData.isim}
              onChange={handleChange}
              minLength="3"
              required
            />
            {formData.isim.length > 0 && formData.isim.length < 3 && (
              <span className="error-msg">İsim en az 3 karakter olmalı.</span>
            )}
          </div>

          {/* Sipariş Notu */}
          <div className="form-group">
            <label className="group-label">Sipariş Notu</label>
            <textarea
              name="not"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              value={formData.not}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="alt-row">
            <div className="adet-kontrol">
              <button
                type="button"
                className="adet-btn"
                onClick={handleAdetAzalt}
                disabled={formData.adet <= 1}
              >
                −
              </button>
              <span className="adet-sayi">{formData.adet}</span>
              <button
                type="button"
                className="adet-btn"
                onClick={handleAdetArtir}
              >
                +
              </button>
            </div>

            {/* Sipariş toplamı */}
            <div className="siparis-ozet">
              <p className="ozet-baslik">Sipariş Toplamı</p>
              <div className="ozet-row">
                <span>Seçimler</span>
                <span>{(formData.malzemeler.length * 5).toFixed(2)}₺</span>
              </div>
              <div className="ozet-row toplam">
                <span>Toplam</span>
                <span className="toplam-fiyat">{toplamFiyat.toFixed(2)}₺</span>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={!isValid || loading}
              >
                {loading ? "Gönderiliyor..." : "SİPARİŞ VER"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
