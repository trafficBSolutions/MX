import Header from '../components/headerviews/HeaderDrop';
import '../css/headerfooter.css';
import '../css/portfolio.css';

const Portfolio = () => {
  return (
    <div>
      <Header />
      <main className="portfolio-main">
        {/* Hero */}
        <section className="portfolio-hero">
          <h1>MX Systems</h1>
          <p>Professional MERN Stack Web Development for Modern Businesses</p>
        </section>

        {/* Services */}
        <section className="portfolio-section">
          <h2>Our Services</h2>
          <div className="portfolio-services-grid">
            {[
              { icon: '📅', title: 'Appointment Scheduling', desc: 'Let your customers book appointments 24/7 with an intuitive scheduling system. Automated reminders and calendar integration included.' },
              { icon: '📝', title: 'Request Management', desc: 'Streamline customer requests with a powerful submission system. Track, manage, and respond to all inquiries from one dashboard.' },
              { icon: '💬', title: 'Contact & Communication', desc: 'Professional contact forms with instant notifications. Keep all customer communications organized and accessible.' },
              { icon: '📊', title: 'Records & Analytics', desc: 'Access detailed records of all submissions and interactions. Make data-driven decisions with built-in analytics.' },
              { icon: '🔐', title: 'Secure Authentication', desc: 'Enterprise-grade security with user authentication, role-based access, and data encryption for peace of mind.' },
              { icon: '📱', title: 'Mobile Responsive', desc: 'Your website will look perfect on any device. Fully responsive design ensures great user experience everywhere.' },
            ].map((s, i) => (
              <div className="portfolio-service-card" key={i}>
                <div className="portfolio-service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="portfolio-section portfolio-features-bg">
          <h2>Why Choose Us?</h2>
          <div className="portfolio-features-grid">
            {[
              { icon: '⚡', title: 'Fast Performance', desc: 'Lightning-fast load times with optimized code and modern architecture' },
              { icon: '🎨', title: 'Custom Design', desc: 'Tailored designs that match your brand identity and business goals' },
              { icon: '🔄', title: 'Real-time Updates', desc: 'Live data synchronization for instant updates across all devices' },
              { icon: '🛠️', title: 'Easy Management', desc: 'Intuitive admin panels to manage your content without technical knowledge' },
            ].map((f, i) => (
              <div className="portfolio-feature-item" key={i}>
                <h3>{f.icon} {f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="portfolio-section">
          <h2>Built with Modern Technology</h2>
          <div className="portfolio-tech-logos">
            {[
              { letter: 'M', name: 'MongoDB' },
              { letter: 'E', name: 'Express.js' },
              { letter: 'R', name: 'React' },
              { letter: 'N', name: 'Node.js' },
            ].map((t, i) => (
              <div className="portfolio-tech-item" key={i}>
                <h3>{t.letter}</h3>
                <p>{t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Projects */}
        <section className="portfolio-section portfolio-projects-bg">
          <h2>Our Portfolio</h2>
          <p className="portfolio-subtitle">Check out some of the websites we've built</p>
          <div className="portfolio-projects-grid">
            {[
              { icon: '🤝', title: 'Direct Connection', desc: 'Business networking platform with member directory', url: 'https://www.directconnectiondc.com' },
              { icon: '🚧', title: 'Traffic & Barrier Solutions, LLC', desc: 'Traffic Control website with online scheduling and record viewing', url: 'https://www.trafficbarriersolutions.com' },
              { icon: '🏗️', title: 'Skyline Builders GA, LLC', desc: 'Construction company website with project gallery and service inquiries', url: 'https://www.skylinebuildersgallc.com' },
              { icon: '🚗', title: 'High Visibility Detailing', desc: 'Professional auto detailing service with online booking', url: 'https://www.highvisibilitydetailing.com' },
            ].map((p, i) => (
              <div className="portfolio-project-card" key={i}>
                <div className="portfolio-project-icon">{p.icon}</div>
                <div className="portfolio-project-content">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="portfolio-project-link">Visit Website →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="portfolio-cta">
          <h2>Ready to Transform Your Business?</h2>
          <p>Let's build something amazing together</p>
          <a className="portfolio-cta-button" href="/new-website">Start Your Website</a>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
