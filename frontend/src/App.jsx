import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Homepage from './components/Homepage.jsx'; 
import ContentPage from './pages/ContentPage.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="page-surface">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/content" element={<ContentPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

