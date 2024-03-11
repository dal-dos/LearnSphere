// Home.tsx
import React from "react";
import "./Home.css"; // Ensure CSS is properly linked

function Home() {
  return (
    <div>
      {/* Main Hero Section */}
      <section className="hero main-hero">
        <div className="container">
          <h1>Welcome to LearnSphere</h1>
          <p>Explore a world of knowledge and enhance your learning experience with LearnSphere. We provide a variety of courses and resources to help you achieve your educational goals. Start your learning journey with us today!</p>
          <button className="hero-cta">Explore Courses</button>
        </div>
      </section>
      
      {/* Featured Courses Section */}
      <section className="hero featured-courses">
        <div className="container">
          <h2>Featured Courses</h2>
          <p>Jumpstart your learning with our most popular courses.</p>
          {/* Placeholders for actual course listings */}
          <div className="courses-list">
            <div>Course 1</div>
            <div>Course 2</div>
            <div>Course 3</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="hero testimonials">
        <div className="container">
          <h2>What Our Students Say</h2>
          {/* Placeholder for actual testimonials */}
          <p>"Learning on LearnSphere has been a transformative experience for me!" - Student</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="hero cta-signup">
        <div className="container">
          <h2>Join LearnSphere Today</h2>
          <p>Sign up now to start your learning journey with unlimited access to the best courses.</p>
          <button className="hero-cta">Sign Up</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
