import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import urheilijatiedotContext from "../context/UrheilijatiedotContext";

export default function LisaaUrheilijatieto() {
  let history = useNavigate();
  const [nimi, setNimi] = useState("");
  const [syntymapaiva, setSyntymapaiva] = useState("");
  const [paino, setPaino] = useState("");
  const [laji, setLaji] = useState("");
  const [saavutukset, setSaavutukset] = useState("");
  const [linkki, setLinkki] = useState("");

  const UrheilijatiedotContext = useContext(urheilijatiedotContext); //hooks

  const handleSubmit = async (e) => {
    const uusiUrheilijatieto = {
      nimi: nimi,
      syntymapaiva: syntymapaiva,
      paino: paino,
      laji: laji,
      saavutukset: saavutukset,
      linkki: linkki,
    };
    console.log("Tarkistetaan uusiUrheilijatieto -objekti:");
    console.log(uusiUrheilijatieto);

    UrheilijatiedotContext.setUrheilijatiedot(uusiUrheilijatieto);
    history("/");
  };
  return (
    <div className="card mb-3">
      <div className="card-header">Lisää urheilijan tiedot</div>
      <div className="card-body">
        <form onSubmit={handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="nimi">Nimi, sukunimi, kutsumanimi</label>
            <input
              id="nimitieto"
              type="text"
              name="nimi"
              className="form-control form-control-lg text-center"
              placeholder="Syötä nimi..."
              value={nimi}
              onChange={(event) => setNimi(event.target.value)}
            />
            <div className="invalid-feedback">Täytä nimi</div>
          </div>

          <div className="form-group">
            <label htmlFor="syntymapaiva">Syntymäpäivä</label>
            <input
              id="syntymapaivatieto"
              type="text"
              name="syntymapaiva"
              className="form-control form-control-lg text-center"
              placeholder="Syötä syntymäpäivämäärä YYYY-MM-DD..."
              value={syntymapaiva}
              onChange={(event) => setSyntymapaiva(event.target.value)}
            />
            <div className="invalid-feedback">Täytä tieto</div>
          </div>
          <div className="form-group">
            <label htmlFor="paino">Paino</label>
            <input
              id="painotieto"
              type="text"
              name="paino"
              className="form-control form-control-lg text-center"
              placeholder="Syötä paino..."
              value={paino}
              onChange={(event) => setPaino(event.target.value)}
            />
            <div className="invalid-feedback">Täytä nimi</div>
          </div>
          <div className="form-group">
            <label htmlFor="urheilulaji">Urheilulaji</label>
            <input
              id="lajitieto"
              type="text"
              name="laji"
              className="form-control form-control-lg text-center"
              placeholder="Syötä urheilulaji..."
              value={laji}
              onChange={(event) => setLaji(event.target.value)}
            />
            <div className="invalid-feedback">Täytä nimi</div>
          </div>
          <div className="form-group">
            <label htmlFor="saavutukset">Saavutukset</label>
            <input
              id="saavutustiedot"
              type="text"
              name="saavutukset"
              className="form-control form-control-lg text-center"
              placeholder="Syötä saavutukset..."
              value={saavutukset}
              onChange={(event) => setSaavutukset(event.target.value)}
            />
            <div className="invalid-feedback">Täytä nimi</div>
          </div>
          <div className="form-group">
            <label htmlFor="linkkikuvaan">Linkki kuvaan</label>
            <input
              id="linkkitieto"
              type="text"
              name="linkki"
              className="form-control form-control-lg text-center"
              placeholder="Syötä linkki kuvaan..."
              value={linkki}
              onChange={(event) => setLinkki(event.target.value)}
            />
            <div className="invalid-feedback">Täytä nimi</div>
          </div>
          <input
            type="submit"
            value="Tallenna henkilö"
            className="btn btn-light bg-primary btn-block"
          />
        </form>
      </div>
    </div>
  );
}
