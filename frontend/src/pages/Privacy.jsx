import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          <h1 className="text-4xl font-bold mb-2 relative z-10">Privacy Policy</h1>
          <p className="text-lg opacity-90 relative z-10">SIH 2024 Project - Prototype Data Handling</p>
        </div>

        <div className="p-8">
          {/* Last Updated */}
          <div className="bg-gray-700 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg">
            <p className="font-semibold text-gray-300">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Project Notice */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-purple-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">Prototype Notice</h2>
            <p className="text-gray-300 leading-relaxed">
              This Privacy Policy applies to the Flexora prototype application developed for Smart India Hackathon (SIH) 2024. 
              This is an educational project for demonstration and competition purposes only. Please use only test data when 
              interacting with this prototype.
            </p>
          </section>

          {/* Introduction */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to Flexora - a fitness tracking prototype developed for SIH 2024. This Privacy Policy explains how we 
              handle information in this demonstration application. Since this is an educational prototype, we strongly recommend 
              using only test data and avoiding real personal information unless necessary for evaluation purposes.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Information We Collect (Prototype)</h2>
            
            <h3 className="text-xl font-medium text-gray-200 mb-3">Demonstration Data</h3>
            <p className="text-gray-300 mb-4">
              For prototype demonstration purposes, this application may collect:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Test fitness data (steps, distance, calories) - for demonstration only</li>
              <li>Simulated workout sessions and exercise data</li>
              <li>Mock health metrics (heart rate, sleep data) for UI demonstration</li>
              <li>Sample body measurements for feature showcase</li>
              <li>Test user profiles and preferences</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-200 mb-3">Google Fit Integration (Simulated)</h3>
            <p className="text-gray-300 mb-4">
              <strong>Important:</strong> Google Fit integration in this prototype may be simulated or limited:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>API integration is for demonstration purposes</li>
              <li>Real Google Fit data access may be limited or mocked</li>
              <li>Authentication flows are prototype implementations</li>
              <li>Data synchronization may be simulated for demo purposes</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">How We Use Information (Prototype)</h2>
            <p className="text-gray-300 mb-4">In this prototype demonstration, information is used to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Demonstrate fitness tracking and analytics features</li>
              <li>Show personalized dashboard and insights mockups</li>
              <li>Illustrate goal tracking and progress visualization</li>
              <li>Showcase user interface and user experience design</li>
              <li>Enable evaluation of prototype functionality</li>
              <li>Support technical demonstration and presentation</li>
            </ul>
          </section>

          {/* Prototype Data Handling */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-yellow-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Prototype Data Handling</h2>
            <p className="text-gray-300 mb-4">
              <strong>Important:</strong> This is a prototype application with limited data protection measures:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Use only test data - avoid entering real personal information</li>
              <li>Data storage is temporary and may be reset without notice</li>
              <li>No long-term data retention guarantees</li>
              <li>Data may be viewed by evaluators and team members</li>
              <li>No encryption or advanced security measures implemented</li>
              <li>Data may be used for demonstration and educational purposes</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Data Sharing (Prototype Context)</h2>
            <p className="text-gray-300 mb-4">
              In the context of this SIH 2024 prototype, data may be shared with:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Evaluators:</strong> SIH judges and evaluation panel for assessment</li>
              <li><strong>Team members:</strong> Development team for debugging and improvements</li>
              <li><strong>Mentors:</strong> Project guides and technical mentors</li>
              <li><strong>Educational use:</strong> For learning and demonstration purposes</li>
              <li><strong>Competition requirements:</strong> As needed for SIH evaluation process</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-green-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Data Security (Prototype Limitations)</h2>
            <p className="text-gray-300 mb-4">
              <strong>Please Note:</strong> This prototype has limited security measures:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Basic authentication mechanisms for demonstration</li>
              <li>Limited data encryption - not production-ready</li>
              <li>Simplified access controls for prototype purposes</li>
              <li>No advanced security auditing or monitoring</li>
              <li>Database security may be minimal for demo environment</li>
              <li>Use test data to avoid any security concerns</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Your Rights (Prototype Context)</h2>
            <p className="text-gray-300 mb-4">While using this prototype, you can:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Access:</strong> View any test data you've entered</li>
              <li><strong>Delete:</strong> Clear your test data from the prototype</li>
              <li><strong>Modify:</strong> Update or correct any information entered</li>
              <li><strong>Export:</strong> Request demo data in available formats</li>
              <li><strong>Withdraw:</strong> Stop using the prototype at any time</li>
              <li><strong>Feedback:</strong> Provide input on privacy and data handling</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Data Retention (Prototype)</h2>
            <p className="text-gray-300">
              <strong>Temporary Storage:</strong> All data in this prototype is stored temporarily for demonstration purposes. 
              Data may be cleared at any time without notice. No long-term data retention is guaranteed. After SIH 2024 
              evaluation, all test data will be properly disposed of according to best practices.
            </p>
          </section>

          {/* Educational Use */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-indigo-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Educational Use Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              This prototype is created for educational purposes:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Not intended for real fitness tracking or health monitoring</li>
              <li>Data accuracy and reliability are not guaranteed</li>
              <li>No medical advice or health recommendations provided</li>
              <li>Use for learning, evaluation, and demonstration only</li>
              <li>Not suitable for production use or real user data</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-red-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-red-400 mb-4">Children's Privacy</h2>
            <p className="text-gray-300">
              This prototype is designed for educational demonstration and is not intended for use by children under 13. 
              If this prototype is demonstrated to minors, only test data should be used, and proper supervision should be 
              maintained throughout the demonstration.
            </p>
          </section>

          {/* Future Development */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Future Development</h2>
            <p className="text-gray-300">
              If this prototype is developed into a production application after SIH 2024, proper privacy policies, 
              data protection measures, security implementations, and compliance with relevant regulations (such as GDPR, 
              CCPA, and Indian data protection laws) will be implemented before any real user data is collected.
            </p>
          </section>

          {/* Updates to Privacy Policy */}
          <section className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Updates to This Privacy Policy</h2>
            <p className="text-gray-300">
              This prototype Privacy Policy may be updated during the SIH 2024 development and evaluation period. 
              Any changes will be reflected in the prototype and communicated to evaluators and users as appropriate 
              for the competition timeline.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8 p-6 bg-gray-700 border-l-4 border-blue-400 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              For questions about this prototype's privacy practices or SIH 2024 project:
            </p>
            <div className="text-gray-300 space-y-2">
              <p><strong>Project Email:</strong> technicaldmcontact@gmail.com</p>
              <p><strong>Location:</strong> New Delhi</p>
              <p><strong>Competition:</strong> Smart India Hackathon 2024</p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-600">
            <p className="text-gray-400">
              © 2024 Flexora - SIH 2024 Prototype Project
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Educational Prototype • Test Data Only • Smart India Hackathon 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;