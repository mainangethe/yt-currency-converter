import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';
import { BASE_URL } from './constants/urls';


function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [fromCurrencyAmount, setFromCurrencyAmount] = useState(true);

  const retrieveExchangeRates = () => {
    fetch(`${BASE_URL}?base=USD`)
      .then(res => res.json())
      .then(data => {
        const otherCurrencies = Object.keys(data.rates).sort();
        const baseCurrency = data.base;
        const first = otherCurrencies[0]
        setCurrencyOptions([baseCurrency, ...otherCurrencies]);
        setFromCurrency(baseCurrency);
        setToCurrency(first);
        setExchangeRate(data.rates[first]);
      }) 
      .catch(e => console.error(e.message))
  }

  const updateExchangeRates = () => {
    if (fromCurrency !== null && toCurrency !== null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
        .catch(e => console.error(e.message))
      }
  }

  useEffect(retrieveExchangeRates, []);
  useEffect(updateExchangeRates, [fromCurrency, toCurrency]);

  const fromCurrencyChange = e => setFromCurrency(e.target.value)
  const toCurrencyChange = e => setToCurrency(e.target.value)

  let toAmount, fromAmount;

  if (fromCurrencyAmount) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(3);
  }

  const fromAmountChange = e => {
    setAmount(e.target.value);
    setFromCurrencyAmount(true);
  }

  const toAmountChange = e => {
    setAmount(e.target.value);
    setFromCurrencyAmount(false);
  }

  return (
    <>
      <h1>Convert</h1>

      <CurrencyRow
        selectOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        handleCurrencyChange={fromCurrencyChange}
        amount={fromAmount}
        handleAmountChange={fromAmountChange}
      />

      <div className="equals">=</div>

      <CurrencyRow
        selectOptions={currencyOptions}
        selectedCurrency={toCurrency}
        handleCurrencyChange={toCurrencyChange}
        amount={toAmount}
        handleAmountChange={toAmountChange}
      />
    </>
  );
}

export default App;
