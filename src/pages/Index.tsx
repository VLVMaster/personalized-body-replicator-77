
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProcessSection from '@/components/ProcessSection';
import BenefitsSection from '@/components/BenefitsSection';
import MarketSection from '@/components/MarketSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  // Set document title and meta tags
  useEffect(() => {
    document.title = 'VLR';
    
    // Set meta tags for social sharing preview
    const metaTags = [
      { name: 'og:title', content: 'Your Body, Perfectly Replicated | VLR' },
      { name: 'og:description', content: 'At VLR, we help OnlyFans creators transform their most intimate features into personalised replica sex toys. Simply scan, sell, and profit.' },
      { name: 'og:image', content: 'https://vulvalareplica.com/lovable-uploads/1137fe3e-65ce-45ba-8825-2607f0e912bc.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Your Body, Perfectly Replicated | VLR' },
      { name: 'twitter:description', content: 'At VLR, we help OnlyFans creators transform their most intimate features into personalised replica sex toys.' },
      { name: 'twitter:image', content: 'https://vulvalareplica.com/lovable-uploads/1137fe3e-65ce-45ba-8825-2607f0e912bc.png' },
    ];
    
    // Update or create meta tags
    metaTags.forEach(({ name, content }) => {
      let metaTag = document.querySelector(`meta[property="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });
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
