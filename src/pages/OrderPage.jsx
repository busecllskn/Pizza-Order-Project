import { useState, useEffect } from "react";
import axios from "axios";

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
  const [formData, setFormData] = useState(initialForm);

  const [isValid, setIsValid] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isimValid =
      formData.isim.trim().length >= 3;

    const malzemeValid =
      formData.malzemeler.length <= 10;

    const boyutValid =
      formData.boyut !== "";

    setIsValid(
      isimValid &&
      malzemeValid &&
      boyutValid
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          malzemeler: [
            ...formData.malzemeler,
            value,
          ],
        });
      } else {
        setFormData({
          ...formData,
          malzemeler:
            formData.malzemeler.filter(
              (item) => item !== value
            ),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
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
        {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );

      console.log("Sipariş Özeti:");
      console.log(response.data);

      setFormData(initialForm);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Pizza Sipariş Formu</h1>

      <form onSubmit={handleSubmit}>

        <label>İsim</label>

        <input
          type="text"
          name="isim"
          value={formData.isim}
          onChange={handleChange}
          minLength="3"
          required
        />

        {formData.isim.length > 0 &&
          formData.isim.length < 3 && (
            <p>
              İsim en az 3 karakter olmalı.
            </p>
          )}

          <p className="pizza-describe">
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
            Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra
            geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen lezzetli bir
            İtalyan yemeğidir.
          </p>

        <h3>Pizza Boyutu</h3>

        <label>
          <input
            type="radio"
            name="boyut"
            value="Küçük"
            onChange={handleChange}
            checked={
              formData.boyut === "Küçük"
            }
          />
          Küçük
        </label>

        <label>
          <input
            type="radio"
            name="boyut"
            value="Orta"
            onChange={handleChange}
            checked={
              formData.boyut === "Orta"
            }
          />
          Orta
        </label>

        <label>
          <input
            type="radio"
            name="boyut"
            value="Büyük"
            onChange={handleChange}
            checked={
              formData.boyut === "Büyük"
            }
          />
          Büyük
        </label>

        {!formData.boyut && (
          <p>Pizza boyutu seç.</p>
        )}

        <h3>Malzemeler</h3>

        {malzemelerListesi.map(
          (malzeme) => (
            <label key={malzeme}>
              <input
                type="checkbox"
                value={malzeme}
                onChange={handleChange}
                checked={formData.malzemeler.includes(
                  malzeme
                )}
              />

              {malzeme}
            </label>
          )
        )}

        {(formData.malzemeler.length < 4 ||
          formData.malzemeler.length >
            10) && (
          <p>
            En az 4, en fazla 10
            malzeme seç.
          </p>
        )}

        <h3>Sipariş Notu</h3>

        <textarea
          name="not"
          value={formData.not}
          onChange={handleChange}
        />

        <br />

        <button
          type="submit"
          disabled={!isValid || loading}
        >
          {loading
            ? "Gönderiliyor..."
            : "Sipariş Ver"}
        </button>

      </form>
    </div>
  );
}