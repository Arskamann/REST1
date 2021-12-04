import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import urheilijatiedotContext from "../context/UrheilijatiedotContext";
const MuokkaaUrheilijatieto = () => {
  const [nimi, setNimi] = useState("");
  const [syntymapaiva, setSyntymapaiva] = useState("");
  const [paino, setPaino] = useState("");
  const [laji, setLaji] = useState("");
  const [saavutukset, setSaavutukset] = useState("");
  const [linkki, setLinkki] = useState("");
  const [list, setList] = useState([]);
  const UrheilijatiedotContext = useContext(urheilijatiedotContext); //hooks
  const { id } = useParams();

  let history = useNavigate();
  const handleSubmit = async (e) => {
    const paivitettyUrheilijatieto = {
      nimi: nimi,
      syntymapaiva: syntymapaiva,
      paino: paino,
      laji: laji,
      saavutukset: saavutukset,
      linkki: linkki,
    };

    UrheilijatiedotContext.setUrheilijatieto(id, paivitettyUrheilijatieto);
    history("/");
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const urheilijatieto = UrheilijatiedotContext.getUrheilijatieto(id).then(
        (res) => {
          setNimi(res.nimi);
          setSyntymapaiva(res.syntymapaiva);
          setPaino(res.paino);
          setLaji(res.laji);
          setSaavutukset(res.saavutukset);
          setLinkki(res.linkki);
        }
      );
    } else mounted = false;
  }, []);

  const onChangeNimi = (e) => {
    setNimi(e.target.value);
  };
  const onChangeSyntymapaiva = (e) => {
    setSyntymapaiva(e.target.value);
  };
  const onChangePaino = (e) => {
    setPaino(e.target.value);
  };
  const onChangeLaji = (e) => {
    setLaji(e.target.value);
  };
  const onChangeSaavutukset = (e) => {
    setSaavutukset(e.target.value);
  };
  const onChangeLinkki = (e) => {
    setLinkki(e.target.value);
  };
  return (
    <div className="card mb-3">
      <div className="card-header">Muokkaa urheilijatieto</div>

      <div className="card-body">
        <form onSubmit={handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="nimi">Nimi</label>
            <input
              type="text"
              name="nimi"
              className="form-control form-control-lg text-center"
              placeholder="Syötä uusi nimi..."
              value={nimi}
              onChange={onChangeNimi}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nimi">Syntymapaiva</label>
            <input
              type="text"
              name="syntymapaiva"
              className="form-control form-control-lg text-center"
              placeholder="Syötä uusi syntymäpäivä..."
              value={syntymapaiva.substring(0, 10)}
              onChange={onChangeSyntymapaiva}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nimi">Paino</label>
            <input
              type="text"
              name="paino"
              className="form-control form-control-lg text-center"
              placeholder="Syötä uusi paino..."
              value={paino}
              onChange={onChangePaino}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nimi">Laji</label>
            <input
              type="text"
              name="laji"
              className="form-control form-control-lg text-center"
              placeholder="Syötä uusi laji..."
              value={laji}
              onChange={onChangeLaji}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nimi">Saavutukset</label>
            <input
              type="text"
              name="saavutukset"
              className="form-control form-control-lg text-center"
              placeholder="Syötä saavutukset..."
              value={saavutukset}
              onChange={onChangeSaavutukset}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nimi">Linkki</label>
            <input
              type="text"
              name="linkki"
              className="form-control form-control-lg text-center"
              placeholder="Syötä uusi linkki..."
              value={linkki}
              onChange={onChangeLinkki}
            />
          </div>
          <input
            type="submit"
            value="Muokkaa urheilijan tiedot"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
};
export default MuokkaaUrheilijatieto;
