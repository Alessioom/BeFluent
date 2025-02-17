import React, { useState } from "react";
import "./ParlaConSpecialista.css";
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";

function ParlaConSpecialista() {
  // Stato per i messaggi: messaggi iniziale con il messaggio dello specialista
  const [messages, setMessages] = useState([
    { sender: "specialist", text: "Ciao benvenuto, dimmi tutto!" },
  ]);
  // Stato per il testo in input
  const [inputText, setInputText] = useState("");

  // Funzione per inviare il messaggio
  const handleSend = () => {
    if (inputText.trim() === "") return; // Non invia messaggi vuoti

    // Aggiunge il messaggio dell'utente alla lista
    setMessages([...messages, { sender: "user", text: inputText }]);
    setInputText("");
  };

  // Invio anche con il tasto Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <main className="chatContainerDialogoSpecialista">
        <div className="chatHeaderDialogoSpecialista">CHAT</div>

        <div className="messageContainerDialogoSpecialista">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`messageBubbleDialogoSpecialista ${
                msg.sender === "user"
                  ? "userDialogoSpecialista"
                  : "specialistDialogoSpecialista"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="inputContainerDialogoSpecialista">
          <input
            type="text"
            placeholder="scrivi qui il messaggio..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            className="sendButtonDialogoSpecialista"
          >
            Invia
          </button>
        </div>
      </main>

      <BackButton />

      <LogoProfile
        logoSrc="/BeFluent_logo_testo.png"
        profileSrc="/iconaBambino.png"
        logoClass="logoTesto-registrazioneSpecialista"
        profileClass="logoDottore-registrazioneSpecialista"
      />
    </>
  );
}

export default ParlaConSpecialista;
