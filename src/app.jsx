import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

class CurrencyCalculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rates: []
        }
    }

    checkCurrencies = () => {

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
            // this.setState = ({
            //     rates: data[0].rates.code
            // })

            console.log("Wynik", data[0].rates);

            // let todaysRates = data[0].rates;
            //
            // data[0].rates.forEach((e,i) => {
            //     return <span key={i}>{e}</span>
            // });

            // console.log( data[0].effectiveDate );
            // console.log( data[0].no );
            // console.log ( data[0].rates );
        })
        .catch( error => {
            console.log( error )
        });
    };


    render(){

        let currencyCodes = this.state.rates.forEach((e,i) => {
           return (
               <option key={i}>{e.code}</option>
           )
        });

        console.log('Kody walut: ' + currencyCodes);

        return (
            <div>
                <h1>Konwerter walutowy</h1>
                <button onClick={this.checkCurrencies}>Pokaż waluty</button>
                <form>
                    <fieldset>
                        <legend>Waluta którą chcesz sprzedać</legend>
                        <p>Wybierz walutę:</p>
                        <select>
                            {currencyCodes}
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

    constructor(props) {
        super(props)
    }

    checkGold = () => {

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
                <button onClick={this.checkGold}>Pokaż aktualną cenę złota</button>
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

