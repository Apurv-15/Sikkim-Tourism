import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-sky">
      <Navbar />
      <main>
        {children}
      </main>
      
      {/* Floating background elements */}
      <div className="fixed top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-pulse pointer-events-none"></div>
      <div className="fixed top-40 right-20 w-3 h-3 bg-accent/30 rounded-full animate-pulse delay-1000 pointer-events-none"></div>
      <div className="fixed bottom-20 left-20 w-2 h-2 bg-primary-glow/30 rounded-full animate-pulse delay-2000 pointer-events-none"></div>
      <div className="fixed bottom-40 right-10 w-1 h-1 bg-primary/40 rounded-full animate-pulse delay-3000 pointer-events-none"></div>
    </div>
  );
};

export default Layout;