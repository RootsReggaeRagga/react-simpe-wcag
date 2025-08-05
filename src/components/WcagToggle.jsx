import React, { useEffect, useState } from 'react';
import './WcagToggle.css'; // Import the CSS file
import { 
  Accessibility, 
  RotateCcw, 
  Code, 
  Image, 
  Type, 
  Text, 
  Heading1, 
  Contrast, 
  Eye, 
  EyeOff, 
  FileText,
  Map,
  Settings
} from 'lucide-react';

const WcagToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textSize, setTextSize] = useState('normal'); // Single state for text size
  const [showResetNotification, setShowResetNotification] = useState(false);
  const [scriptsDisabled, setScriptsDisabled] = useState(false);
  const [imagesDisabled, setImagesDisabled] = useState(false);

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

  const handleScriptsToggle = () => {
    const newState = !scriptsDisabled;
    setScriptsDisabled(newState);
    setCookie('wcagScriptsDisabled', newState ? '1' : '0', 1);
    
    if (newState) {
      document.body.classList.add('wcag__no-scripts');
      // Disable all scripts except WCAG widget
      const scripts = document.querySelectorAll('script:not([src*="wcag"])');
      scripts.forEach(script => {
        script.setAttribute('data-wcag-disabled', 'true');
        script.style.display = 'none';
      });
    } else {
      document.body.classList.remove('wcag__no-scripts');
      // Re-enable scripts
      const scripts = document.querySelectorAll('script[data-wcag-disabled="true"]');
      scripts.forEach(script => {
        script.removeAttribute('data-wcag-disabled');
        script.style.display = '';
      });
    }
  };

  const handleImagesToggle = () => {
    const newState = !imagesDisabled;
    setImagesDisabled(newState);
    setCookie('wcagImagesDisabled', newState ? '1' : '0', 1);
    
    if (newState) {
      document.body.classList.add('wcag__no-images');
      // Hide all images and videos
      const mediaElements = document.querySelectorAll('img, video, iframe, canvas, svg:not(.wcag-container svg)');
      mediaElements.forEach(element => {
        element.setAttribute('data-wcag-hidden', 'true');
        element.style.display = 'none';
      });
    } else {
      document.body.classList.remove('wcag__no-images');
      // Show images and videos
      const mediaElements = document.querySelectorAll('[data-wcag-hidden="true"]');
      mediaElements.forEach(element => {
        element.removeAttribute('data-wcag-hidden');
        element.style.display = '';
      });
    }
  };

  const handleResetSettings = () => {
    // Reset text size to normal
    setTextSize('normal');
    
    // Remove contrast class from body
    document.body.classList.remove('wcag__contrast');
    
    // Remove all WCAG classes from body
    document.body.classList.remove('wcag__text-normal', 'wcag__text-plus', 'wcag__text-plus-plus', 'wcag__no-scripts', 'wcag__no-images');
    
    // Add normal text class
    document.body.classList.add('wcag__text-normal');
    
    // Reset new states
    setScriptsDisabled(false);
    setImagesDisabled(false);
    
    // Re-enable scripts
    const scripts = document.querySelectorAll('script[data-wcag-disabled="true"]');
    scripts.forEach(script => {
      script.removeAttribute('data-wcag-disabled');
      script.style.display = '';
    });
    
    // Show images and videos
    const mediaElements = document.querySelectorAll('[data-wcag-hidden="true"]');
    mediaElements.forEach(element => {
      element.removeAttribute('data-wcag-hidden');
      element.style.display = '';
    });
    
    // Delete all WCAG cookies
    deleteCookie('wcagTextSize');
    deleteCookie('wcagContrast');
    deleteCookie('wcagScriptsDisabled');
    deleteCookie('wcagImagesDisabled');
    
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
    
    // Load saved script and image settings
    const savedScriptsDisabled = getCookie('wcagScriptsDisabled') === '1';
    const savedImagesDisabled = getCookie('wcagImagesDisabled') === '1';
    
    if (savedScriptsDisabled) {
      setScriptsDisabled(true);
      document.body.classList.add('wcag__no-scripts');
      // Disable scripts on load
      const scripts = document.querySelectorAll('script:not([src*="wcag"])');
      scripts.forEach(script => {
        script.setAttribute('data-wcag-disabled', 'true');
        script.style.display = 'none';
      });
    }
    
    if (savedImagesDisabled) {
      setImagesDisabled(true);
      document.body.classList.add('wcag__no-images');
      // Hide images on load
      const mediaElements = document.querySelectorAll('img, video, iframe, canvas, svg:not(.wcag-container svg)');
      mediaElements.forEach(element => {
        element.setAttribute('data-wcag-hidden', 'true');
        element.style.display = 'none';
      });
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

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const wcagContainer = document.querySelector('.wcag-container');
      if (isVisible && wcagContainer && !wcagContainer.contains(event.target)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

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
              <Type size={16} />
              Text
            </button>
            <button className="wcag-btt__text-plus" onClick={() => handleTextChange('plus')}>
              <Text size={16} />
              Text+
            </button>
            <button className="wcag-btt__text-plus-plus" onClick={() => handleTextChange('plus-plus')}>
              <Heading1 size={16} />
              Text++
            </button>
            <button className="wcag-btt__wcag-hi" onClick={handleContrastToggle}>
              <Contrast size={16} />
              High Contrast
            </button>
            <button className="wcag-btt__wcag-lo" onClick={handleContrastToggle}>
              <Contrast size={16} />
              Low Contrast
            </button>
            <button 
              className={`wcag-btt__toggle ${scriptsDisabled ? 'wcag-btt__active' : ''}`} 
              onClick={handleScriptsToggle}
            >
              <Code size={16} />
              {scriptsDisabled ? 'Enable Scripts' : 'Disable Scripts'}
            </button>
            <button 
              className={`wcag-btt__toggle ${imagesDisabled ? 'wcag-btt__active' : ''}`} 
              onClick={handleImagesToggle}
            >
              {imagesDisabled ? <Eye size={16} /> : <EyeOff size={20} />}
              {imagesDisabled ? 'Show Media' : 'Hide Media'}
            </button>
            <button className="wcag-btt__reset" onClick={handleResetSettings}>
              <RotateCcw size={16} />
              Reset Settings
            </button>
            <button className="wcag-btt__link" onClick={() => { /* Add your link logic here */ }}>
              <FileText size={16} />
              Accessibility declaration
            </button>
            <button className="wcag-btt__link" onClick={() => { /* Add your link logic here */ }}>
              <Map size={16} />
              Sitemap
            </button>
          </div>
        </div>
      </div>
      {/* Reset notification */}
      {showResetNotification && (
        <div className="wcag-notification">
          <Settings size={16} style={{ marginRight: '8px' }} />
          Settings have been reset to default
        </div>
      )}
    </>
  );
};

export default WcagToggle;