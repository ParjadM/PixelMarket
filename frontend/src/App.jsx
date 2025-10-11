import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Homepage from './components/Homepage.jsx';
import ContentPage from './pages/ContentPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ContactPage from './pages/ContactPage';
import ProductInfoPage from './pages/ProductInfoPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDetails from './pages/UserDetails';
import ProductManagement from './pages/ProductManagement';


function App() {
  return (
    <Router>
      <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/content" element={<ContentPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product/:id" element={<ProductInfoPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserDetails />} />
              <Route path="/admin/products" element={<ProductManagement />} />
            </Routes>
          </main>
          <Footer />
      </div>
    </Router>
  );
}

export default App;

