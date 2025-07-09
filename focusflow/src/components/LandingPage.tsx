import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-100 to-white py-16 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Achieve Peak Productivity with FocusFlow</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Streamline your tasks, eliminate distractions, and unlock your full potential with our intuitive task management system.
        </p>
        <a href="#get-started" className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-green-600 transition">Get Started</a>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white text-center" id="features">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">FocusFlow is designed to help you stay organized and focused on what matters most.</p>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Intuitive Task Management</h3>
            <p className="text-gray-600">Easily create, organize, and prioritize your tasks with our user-friendly interface.</p>
          </div>
          <div className="flex-1 bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Time Blocking</h3>
            <p className="text-gray-600">Allocate specific time blocks for each task to maximize efficiency and minimize distractions.</p>
          </div>
          <div className="flex-1 bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
            <p className="text-gray-600">Receive timely reminders to stay on track and never miss a deadline.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50 text-center" id="testimonials">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Testimonials</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic mb-4">"FocusFlow has completely transformed my workflow. I'm more organized and productive than ever before!"</p>
            <div className="font-semibold text-green-700">Sophia Carter</div>
            <div className="text-xs text-gray-400">2023-08-15</div>
          </div>
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic mb-4">"A solid task management tool with a clean interface. The time blocking feature is a game-changer."</p>
            <div className="font-semibold text-green-700">Ethan Bennett</div>
            <div className="text-xs text-gray-400">2023-09-22</div>
          </div>
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic mb-4">"I love the smart reminders! They help me stay on top of my tasks without feeling overwhelmed."</p>
            <div className="font-semibold text-green-700">Olivia Hayes</div>
            <div className="text-xs text-gray-400">2023-10-10</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white text-center" id="pricing">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Pricing</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 bg-gray-50 p-8 rounded-lg shadow border">
            <div className="text-lg font-semibold mb-2">Basic</div>
            <div className="text-3xl font-bold mb-2">Free</div>
            <div className="text-gray-500 mb-4">/month</div>
            <ul className="text-gray-600 mb-6 text-left list-disc list-inside">
              <li>Unlimited Tasks</li>
              <li>Basic Support</li>
            </ul>
            <a href="#get-started" className="inline-block bg-green-500 text-white px-6 py-2 rounded font-semibold hover:bg-green-600 transition">Get Started</a>
          </div>
          <div className="flex-1 bg-green-100 p-8 rounded-lg shadow border-2 border-green-500 scale-105">
            <div className="text-lg font-semibold mb-2">Pro <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">Most Popular</span></div>
            <div className="text-3xl font-bold mb-2">$9.99</div>
            <div className="text-gray-500 mb-4">/month</div>
            <ul className="text-gray-600 mb-6 text-left list-disc list-inside">
              <li>All Basic Features</li>
              <li>Advanced Analytics</li>
              <li>Priority Support</li>
            </ul>
            <a href="#get-started" className="inline-block bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition">Upgrade</a>
          </div>
          <div className="flex-1 bg-gray-50 p-8 rounded-lg shadow border">
            <div className="text-lg font-semibold mb-2">Team</div>
            <div className="text-3xl font-bold mb-2">$19.99</div>
            <div className="text-gray-500 mb-4">/month</div>
            <ul className="text-gray-600 mb-6 text-left list-disc list-inside">
              <li>All Pro Features</li>
              <li>Team Collaboration</li>
              <li>Dedicated Account Manager</li>
            </ul>
            <a href="#contact" className="inline-block bg-green-500 text-white px-6 py-2 rounded font-semibold hover:bg-green-600 transition">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8 mt-auto text-center">
        <div className="mb-4">
          <a href="#features" className="mx-2 hover:underline">Features</a>
          <a href="#product" className="mx-2 hover:underline">Product</a>
          <a href="#pricing" className="mx-2 hover:underline">Pricing</a>
          <a href="#contact" className="mx-2 hover:underline">Contact</a>
        </div>
        <div className="text-gray-400">© 2023 FocusFlow. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default LandingPage; 