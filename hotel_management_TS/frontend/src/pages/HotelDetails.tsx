import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, Car, Shield, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const mockHotels: any = {
  '1': { id: '1', name: 'Grand Plaza Resort', location: 'New York, USA', rating: 4.8, price: 299, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3', description: 'Experience luxury in the heart of the city.', rooms: [{id: 'r1', type: 'Deluxe Queen', price: 299}, {id: 'r2', type: 'Presidential Suite', price: 899}] },
  '2': { id: '2', name: 'Oceanview Retreat', location: 'Maldives', rating: 4.9, price: 450, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3', description: 'Crystal clear waters await.', rooms: [{id: 'r3', type: 'Water Villa', price: 450}] },
};

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const hotel = id ? mockHotels[id] : null;

  if (!hotel) {
    return <div className="container main-content">Hotel not found</div>;
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please login to book a room.");
      navigate('/login');
      return;
    }
    alert(`Booking confirmed for ${hotel.name}!`);
    navigate('/dashboard');
  };

  return (
    <div>
      <div style={{ height: '50vh', background: `linear-gradient(rgba(15, 23, 42, 0.4), var(--bg-color)), url("${hotel.image}") center/cover` }}></div>
      <div className="container main-content" style={{ marginTop: '-100px', position: 'relative', zIndex: 10 }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>
          
          {/* Main Info */}
          <div>
            <div className="glass-card animate-fade-in" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{hotel.name}</h1>
                  <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}>
                    <MapPin size={18} style={{ marginRight: '0.5rem' }} /> {hotel.location}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--secondary-color)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '1.2rem', fontWeight: 600 }}>
                    <Star size={20} style={{ marginRight: '0.5rem' }} fill="currentColor" /> {hotel.rating}
                  </div>
                  <div style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>(124 reviews)</div>
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>About this property</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{hotel.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Amenities</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Wifi size={18} className="text-primary" /> Free High-Speed WiFi</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Coffee size={18} className="text-primary" /> Complimentary Breakfast</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Car size={18} className="text-primary" /> Free Parking</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Shield size={18} className="text-primary" /> 24/7 Security</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div>
            <div className="glass-card animate-fade-in animate-delay-1" style={{ position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Reserve Your Stay</h3>
              <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', display: 'flex', alignItems: 'baseline' }}>
                ${hotel.price} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>/ night</span>
              </div>

              <form onSubmit={handleBooking}>
                <div className="form-group">
                  <label className="form-label">Check-in Date</label>
                  <input type="date" className="form-control" required value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Check-out Date</label>
                  <input type="date" className="form-control" required value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Select Room</label>
                  <select className="form-control" required value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
                    <option value="" disabled>Choose a room type</option>
                    {hotel.rooms.map((room: any) => (
                      <option key={room.id} value={room.id}>{room.type} - ${room.price}</option>
                    ))}
                  </select>
                </div>

                <ul style={{ margin: '1.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>$299 x 3 nights</span> <span>$897.00</span></li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>Taxes & Fees</span> <span>$89.70</span></li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem', marginTop: '0.5rem', color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}><span>Total</span> <span>$986.70</span></li>
                </ul>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Check size={18} /> Reserve Now
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
