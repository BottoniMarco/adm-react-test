import React from "react";
import "./Modal.css";

function Modal({closeModal, planetSpec}) {
    return (

        <div className="modalBackground">
            <div className="modalContainer">
                <h1>Planet Specs</h1>
                <div className="body">
                <ul>
                    <li>Name: {planetSpec.name}</li>
                    <li>Diameter: {planetSpec.diameter}</li>
                    <li>Climate: {planetSpec.climate}</li>
                    <li>Population: {planetSpec.population}</li>
                </ul>
                </div>
                <div className="footer">
                    <button onClick={() => closeModal(false)} id="cancelBtn">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;