import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

class CurrencyCalculator extends React.Component {
    
    handleCurrencies = () => {

        fetch('http://api.nbp.pl/api/exchangerates/tables/a', {
        headers : {
            'Accept' : 'application/json'
        }})
        .then( response => {
            if (response.ok)
                return response.json();
            else
                throw new Error ('Wystąpił błąd');
            })
        .then( data  => {
            console.log(data);

            let todaysRates = data[0].rates;

            console.log(todaysRates);

            // console.log( data[0].effectiveDate );
            // console.log( data[0].no );
            // console.log ( data[0].rates );
        })
        .catch( error => {
            console.log( error )
        });
    };


    render(){
        return (
            <div>
                <h1>Konwerter walutowy</h1>
                <button onClick={this.handleCurrencies}>Pokaż waluty</button>
                <form>
                    <fieldset>
                        <legend>Waluta którą chcesz sprzedać</legend>
                        <p>Wybierz walutę:</p>
                        <select>
                            <option></option>
                        </select>
                        <br/>
                        <label>Ile chcesz sprzedać?
                            <input type='number'/>
                        </label>
                        <br/>
                        <span>Aktualny kurs waluty to: </span>
                    </fieldset>
                    <fieldset>
                        <legend>Waluta którą chcesz kupić</legend>
                        <p>Wybierz walutę:</p>
                        <select>
                            <option></option>
                        </select>
                        <br/>
                        <label>Ile chcesz kupić?
                            <input type='number'/>
                        </label>
                        <br/>
                        <span>Aktualny kurs waluty to: </span>
                    </fieldset>
                </form>
            </div>
        )
    }
}

class GoldRates extends React.Component {

    handleGold = () => {

        fetch('http://api.nbp.pl/api/cenyzlota', {
        headers : {
            'Accept' : 'application/json'
        }})
        .then( response => {
            if (response.ok)
                return response.json();
            else
                throw new Error ('Wystąpił błąd');
        })
        .then( data  => {
            console.log(data[0].cena + ' zł');
        })
        .catch( error => {
            console.log( error )
        });

    };

    render(){
        return (
            <div>
                <h1>Aktualna cena złota</h1>
                <button onClick={this.handleGold}>Pokaż aktualną cenę złota</button>
                <span></span>
            </div>
        )
    }

}

class App extends React.Component {
    render(){
        return (
            <div>
                <CurrencyCalculator />
                <GoldRates />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});

