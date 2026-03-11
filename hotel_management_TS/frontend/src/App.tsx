import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import HotelDetails from './pages/HotelDetails';
import Contact from './pages/Contact';

const NotFound = () => <div className="container main-content" style={{textAlign: 'center', paddingTop: '10vh'}}>
  <h1 style={{fontSize: '5rem', color: 'var(--primary-color)'}}>404</h1>
  <h2>Page Not Found</h2>
  <p style={{color: 'var(--text-muted)', marginTop: '1rem'}}>The page you are looking for doesn't exist.</p>
</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* Footer will go here */}
      </Router>
    </AuthProvider>
  );
}

export default App;
