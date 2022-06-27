import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Glowup from './Components/Glowup/Glowup';
import GlowupThankyou from './Components/Glowup/GlowupThankyou';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
          <Routes>
            <Route path="/glowup" element={<Glowup />} />
            <Route path="/glowup/thankyou" element={<GlowupThankyou />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
