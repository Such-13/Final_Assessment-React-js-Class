import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, QrCode, Globe, LifeBuoy } from 'lucide-react';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/pnb-logo.png" alt="PNB" />
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/transactions" className="nav-item">
            <FileText size={20} /> <span>Transaction Reports</span>
          </NavLink>
          <NavLink to="/qr-details" className="nav-item">
            <QrCode size={20} /> <span>QR Details</span>
          </NavLink>
          <NavLink to="/language-update" className="nav-item">
            <Globe size={20} /> <span>Language Update</span>
          </NavLink>
          <NavLink to="/support" className="nav-item">
            <LifeBuoy size={20} /> <span>Help & Support</span>
          </NavLink>
        </nav>
      </aside>

      {/* RIGHT SIDE CONTENT */}
      <main className="main-wrapper">
        <header className="top-header">
          <div className="menu-toggle">☰</div>
          <div className="user-info">
            <span className="user-name">Stebin Ben</span>
            <img src="/avatar.png" className="avatar" alt="User" />
          </div>
        </header>
        
        <section className="content-area">
          <Outlet /> {/* This is where the Dashboard/Reports will appear */}
        </section>
      </main>
    </div>
  );
};

export default MainLayout;