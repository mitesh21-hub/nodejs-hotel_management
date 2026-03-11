import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, CreditCard, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div className="container main-content">Loading...</div>;
  }

  const mockBookings = [
    { id: '101', hotel: 'Grand Plaza Resort', checkIn: '2024-05-15', checkOut: '2024-05-20', status: 'Confirmed', total: 1495 },
    { id: '102', hotel: 'Alpine Lodge', checkIn: '2023-12-10', checkOut: '2023-12-15', status: 'Completed', total: 900 }
  ];

  return (
    <div className="container main-content">
      <div className="page-header animate-fade-in" style={{ textAlign: 'left', marginTop: '2rem' }}>
        <h1 className="page-title">Welcome back, {user.name.split(' ')[0]}</h1>
        <p className="page-subtitle">Manage your account and bookings</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-card animate-fade-in animate-delay-1" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'var(--primary-color)' }}>
            <Calendar size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>2</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Active Bookings</p>
          </div>
        </div>
        
        <div className="glass-card animate-fade-in animate-delay-2" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'var(--secondary-color)' }}>
            <CreditCard size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>$0.00</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Balance Due</p>
          </div>
        </div>

        <div className="glass-card animate-fade-in animate-delay-3" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#a855f7' }}>
            <User size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.2rem 0' }}>Profile</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{user.email}</p>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }} className="animate-fade-in">Recent Bookings</h2>
      
      <div className="glass-card animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>ID</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Hotel</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Check In</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Check Out</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {mockBookings.map((booking) => (
              <tr key={booking.id} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '1.2rem 1.5rem' }}>#{booking.id}</td>
                <td style={{ padding: '1.2rem 1.5rem', fontWeight: 500 }}>{booking.hotel}</td>
                <td style={{ padding: '1.2rem 1.5rem' }}>{booking.checkIn}</td>
                <td style={{ padding: '1.2rem 1.5rem' }}>{booking.checkOut}</td>
                <td style={{ padding: '1.2rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '50px', 
                    fontSize: '0.85rem',
                    background: booking.status === 'Confirmed' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: booking.status === 'Confirmed' ? 'var(--primary-color)' : 'var(--secondary-color)'
                  }}>
                    {booking.status}
                  </span>
                </td>
                <td style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>${booking.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
