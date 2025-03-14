
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg">
            <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p>Welcome to Vulva La Replica ("VLR", "we", "us", or "our"). By accessing or using our website, products, or services, you agree to be bound by these Terms of Service ("Terms").</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Eligibility</h2>
            <p>You must be at least 18 years old and capable of forming a binding contract to use our services. By using our services, you represent that you meet these requirements.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Content Creator Terms</h2>
            <p>If you are using our platform as a content creator:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>You affirm that you have all necessary rights and permissions to create and sell products based on your physical likeness.</li>
              <li>You understand that you are responsible for ensuring your compliance with all applicable laws related to adult content creation and distribution.</li>
              <li>You agree to provide accurate information during the registration and product creation processes.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Intellectual Property</h2>
            <p>You retain ownership of your content and likeness. By using our services, you grant us a non-exclusive license to use, reproduce, and distribute your content solely for the purpose of manufacturing and selling your personalized products.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Prohibited Uses</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use our services for any illegal purpose</li>
              <li>Submit false or misleading information</li>
              <li>Infringe upon the intellectual property rights of others</li>
              <li>Attempt to reverse-engineer our technology or processes</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Disclaimer of Warranties</h2>
            <p>Our services are provided "as is" and "as available" without warranties of any kind, either express or implied.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Limitation of Liability</h2>
            <p>In no event shall VLR, its affiliates, or their respective officers, directors, employees, or agents be liable for any indirect, incidental, special, punitive, or consequential damages arising out of or related to your use of our services.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website. Your continued use of our services after such changes constitutes your acceptance of the new Terms.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">9. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which VLR is registered, without regard to its conflict of law provisions.</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">10. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at support@vulvalareplica.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
