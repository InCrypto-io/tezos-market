import React from 'react';
import './App.css';
import WalletServiceTest from "./WalletServiceTest";
import NFTTest from "./NFTTest";
import Home from "./components/home"
import WalletServiceTestMarket from "./WalletServiceTestMarket";
import ServiceTest from "./StorageTest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          {/* <NFTTest></NFTTest> */}
          {/* <ServiceTest></ServiceTest>*/}
          {/* <WalletServiceTest></WalletServiceTest>*/}
          {/*<WalletServiceTestMarket></WalletServiceTestMarket>*/}
          <Home/>
      </header>
    </div>
  );
}

export default App;
