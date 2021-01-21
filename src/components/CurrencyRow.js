import React from 'react';

export default function CurrencyRow({ selectOptions, selectedCurrency, handleCurrencyChange, amount, handleAmountChange }) {
  return (
    <div>
      <input type="number" className="input" value={amount} onChange={handleAmountChange} />

      <select value={selectedCurrency} onChange={handleCurrencyChange}>
        {selectOptions.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  )
}
