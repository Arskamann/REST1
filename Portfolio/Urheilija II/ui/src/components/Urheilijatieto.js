import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import urheilijatiedotContext from "../context/UrheilijatiedotContext";
import { useNavigate } from "react-router-dom";
const Urheilijatieto = (props) => {
  const UrheilijatiedotContext = useContext(urheilijatiedotContext); //hooks
  let history = useNavigate();
  const [naytaUrheilijatieto, setnaytaUrheilijatieto] = useState(false);
  const onShowClick = (e) => {
    let lippu = !naytaUrheilijatieto;
    setnaytaUrheilijatieto(lippu);
  };
  const onDeleteClick = (id) => {
    UrheilijatiedotContext.poistaUrheilijatieto(id);
    window.location.reload();
    history("/");
  };
  
  const { id, nimi, syntymapaiva, paino, linkki, laji, saavutukset } =
    props.urheilijatieto;
  return (
    <div className="card card-body mb-3 display:flex, justifyContent: flex-end">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <h4>{nimi}</h4>
        <button className="button_left" onClick={onShowClick.bind(this)}>
          Tiedot
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          className="btn-group mr-2 text-right"
          role="group"
          aria-label="Second group"
        >
          <button
            className="button_right"
            onClick={onDeleteClick.bind(this, { id })}
          >
            Poista
          </button>
          <Link to={`urheilijatieto/muokkaa/${id}`}>
            <button className="button_right">Muokkaa</button>
          </Link>
        </div>
      </div>
      {naytaUrheilijatieto ? (
        <ul className="list-group">
          <li className="list-group-item">ID: {id}</li>
          <li className="list-group-item">
            Syntymäpäivä: {syntymapaiva.substring(0, 10)}
          </li>
          <li className="list-group-item">Paino: {paino}</li>
          <li className="list-group-item">Linkki kuvaan: {linkki}</li>
          <li className="list-group-item">Urheilulaji: {laji}</li>
          <li className="list-group-item">Saavutukset: {saavutukset}</li>
        </ul>
      ) : null}
    </div>
  );
};
export default Urheilijatieto;
