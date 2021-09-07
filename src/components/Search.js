import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {

    const [register, setRegister] = useState([]);

    useEffect(() => {
        // axios.get('https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json')
        axios.get('https://altinodantas.github.io/checkmark/data/dados.json')
        .then((response) => {
            setRegister(response.data);
        });
    }, []);

    return (
        <Fragment>
            <main>
                <input type="text" id="registration" name="registration" className="Registration" maxLength='5'></input>
                <p>Digite o prefixo da aeronave</p>
            </main>
            <div className="Result">
                <div className="Card">
                    {register.filter(nome => nome.MARCA === 'PREAJ').map((nome, index) => (
                        <p key={index}>{nome.PROPRIETARIO}</p>
                    ))}   
                </div> 
            </div>
        </Fragment>
    )
}

export default Search;