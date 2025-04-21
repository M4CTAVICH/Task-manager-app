import React from "react";
import { useState } from "react";
import "./homepage.css";

const Homepage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    message: "",
    isError: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ message: "", isError: false });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          message: "Message sent successfully!",
          isError: false,
        });
      } else {
        setSubmitStatus({
          message: data.error || "Failed to send message.",
          isError: true,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus({
        message: "An error occurred. Please try again later.",
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
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
            {submitStatus.message && (
              <div
                className={`status-message ${
                  submitStatus.isError ? "error" : "success"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
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
