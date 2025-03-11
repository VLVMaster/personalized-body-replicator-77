
import { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  animation?: 'fade-in' | 'slide-up' | 'slide-right' | 'zoom-in';
  delay?: 'delay-100' | 'delay-200' | 'delay-300' | 'delay-400' | 'delay-500';
}

const RevealOnScroll = ({ 
  children, 
  threshold = 0.1,
  rootMargin = '0px',
  animation = 'fade-in',
  delay = 'delay-100'
}: RevealOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initially set all content to visible right away to ensure it's not hidden
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div 
      ref={ref} 
      className={`${isVisible ? `animate-${animation}` : 'opacity-100'} delayed-animation ${delay}`}
      style={{ opacity: 1 }} // Force visibility
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
