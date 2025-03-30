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

        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p>support@taskmanager.com</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+213 677790905</p>
            </div>
            <div className="contact-item">
              <h3>Address</h3>
              <p>
                378 ainzebda
                <br />
                ainoussara, djelfa
              </p>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send us a message</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>WiW © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Homepage;
