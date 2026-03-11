import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending message...');
    setTimeout(() => {
      setStatus('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="container main-content" style={{ display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - var(--navbar-height))' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', width: '100%', alignItems: 'center' }}>
        
        <div className="animate-fade-in">
          <h1 className="page-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>Get in Touch</h1>
          <p className="page-subtitle" style={{ marginBottom: '3rem' }}>Have any questions or need assistance? Our support team is here to help you 24/7.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary-color)', padding: '1rem', borderRadius: '50%' }}>
                <MapPin size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Address</h3>
                <p style={{ color: 'var(--text-muted)' }}>123 Luxury Avenue, Suite 100<br/>New York, NY 10001, USA</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--secondary-color)', padding: '1rem', borderRadius: '50%' }}>
                <Phone size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Phone</h3>
                <p style={{ color: 'var(--text-muted)' }}>+1 (800) 123-4567<br/>+1 (800) 987-6543</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', padding: '1rem', borderRadius: '50%' }}>
                <Mail size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Email</h3>
                <p style={{ color: 'var(--text-muted)' }}>support@luxestays.com<br/>info@luxestays.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card animate-fade-in animate-delay-2">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Send us a message</h2>
          
          {status && <div style={{ padding: '1rem', background: status.includes('Sending') ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: status.includes('Sending') ? 'var(--primary-color)' : 'var(--secondary-color)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>{status}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows={5} placeholder="How can we help you?" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
