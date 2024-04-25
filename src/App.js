import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import Home from "./component/Home";
import About from "./component/About";
import Pnf from "./component/pnf";
import "./App.css"
import Tracks from "./component/Tracks";


function App() {
  return (
    <BrowserRouter>
      <Menu/>

      <Routes>
          {/* router provider */}
          <Route path={`/`} element={<Home/>}/>
          <Route path={`/about`} element={<About/>}/>
          <Route path={`/tracks/:aId`} element={<Tracks/>}/>
          <Route path={`/*`} element={<Pnf/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
