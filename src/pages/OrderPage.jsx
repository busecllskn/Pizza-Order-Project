import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./OrderPage.css";

const malzemelerListesi = [
  "Pepperoni", 
  "Sosis", 
  "Kanada Jambonu", 
  "Tavuk Izgara", 
  "Soğan",
  "Domates", 
  "Mısır", 
  "Sucuk", 
  "Jalepeno", 
  "Sarımsak",
  "Biber", 
  "Ananas", 
  "Kabak",
];

const initialForm = {
  isim: "",
  boyut: "",
  malzemeler: [],
  not: "",
};

export default function OrderPage() {
  const history = useHistory();
  const [formData, setFormData] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isimValid = formData.isim.trim().length >= 3;
    const malzemeValid = formData.malzemeler.length >= 4 && formData.malzemeler.length <= 10;
    const boyutValid = formData.boyut !== "";
    setIsValid(isimValid && malzemeValid && boyutValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        if (formData.malzemeler.length >= 10) return;
        setFormData({ ...formData, malzemeler: [...formData.malzemeler, value] });
      } else {
        setFormData({ ...formData, malzemeler: formData.malzemeler.filter((item) => item !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    try {
      setLoading(true);
      const response = await axios.post(
        "https://reqres.in/api/pizza",
        formData,
        { headers: { "x-api-key": "reqres-free-v1" } }
      );
      console.log("Sipariş Özeti:");
      console.log(response.data);
      setFormData(initialForm);
      history.push("/confirmation");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-page">

      <header className="order-header">
        <h1>Teknolojik Yemekler</h1>
        <nav className="breadcrumb">
          <a href="/">Anasayfa</a>
          <span> - </span>
          <span>Seçenekler</span>
          <span> - </span>
          <strong>Sipariş Oluştur</strong>
        </nav>
      </header>

      <main className="order-main">
        <form onSubmit={handleSubmit} noValidate>

          <h2 className="pizza-baslik">Position Absolute Acı Pizza</h2>

          <div className="pizza-meta">
            <span className="fiyat">85.50₺</span>
            <span className="puan">4.9</span>
            <span className="görüntülenme">(200)</span>
          </div>

          <p className="pizza-aciklama">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
            Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra
            geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen lezzetli bir
            İtalyan yemeğidir.
          </p>

          {/* Boyut */}
          <div className="form-row">
            <div className="form-group">
              <label className="group-label">Boyut Seç <span className="zorunlu">*</span></label>
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
              {!formData.boyut && <span className="error-msg">Pizza boyutu seç.</span>}
            </div>

            {/* Hamur - select olarak eklendi */}
            <div className="form-group">
              <label className="group-label">Hamur Seç <span className="zorunlu">*</span></label>
              <select name="hamur" value={formData.hamur || ""} onChange={handleChange}>
                <option value="">Hamur Kalınlığı</option>
                <option value="İnce">İnce</option>
                <option value="Normal">Normal</option>
                <option value="Kalın">Kalın</option>
              </select>
            </div>
          </div>

          {/* Malzemeler */}
          <div className="form-group">
            <label className="group-label">Ek Malzemeler</label>
            <p className="hint">En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
            <div className="malzeme-grid">
              {malzemelerListesi.map((malzeme) => (
                <label key={malzeme} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={malzeme}
                    onChange={handleChange}
                    checked={formData.malzemeler.includes(malzeme)}
                    disabled={!formData.malzemeler.includes(malzeme) && formData.malzemeler.length >= 10}
                  />
                  {malzeme}
                </label>
              ))}
            </div>
            {(formData.malzemeler.length < 4 || formData.malzemeler.length > 10) && (
              <span className="error-msg">En az 4, en fazla 10 malzeme seç.</span>
            )}
            <span className="malzeme-count">{formData.malzemeler.length}/10 seçildi</span>
          </div>

          {/* İsim */}
          <div className="form-group">
            <label className="group-label">İsim <span className="zorunlu">*</span></label>
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

          <button
            type="submit"
            className="submit-btn"
            disabled={!isValid || loading}
          >
            {loading ? "Gönderiliyor..." : "SİPARİŞ VER"}
          </button>

        </form>
      </main>
    </div>
  );
}