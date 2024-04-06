import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Header } from "./styles/global-style";
import Favorites from "./pages/Favorites/Favorites";
import NavBar from "./components/Tabs/Tabs";
import DarkModeSwitcheButton from "./components/DarkModeSwitcheButton/DarkModeSwitcheButton";
import "./App.css";

const App: React.FC = () => {
  const [firstVisitInApp, setFirstVisitInApp] = useState<boolean>(false);

  return (
    <div>
      <Header>
        <DarkModeSwitcheButton />
        <NavBar />
      </Header>
      <Routes>
        <Route>
          <Route
            path="/"
            element={
              <Home
                firstVisitInApp={firstVisitInApp}
                setFirstVisitInApp={setFirstVisitInApp}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
