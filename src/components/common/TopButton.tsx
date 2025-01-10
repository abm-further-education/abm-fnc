'use client';
import { useEffect, useState } from 'react';

const TopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300); // 300px 이상 스크롤하면 버튼이 보이도록 설정
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-40 w-50 h-50 right-40 bg-secondary text-black p-3 rounded-full shadow-lg hover:bg-primary transition-all ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to Top"
    >
      ↑
    </button>
  );
};

export default TopButton;
