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
import EditUserPage from './pages/EditUserPage';
import ProductManagement from './pages/ProductManagement';
import AddProductPage from './pages/AddProductPage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPage from './pages/PrivacyPage';
import ProductReviewPage from './pages/ProductReviewPage';
import AdminAboutPage from './pages/AdminAboutPage';
import AboutPage from './pages/AboutPage';

// Main app component with routing
function App() {
  return (
    <Router>
      <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Homepage />} />
              <Route path="/content" element={<ContentPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/product/:id" element={<ProductInfoPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/product/:id/reviews" element={<ProductReviewPage />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/about" element={<AdminAboutPage />} />
              <Route path="/admin/users" element={<UserDetails />} />
              <Route path="/admin/users/edit/:userId" element={<EditUserPage />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/products/add" element={<AddProductPage />} />
              <Route path="/admin/products/edit/:productId" element={<AddProductPage />} />
              
              {/* User routes */}
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <Footer />
      </div>
    </Router>
  );
}

export default App;

