import { useState, useEffect } from "react";
import axios from "axios";

const malzemelerListesi = [
  "Pepperoni",
  "Mantar",
  "Sosis",
  "Mısır",
  "Sucuk",
  "Zeytin",
  "Soğan",
  "Biber",
  "Mozzarella",
  "Ananas",
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

  useEffect(() => {
    const isimValid = formData.isim.trim().length >= 3;

    const malzemeValid =
      formData.malzemeler.length >= 4 &&
      formData.malzemeler.length <= 10;

    const boyutValid = formData.boyut !== "";

    setIsValid(
      isimValid &&
      malzemeValid &&
      boyutValid
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

    } catch (error) {
      console.log(error);
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

        <h3>Pizza Boyutu</h3>

        <label>
          <input
            type="radio"
            name="boyut"
            value="Küçük"
            onChange={handleChange}
          />
          Küçük
        </label>

        <label>
          <input
            type="radio"
            name="boyut"
            value="Orta"
            onChange={handleChange}
          />
          Orta
        </label>

        <label>
          <input
            type="radio"
            name="boyut"
            value="Büyük"
            onChange={handleChange}
          />
          Büyük
        </label>

        <h3>Malzemeler</h3>

        {malzemelerListesi.map((malzeme) => (
          <label key={malzeme}>
            <input
              type="checkbox"
              value={malzeme}
              onChange={handleChange}
            />

            {malzeme}
          </label>
        ))}

        <p>
          En az 4, en fazla 10 malzeme seç.
        </p>

        <h3>Sipariş Notu</h3>

        <textarea
          name="not"
          value={formData.not}
          onChange={handleChange}
        />

        <br />

        <button
          type="submit"
          disabled={!isValid}
        >
          Sipariş Ver
        </button>
      </form>
    </div>
  );
}