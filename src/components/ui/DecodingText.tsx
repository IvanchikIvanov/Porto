import React, { useEffect, useState, useRef } from 'react';

// A set of technical/cyber looking characters for the scramble effect
const CHARS = "XB01@#%&!$*?<>[]{}|=+";

interface DecodingTextProps {
  text: string;
  className?: string;
  scrambleClassName?: string; // Class for the scrambling characters (e.g., accent color)
  revealSpeed?: number; // Speed of the reveal in ms
  startDelay?: number; // Delay before starting animation on mount
  triggerOnHover?: boolean; // Whether to re-animate on hover
}

const DecodingText: React.FC<DecodingTextProps> = ({
  text,
  className = '',
  scrambleClassName = 'text-cyber-accent', // Default to magenta/pink
  revealSpeed = 40,
  startDelay = 0,
  triggerOnHover = true,
}) => {
  const [displayContent, setDisplayContent] = useState<
    { char: string; isScrambled: boolean }[]
  >(text.split('').map((char) => ({ char, isScrambled: false })));

  const intervalRef = useRef<number | null>(null);
  const isMounted = useRef(false);

  const animate = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      const newContent = text.split('').map((originalChar, index) => {
        // Skip spaces to preserve word shape
        if (originalChar === ' ') return { char: ' ', isScrambled: false };

        // If we haven't reached this index yet, show a random char
        if (index < iteration) {
          return { char: originalChar, isScrambled: false };
        }

        return {
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          isScrambled: true,
        };
      });

      setDisplayContent(newContent);

      // End animation when all letters are revealed
      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      // Increment iteration. 
      // Using a fraction (e.g. 1/3) means it takes 3 frames to resolve one letter, 
      // making the "scramble" wave move slower than the frame rate.
      iteration += 1 / 2; 
    }, revealSpeed);
  };

  useEffect(() => {
    isMounted.current = true;
    const timer = setTimeout(() => {
        if(isMounted.current) animate();
    }, startDelay);
    
    return () => {
        isMounted.current = false;
        clearTimeout(timer);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      animate();
    }
  };

  return (
    <span 
        className={`inline-block whitespace-nowrap ${className}`} 
        onMouseEnter={handleMouseEnter}
    >
      {displayContent.map((item, index) => (
        <span
          key={index}
          className={item.isScrambled ? scrambleClassName : ''}
        >
          {item.char}
        </span>
      ))}
    </span>
  );
};

export default DecodingText;

