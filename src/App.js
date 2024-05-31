import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Decryptor from "./components/Decrypter/Decrypter";
import Encrypter from "./components/Encrypter/Encrypter";
import TextareaSha256 from "./components/TextareaSha256/TextareaSha256";
import Wallet from "./components/Wallet/Wallet";
import WebList from "./components/WebList/WebList";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
          <Header/>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="encrypter" element={<Encrypter />} />
            <Route path="decrypter" element={<Decryptor />} />
            <Route path="weblist" element={<WebList />} />
            <Route path="sha256" element={<TextareaSha256 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
