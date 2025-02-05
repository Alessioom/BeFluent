import { useNavigate } from "react-router-dom";
import "./BackButton-ui.css";

const BackButton_ui = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="back-button-ui">
      Torna Indietro
    </button>
  );
};

export default BackButton_ui;