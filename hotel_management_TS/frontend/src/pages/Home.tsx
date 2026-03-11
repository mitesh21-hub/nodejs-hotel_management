import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MapPin } from 'lucide-react';

const mockHotels = [
  { id: '1', name: 'Grand Plaza Resort', location: 'New York, USA', rating: 4.8, price: 299, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
  { id: '2', name: 'Oceanview Retreat', location: 'Maldives', rating: 4.9, price: 450, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
  { id: '3', name: 'Alpine Lodge', location: 'Swiss Alps', rating: 4.7, price: 180, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }
];

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        height: '80vh', 
        background: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url("https://images.unsplash.com/photo-1542314831-c6a4d14d8373?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80") center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 1.5rem'
      }}>
        <div style={{ maxWidth: '800px' }} className="animate-fade-in">
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Find Your Perfect Stay
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            Discover and book premium hotels around the world with exclusive deals.
          </p>
          
          {/* Search Bar */}
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', background: 'var(--surface-light)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem' }}>
              <MapPin size={20} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
              <input type="text" placeholder="Where are you going?" style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', fontSize: '1rem' }} />
            </div>
            <button className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
              <Search size={20} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="container" style={{ padding: '5rem 1.5rem' }}>
        <div className="page-header animate-fade-in">
          <h2 className="page-title" style={{ fontSize: '2.5rem' }}>Featured Destinations</h2>
          <p className="page-subtitle">Hand-picked hotels for your next adventure</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {mockHotels.map((hotel, index) => (
            <div key={hotel.id} className={`glass-card animate-fade-in animate-delay-${index + 1}`} style={{ padding: 0, overflow: 'hidden', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ height: '220px', background: `url(${hotel.image}) center/cover` }}></div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{hotel.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--secondary-color)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <Star size={14} style={{ marginRight: '0.2rem' }} fill="currentColor" /> {hotel.rating}
                  </div>
                </div>
                <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  <MapPin size={16} style={{ marginRight: '0.3rem' }} /> {hotel.location}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>${hotel.price}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}> / night</span>
                  </div>
                  <Link to={`/hotel/${hotel.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
