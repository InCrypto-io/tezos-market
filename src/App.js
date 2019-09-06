import React from 'react';
import './App.css';
import WalletServiceTest from "./WalletServiceTest";
import NFTTest from "./NFTTest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <NFTTest></NFTTest>
          <WalletServiceTest></WalletServiceTest>
      </header>
    </div>
  );
}

export default App;
