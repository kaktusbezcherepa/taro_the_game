import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainPage from "./pages/MainPage/MainPage";
import MainGame from "./pages/MainGame/MainGame";
import FindYourFate from "./pages/FindYourFate/FindYourFate";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="/MainGame" element={<MainGame />} />
        <Route path="/FindYourFate" element={<FindYourFate />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;