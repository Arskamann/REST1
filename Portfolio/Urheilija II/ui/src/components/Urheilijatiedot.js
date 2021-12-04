import React, { useContext, useEffect } from "react";
import Urheilijatieto from "./Urheilijatieto";
import urheilijatiedotContext from "../context/UrheilijatiedotContext";

const Urheilijatiedot = () => {
  const UrheilijatiedotContext = useContext(urheilijatiedotContext); //hooks
  console.log(UrheilijatiedotContext);
  useEffect(() => {
    //kun komponentti ladataan muistiin -> tapaht. useEffect
    UrheilijatiedotContext.getUrheilijatiedot(); //haetaan urheilijatiedot
    console.log(UrheilijatiedotContext);
  }, []); //Kun komponentti piirretään, suoritetaan kerran
  return (
    <>
      <h1 className="display-4 mb-2">
        <span className="text-dark">Urheilijatiedot</span>
      </h1>
      <React.Fragment>
        {UrheilijatiedotContext.urheilijatiedot.length
          ? UrheilijatiedotContext.urheilijatiedot.map((urheilijatieto) => (
              <Urheilijatieto
                key={urheilijatieto.id}
                urheilijatieto={urheilijatieto}
              />
            ))
          : null}
      </React.Fragment>
    </>
  );
};
export default Urheilijatiedot;
