import React from "react";
import "./about.css";

const Aboutpage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Our Task Manager</h1>

        <section className="about-section">
          <h2>Our Mission</h2>
          <div className="mission-box">
            <p>
              "I believe that this kind of App is to simplify and facilitate the
              life of a Team Manager and make things more organized."
            </p>
          </div>
          <p>
            Staying organized is more important than ever. Our task management
            solution brings simplicity and clarity to your work, helping you
            prioritize what matters and collaborate effectively with your team.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            From the nought I had the idea to make team Managers' lives easier,
            so I set out to create a simple, intuitive task manager that helps
            them stay organized without droping a sweat.
          </p>
          <p>
            What started as a small side project 1 month ago , it has grown into
            a comprehensive solution used by teams around the world to manage
            their daily duties.
          </p>

          <div className="timeline">
            <div className="timeline-item timeline-left">
              <div className="timeline-content">
                <h3>february</h3>
                <p>
                  Initial concept developed to solve our own productivity
                  challenges
                </p>
              </div>
            </div>
            <div className="timeline-item timeline-right">
              <div className="timeline-content">
                <h3>March</h3>
                <p>
                  Expanded with collaboration tools and performance improvements
                </p>
              </div>
            </div>
            <div className="timeline-item timeline-left">
              <div className="timeline-content">
                <h3>April</h3>
                <p>
                  Reached milestone of helping thousands of teams manage their
                  tasks effectively
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>

          <div className="values-container">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Simplicity</h3>
              <p>
                compexity is the worst enemy and we got rid of it , now you can
                focus on what matters the most.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>
                communication might be the greatest tool god gave us , great
                teams make great projects.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Productivity</h3>
              <p>
                Time is gold and here you can manage it like a Pro , no more
                wasting it.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🔍</div>
              <h3>Transparency</h3>
              <p>discipline makes whole and progress keeps everyone aligned.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            A passionate group of developers, designers, and productivity
            enthusiasts committed to building tools that makes work more
            enjoyable and efficient.
          </p>

          <div className="team-grid">
            <div className="team-member">
              <img
                src="././src/assets/wiw.png"
                alt="Team Member"
                className="team-photo"
              />
              <h3>Mactavich</h3>
              <p>founder of the App</p>
              <p>Full-stack developer with a passion for optimizing.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Aboutpage;
