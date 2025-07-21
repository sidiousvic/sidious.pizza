/**
 * Logger utility for sidious.pizza
 * Handles environment-based logging to prevent logs in production
 */

// Determine if we're in development mode once when this module is loaded
const isDevelopment = (function() {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' || 
         window.location.hostname.includes('.local');
})();

// Create a logger object with methods that mirror console
const logger = {
  // Standard logging - only in development
  log: function(...args) {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  // Error logging - only in development
  error: function(...args) {
    if (isDevelopment) {
      console.error(...args);
    }
  },

  // Warning logging - only in development
  warn: function(...args) {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  // Info logging - only in development
  info: function(...args) {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  // Debug logging - only in development
  debug: function(...args) {
    if (isDevelopment) {
      console.debug(...args);
    }
  },

  // Force logging even in production (for critical errors)
  forceLog: function(...args) {
    console.log(...args);
  },
  
  // Force error logging even in production (for critical errors)
  forceError: function(...args) {
    console.error(...args);
  }
};

// Export the logger
export { logger, isDevelopment };