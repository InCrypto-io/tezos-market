import React from 'react';
import './App.css';
import WalletServiceTest from "./WalletServiceTest";
import NFTTest from "./NFTTest";
import Home from "./components/home"

function App() {
  return (
    <div className="App">
      <header className="App-header">
          {/* <NFTTest></NFTTest> */}
          {/* <WalletServiceTest></WalletServiceTest> */}
          <Home/>
      </header>
    </div>
  );
}

export default App;
