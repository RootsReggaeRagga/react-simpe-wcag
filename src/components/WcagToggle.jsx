import React, { useEffect, useState } from 'react';
import './WcagToggle.css'; // Import the CSS file
import { Accessibility, RotateCcw } from 'lucide-react';

const WcagToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textSize, setTextSize] = useState('normal'); // Single state for text size
  const [showResetNotification, setShowResetNotification] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${cvalue}; ${expires}; path=/`;
  };

  const getCookie = (cname) => {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const deleteCookie = (cname) => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleTextChange = (size) => {
    setTextSize(size);
    setCookie('wcagTextSize', size, 1);
  };

  const handleContrastToggle = () => {
    document.body.classList.toggle('wcag__contrast');
    const contrastCookie = getCookie('wcagContrast') === '1' ? '0' : '1';
    setCookie('wcagContrast', contrastCookie, 1);
  };

  const handleResetSettings = () => {
    // Reset text size to normal
    setTextSize('normal');
    
    // Remove contrast class from body
    document.body.classList.remove('wcag__contrast');
    
    // Remove all WCAG classes from body
    document.body.classList.remove('wcag__text-normal', 'wcag__text-plus', 'wcag__text-plus-plus');
    
    // Add normal text class
    document.body.classList.add('wcag__text-normal');
    
    // Delete all WCAG cookies
    deleteCookie('wcagTextSize');
    deleteCookie('wcagContrast');
    
    // Show notification
    setShowResetNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowResetNotification(false);
    }, 3000);
  };

  useEffect(() => {
    const savedTextSize = getCookie('wcagTextSize');
    if (savedTextSize) {
      setTextSize(savedTextSize);
    }
    if (getCookie('wcagContrast') === '1') {
      document.body.classList.add('wcag__contrast');
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove('wcag__text-normal', 'wcag__text-plus', 'wcag__text-plus-plus');
    if (textSize === 'normal') {
      document.body.classList.add('wcag__text-normal');
    } else if (textSize === 'plus') {
      document.body.classList.add('wcag__text-plus');
    } else if (textSize === 'plus-plus') {
      document.body.classList.add('wcag__text-plus-plus');
    }
  }, [textSize]);

  return (
    <>
      <div className={`wcag-container ${isVisible ? 'show' : ''}`}>
        <div className="wcag-btt">
          <button 
            className="aside-wcag__toggle" 
            onClick={toggleVisibility} 
            aria-expanded={isVisible}>
              <Accessibility />
          </button>
          <div className="wcag-options">
            <button className="wcag-btt__text-normal" onClick={() => handleTextChange('normal')}>
              Text
            </button>
            <button className="wcag-btt__text-plus" onClick={() => handleTextChange('plus')}>
              Text+
            </button>
            <button className="wcag-btt__text-plus-plus" onClick={() => handleTextChange('plus-plus')}>
              Text++
            </button>
            <button className="wcag-btt__wcag-hi" onClick={handleContrastToggle}>
              High Contrast
            </button>
            <button className="wcag-btt__wcag-lo" onClick={handleContrastToggle}>
              Low Contrast
            </button>
            <button className="wcag-btt__reset" onClick={handleResetSettings}>
              <RotateCcw size={16} />
              Reset Settings
            </button>
            <button className="wcag-btt__link" onClick={() => { /* Add your link logic here */ }}>
              Accessibility declaration
            </button>
            <button className="wcag-btt__link" onClick={() => { /* Add your link logic here */ }}>
              Sitemap
            </button>
          </div>
        </div>
      </div>
      
      {/* Reset notification */}
      {showResetNotification && (
        <div className="wcag-notification">
          Settings have been reset to default
        </div>
      )}
    </>
  );
};

export default WcagToggle;