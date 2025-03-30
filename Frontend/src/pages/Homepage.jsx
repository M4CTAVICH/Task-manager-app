import React from "react";
import "./homepage.css";

const Homepage = ({ onNavigate }) => {
  return (
    <div className="homepage">
      <header className="navbar">
        <nav className="navbar">
          <div className="nav-links">
            <a href="#features">Features</a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("about");
              }}
            >
              About
            </a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1>Manage your tasks Efficiently</h1>
          <p className="hero-text">
            Stay organized, boost productivity, and never miss a deadline
          </p>
          <button className="cta-button" onClick={() => onNavigate("tasklist")}>
            Get started
          </button>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Key features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Task Organization</h3>
            <p>Keep your tasks organized and prioritized</p>
          </div>
          <div className="feature-card">
            <h3>Progress Tracking</h3>
            <p>Monitor your progress in real-time</p>
          </div>
          <div className="feature-card">
            <h3>Collaboration</h3>
            <p>Work together with your team seamlessly</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Get In Touch</h2>
        <p>Have questions? Reach out to us!</p>
      </section>

      <footer className="footer">
        <p>WiW © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Homepage;
