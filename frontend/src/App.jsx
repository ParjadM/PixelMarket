import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Homepage from './components/Homepage.jsx';
import ContentPage from './pages/ContentPage.jsx';

// 1. Import the new authentication pages
import SignInPage from './pages/SignInPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ContactPage from './pages/ContactPage';
import ProductInfoPage from './pages/ProductInfoPage';

// Header styles now use CSS Modules inside the component

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* The div below seems to be from an older layout, we can simplify */}
        {/* <div className="page-surface"> */}
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/content" element={<ContentPage />} />
              
              {/* 2. Add the routes for the new pages */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product/:id" element={<ProductInfoPage />} />
            </Routes>
          </main>
          <Footer />
        {/* </div> */}
      </div>
    </Router>
  );
}

export default App;

