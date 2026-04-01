import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Only visible on fine pointer devices (desktops)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setHidden(true);
      return;
    }

    const addEventListeners = () => {
      document.addEventListener('mousemove', mMove);
      document.addEventListener('mouseenter', mEnter);
      document.addEventListener('mouseleave', mLeave);
      document.addEventListener('mousedown', mDown);
      document.addEventListener('mouseup', mUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseenter', mEnter);
      document.removeEventListener('mouseleave', mLeave);
      document.removeEventListener('mousedown', mDown);
      document.removeEventListener('mouseup', mUp);
    };

    const mMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const mEnter = () => setHidden(false);
    const mLeave = () => setHidden(true);
    const mDown = () => setClicked(true);
    const mUp = () => setClicked(false);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input, select, textarea').forEach((el) => {
        el.addEventListener('mouseover', () => setLinkHovered(true));
        el.addEventListener('mouseout', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    // Re-check DOM for dynamically added elements
    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div 
        className="custom-cursor-dot" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        className={`custom-cursor-ring ${clicked ? 'scale-75' : ''} ${linkHovered ? 'active' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${clicked ? 'scale(0.8)' : 'scale(1)'}`
        }}
      />
    </>
  );
}
