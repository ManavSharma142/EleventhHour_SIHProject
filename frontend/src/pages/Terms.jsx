import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 animate-pulse"></div>
          <h1 className="text-4xl font-bold mb-2 relative z-10">Terms of Service</h1>
          <p className="text-lg opacity-90 relative z-10">SIH 2024 Project - Educational Use Only</p>
        </div>

        <div className="p-8">
          {/* Last Updated */}
          <div className="bg-gray-700 border-l-4 border-indigo-400 p-4 mb-8 rounded-r-lg">
            <p className="font-semibold text-gray-300">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Project Notice */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-blue-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Project Notice</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              This is a prototype application developed for Smart India Hackathon (SIH) 2024. This project is created 
              for educational, demonstration, and competition purposes only. It is not intended for commercial use or 
              deployment in production environments.
            </p>
          </section>

          {/* Agreement to Terms */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Agreement to Terms</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Welcome to Flexora - a fitness tracking application prototype developed for SIH 2024. These Terms of Service 
              ("Terms") govern your use of this prototype application and demonstration platform.
            </p>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using this prototype, you understand and agree that this is an educational project created 
              for hackathon demonstration purposes. Your use of this prototype constitutes acceptance of these terms.
            </p>
          </section>

          {/* Educational Purpose */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-green-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Educational & Prototype Nature</h2>
            <p className="text-gray-300 mb-4">
              This application is developed as part of Smart India Hackathon 2024 and serves as:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>A prototype demonstration for competition evaluation</li>
              <li>An educational project showcasing technical skills</li>
              <li>A proof-of-concept for fitness tracking solutions</li>
              <li>A learning exercise in application development</li>
              <li>A non-commercial, academic endeavor</li>
            </ul>
          </section>

          {/* Description of Prototype */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Prototype Features</h2>
            <p className="text-gray-300 mb-4">
              This Flexora prototype demonstrates:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Integration concepts with Google Fit API (for demonstration purposes)</li>
              <li>Fitness data tracking and visualization interfaces</li>
              <li>User dashboard and analytics mockups</li>
              <li>Goal setting and progress tracking features</li>
              <li>Responsive web application design</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">User Responsibilities</h2>
            <p className="text-gray-300 mb-4">
              When using this prototype, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Use the application only for testing and evaluation purposes</li>
              <li>Understand that this is a prototype with limited functionality</li>
              <li>Not enter sensitive or real personal data unless necessary for demonstration</li>
              <li>Respect the educational nature of this project</li>
              <li>Provide constructive feedback for project improvement</li>
            </ul>
          </section>

          {/* Data and Privacy */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-yellow-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Data Handling for Prototype</h2>
            <p className="text-gray-300 mb-4">
              Important information about data in this prototype:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>This is a demonstration prototype - avoid entering real personal data</li>
              <li>Any data entered may be used for demonstration and evaluation purposes</li>
              <li>Google Fit integration is simulated for prototype demonstration</li>
              <li>Data storage is temporary and may be reset at any time</li>
              <li>No long-term data retention guarantees are provided</li>
              <li>Use test data for demonstration purposes</li>
            </ul>
          </section>

          {/* Limitations and Disclaimers */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-red-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-red-400 mb-4">Prototype Limitations</h2>
            <p className="text-gray-300 mb-4">Please understand that this prototype:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Is not a finished product and may contain bugs or incomplete features</li>
              <li>Should not be used for actual fitness tracking or health decisions</li>
              <li>May have limited or simulated functionality</li>
              <li>Is not suitable for production use or real-world deployment</li>
              <li>May experience downtime or technical issues during demonstration</li>
              <li>Does not guarantee data accuracy or system reliability</li>
            </ul>
          </section>

          {/* Health Disclaimer */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-orange-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">Health and Fitness Disclaimer</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                <strong>IMPORTANT:</strong> This is a prototype application for demonstration purposes only.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Do not rely on this prototype for actual health or fitness decisions</li>
                <li>This application is not a medical device or health service</li>
                <li>All fitness data and recommendations are simulated for demonstration</li>
                <li>Consult healthcare professionals for actual fitness and health guidance</li>
                <li>This prototype does not provide real medical advice or health monitoring</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Intellectual Property</h2>
            <p className="text-gray-300 mb-4">
              This prototype application is developed as part of SIH 2024:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Created for educational and competition purposes</li>
              <li>Developed by the SIH 2024 team participants</li>
              <li>May incorporate open-source libraries and frameworks</li>
              <li>Not intended for commercial licensing or distribution</li>
              <li>Subject to SIH 2024 competition guidelines and rules</li>
            </ul>
          </section>

          {/* No Warranty */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">No Warranty</h2>
            <p className="text-gray-300 mb-4">
              This prototype is provided "AS IS" for demonstration purposes. We make no warranties regarding:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Functionality, reliability, or performance</li>
              <li>Data accuracy or system availability</li>
              <li>Suitability for any particular purpose</li>
              <li>Absence of bugs, errors, or technical issues</li>
              <li>Continuous operation or maintenance</li>
            </ul>
          </section>

          {/* Feedback and Evaluation */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-purple-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">Feedback and Evaluation</h2>
            <p className="text-gray-300 mb-4">
              As part of the SIH 2024 evaluation process:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Your usage and feedback may be observed by evaluators</li>
              <li>System interactions may be logged for demonstration purposes</li>
              <li>Constructive feedback is welcomed for project improvement</li>
              <li>Technical questions and suggestions are encouraged</li>
            </ul>
          </section>

          {/* Future Development */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Future Development</h2>
            <p className="text-gray-300">
              This prototype may be further developed after SIH 2024 based on feedback and evaluation results. 
              Any future development would involve proper planning, security implementation, and compliance with 
              relevant regulations before considering real-world deployment.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-indigo-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Contact Information</h2>
            <p className="text-gray-300 mb-4">
              For questions about this SIH 2024 prototype project:
            </p>
            <div className="text-gray-300 space-y-2">
              <p><strong>Project Email:</strong> technicaldmcontact@gmail.com</p>
              <p><strong>Project Location:</strong> New Delhi</p>
              <p><strong>Competition:</strong> Smart India Hackathon 2024</p>
            </div>
          </section>

          {/* Modifications */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Modifications</h2>
            <p className="text-gray-300">
              These terms may be updated during the development and demonstration phase of the SIH 2024 project. 
              Any significant changes will be communicated to users and evaluators as appropriate for the 
              competition timeline.
            </p>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-600">
            <p className="text-gray-400">
              © 2024 Flexora - SIH 2024 Prototype Project
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Educational Project • Not for Commercial Use • Smart India Hackathon 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;