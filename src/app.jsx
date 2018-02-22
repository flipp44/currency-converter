import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

fetch('http://api.nbp.pl/api/exchangerates/tables/A/', {
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
        console.log( data )
    })
    .catch( error => {
        console.log( error )
    });




class App extends React.Component {
    render(){
        return (
            <h1>Konwerter walutowy</h1>
        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});

