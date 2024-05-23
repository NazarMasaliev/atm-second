import React, { useState } from 'react';


const initialDenominations = {
  200: 20,
  500: 10,
  1000: 5,
};

const Main = () => {
  const [balance, setBalance] = useState(
    Object.keys(initialDenominations).reduce(
      (acc, denom) => acc + denom * initialDenominations[denom],
      0
    )
  );
  const [denominations, setDenominations] = useState(initialDenominations);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    const result = withdraw(amount);
    if (result.success) {
      setBalance(balance - amount);
      setDenominations(result.newDenominations);
      setMessage(`Successfully withdrew ${amount} soms.`);
    } else {
      setMessage('Insufficient funds or denominations to fulfill the request.');
    }
  };

  const withdraw = (amount) => {
    let remainingAmount = amount;
    const newDenominations = { ...denominations };
    const usedDenominations = {};

    const denomValues = Object.keys(newDenominations)
      .map(Number)
      .sort((a, b) => b - a);

    for (let denom of denomValues) {
      if (remainingAmount >= denom && newDenominations[denom] > 0) {
        const needed = Math.floor(remainingAmount / denom);
        const used = Math.min(needed, newDenominations[denom]);
        remainingAmount -= used * denom;
        newDenominations[denom] -= used;
        usedDenominations[denom] = used;
      }
    }

    if (remainingAmount === 0) {
      return { success: true, newDenominations };
    } else {
      return { success: false };
    }
  };

  return (
    <div className="App">
      <h1>ATM</h1>
      <p>Balance: {balance} soms</p>
      <div>
        <h2>Withdraw Money</h2>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button onClick={handleWithdraw}>Withdraw</button>
        <p>{message}</p>
      </div>
      <div>
        <h2>Denominations</h2>
        {Object.keys(denominations).map((denom) => (
          <p key={denom}>
            {denom} soms: {denominations[denom]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Main;