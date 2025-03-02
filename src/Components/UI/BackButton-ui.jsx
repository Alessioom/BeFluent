import { useNavigate } from "react-router-dom";
import "./BackButton-ui.css";

const BackButton = () => {
  const navigate = useNavigate();

  // Naviga indietro di un passo nella cronologia del browser
  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <button onClick={handleBack} className="back-button-ui">
      Torna Indietro
    </button>
  );
};

export default BackButton;
