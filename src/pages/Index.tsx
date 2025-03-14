
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProcessSection from '@/components/ProcessSection';
import BenefitsSection from '@/components/BenefitsSection';
import MarketSection from '@/components/MarketSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  // Set document title
  useEffect(() => {
    document.title = 'Vulva La Replica';
  }, []);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            // Get the navbar height dynamically
            const navbarHeight = document.querySelector('header')?.getBoundingClientRect().height || 80;
            
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.body.addEventListener('click', handleAnchorClick);
    return () => document.body.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <HeroSection />
        <ProcessSection />
        <BenefitsSection />
        <MarketSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
