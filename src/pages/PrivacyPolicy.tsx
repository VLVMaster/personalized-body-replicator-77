
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg">
            <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p>At Vulva La Replica ("VLV", "we", "us", or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and billing information.</li>
              <li><strong>Biometric Data:</strong> 3D scans of body parts for the purpose of creating personalized products.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website and services.</li>
              <li><strong>Communications:</strong> Records of your correspondence with us.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
            <p>We use your information for purposes including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Creating and manufacturing your personalized products</li>
              <li>Processing payments and fulfilling orders</li>
              <li>Communicating with you about your account or products</li>
              <li>Improving our website and services</li>
              <li>Marketing and promotional purposes (with your consent)</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Data Rights</h2>
            <p>Depending on your location, you may have rights regarding your personal data, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>The right to access your data</li>
              <li>The right to correct inaccurate data</li>
              <li>The right to delete your data</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Third-Party Services</h2>
            <p>We may use third-party service providers to assist with our business operations. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated to maintain its confidentiality.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to collect information about your browsing activities and to improve your experience on our website.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Information</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@vulvalareplica.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
