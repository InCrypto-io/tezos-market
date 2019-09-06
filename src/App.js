import React from 'react';
import './App.css';
import WalletTest from "./WalletTest";
import ConseilJS from "./ConseilJS";
import WalletServiceTest from "./WalletServiceTest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <WalletTest></WalletTest>
          <ConseilJS></ConseilJS>
          <WalletServiceTest></WalletServiceTest>
      </header>
    </div>
  );
}

export default App;
