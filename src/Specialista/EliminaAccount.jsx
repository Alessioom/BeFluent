import './EliminaAccount.css';
import BackButton from "../Components/UI/BackButton-ui";
import LogoProfile from "../Components/UI/LogoProfile";
import NavButton from "../Components/UI/NavButton";
import { useNavigate } from 'react-router-dom';

const EliminaAccount = () => {
    const navigate = useNavigate();

    const handleDelete = () => {
        // operazione di eliminazione, o mostra un avviso di conferma
        alert('Il tuo account verrà eliminato!');
        // aggiungere una navigazione o chiamata API qui
    };
    

    return (
        <>
            <div style={{textAlign: 'center', color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Sei sicuro di voler eliminare il tuo account?
                <br/>È un’operazione irreversibile</div>

                <div className="delete-account-container">
                <button className="delete-account-button" onClick={handleDelete}>ELIMINA</button>

            </div>


            <div>
                <LogoProfile
                    logoSrc="/BeFluent_logo_testo.png"
                    profileSrc="/iconaDottore.png"
                    logoClass="logoTesto-registrazioneSpecialista"
                    profileClass="logoDottore-registrazioneSpecialista"
                />

                <div className="navigation-buttons">
                    <NavButton to="/Home/Specialista" className="home-button" text="HOME" />
                    <NavButton to="/Elenco/Bambini" className="bambini-button" text="BAMBINI" />
                    <NavButton to="/Impostazioni" className="settings-button-elenco" text="IMPOSTAZIONI" />
                    <NavButton to="#" className="strumenti-button" text="STRUMENTI" onClick={() => alert("Pagina in fase di implementazione!")} />
                    <NavButton to="/Logout" className="logout-button-elenco" text="LOGOUT" />
                </div>

                <BackButton />
            </div>
        </>
    );
};

export default EliminaAccount;
