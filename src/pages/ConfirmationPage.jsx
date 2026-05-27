import { useHistory } from "react-router-dom";
import "./ConfirmationPage.css";
import successImg from "../assets/Success.png";

export default function ConfirmationPage() {
  const history = useHistory();

  return (
    <div className="confirmation-page">
        <div className="confirmation-content">
          <img src={successImg} alt="Sipariş başarılı" className="confirmation-img" />
          <button className="confirmation-btn" onClick={() => history.push("/")}>
            Anasayfaya Dön
          </button>
        </div>
    </div>
  );
}