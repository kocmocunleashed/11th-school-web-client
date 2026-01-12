"use client";

import { useEffect, useRef } from "react";

export default function AboutPage() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Auto-scroll to footer when page loads
    const timer = setTimeout(() => {
      // Find the footer element by tag name
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        footerElement.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      } else {
        // Alternative: scroll to bottom of the page
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 500); // Small delay to ensure footer is loaded

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-primary">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-yellow-400 mb-8">
          About Us
        </h1>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* School Introduction */}
          <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Our School</h2>
            <p className="text-white text-lg leading-relaxed mb-6">
              Welcome to 11th School, a place where academic excellence meets character development. Founded in 1940, our school has been a beacon of quality education for over 85 years, nurturing generations of successful students.
            </p>
            <p className="text-white text-lg leading-relaxed">
              We are committed to providing a comprehensive education that prepares students for the challenges of tomorrow. Our dedicated faculty, modern facilities, and innovative curriculum create an environment where every student can thrive.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Our Mission</h3>
              <p className="text-white">
                To provide quality education that empowers students to achieve their full potential, fostering intellectual curiosity, critical thinking, and moral integrity.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Our Vision</h3>
              <p className="text-white">
                To be recognized as a leading educational institution that produces confident, compassionate, and competent leaders who contribute positively to society.
              </p>
            </div>
          </section>

          {/* Core Values */}
          <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-6 text-center">Core Values</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Knowledge</h4>
                <p className="text-white">Pursuing academic excellence</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🤝</div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Integrity</h4>
                <p className="text-white">Building character with honesty</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌟</div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Excellence</h4>
                <p className="text-white">Striving for the highest standards</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🤗</div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Compassion</h4>
                <p className="text-white">Caring for our community</p>
              </div>
            </div>
          </section>

          {/* History & Achievements */}
          <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Our Legacy</h2>
            <p className="text-white text-lg leading-relaxed mb-6">
              Since our establishment in 1940, we have maintained a proud tradition of academic excellence, community service, and innovation. Our alumni include leaders in various fields who continue to make significant contributions to society.
            </p>
            <p className="text-white text-lg leading-relaxed">
              Today, we continue to evolve and adapt, incorporating modern teaching methods and technology while preserving the timeless values that have defined our institution for decades.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">School Address</h4>
                <p className="text-white mb-2">[School Address Here]</p>
                <p className="text-white mb-2">Phone: [Phone Number]</p>
                <p className="text-white">Email: [Email Address]</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">School Hours</h4>
                <p className="text-white mb-2">Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p className="text-white mb-2">Saturday: 9:00 AM - 2:00 PM</p>
                <p className="text-white">Sunday: Closed</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div id="about-footer-space" className="h-0" />
    </div>
  );
}
