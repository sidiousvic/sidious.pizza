/**
 * Infinite scroll for blog posts
 * Loads posts dynamically as the user scrolls
 */
import { logger } from './logger.js';
document.addEventListener('DOMContentLoaded', function() {
  // Only run on writes page
  if (!window.location.pathname.startsWith('/writes')) {
    return;
  }

  // Use the logger from our utility module
  const log = logger.log;
  
  // Variables to track loading state
  const postsContainer = document.getElementById('posts-container');
  const scrollableContainer = document.querySelector('.terminal-content') || document.body;
  const loadingIndicator = document.getElementById('loading-indicator');
  const allPosts = window.WRITE_POSTS || [];
  let currentIndex = 2; // We already loaded the first 2 posts
  let loading = false;
  const loadedPostIds = new Set();
  
  // Function to check scroll position and load more posts if needed
  function checkScroll() {
    if (loading || currentIndex >= allPosts.length) return;
    
    // Get scroll position information
    const scrollTop = scrollableContainer.scrollTop || window.scrollY || document.documentElement.scrollTop;
    const containerHeight = scrollableContainer.clientHeight || window.innerHeight;
    const scrollHeight = scrollableContainer.scrollHeight || document.body.scrollHeight;
    
    // Calculate scroll percentage
    const scrollPercent = (scrollTop / (scrollHeight - containerHeight)) * 100;
    
    log(`Scroll check: ${scrollPercent.toFixed(1)}%, Current index: ${currentIndex}`);
    
    // If we've scrolled more than 50% of the way through the content
    // OR if we've scrolled at least 300px
    if (scrollPercent > 50 || scrollTop > 300) {
      log(`Loading trigger reached at ${scrollPercent.toFixed(1)}%`);
      loadMorePosts();
    }
  }
  
  // Function to load more posts
  function loadMorePosts() {
    // Don't load if already loading or at the end
    if (loading || currentIndex >= allPosts.length) {
      log('Skipping load - already loading or at end');
      return;
    }
    
    // Set loading state
    loading = true;
    if (loadingIndicator) loadingIndicator.style.display = 'block';
    
    // How many posts to load next (min of 2 or remaining posts)
    const postsToLoad = Math.min(2, allPosts.length - currentIndex);
    log(`Loading ${postsToLoad} more posts from index ${currentIndex}`);
    
    // Small delay to ensure UI updates
    setTimeout(() => {
      try {
        // Create HTML for the new posts
        for (let i = 0; i < postsToLoad; i++) {
          const post = allPosts[currentIndex + i];
          if (!post) continue;
          
          // Skip if already loaded this post
          const postId = post.url || `post-${currentIndex + i}`;
          if (loadedPostIds.has(postId)) {
            log(`Skipping already loaded post: ${post.title}`);
            continue;
          }
          
          // Mark as loaded
          loadedPostIds.add(postId);
          
          // Create post element
          const postElement = document.createElement('div');
          postElement.className = 'post';
          
          // Format date
          const date = new Date(post.date);
          const formattedDate = date.toISOString().split('T')[0];
          
          // Create post HTML
          postElement.innerHTML = `
            <h2><a href="${post.url}" style="text-decoration: none; color: inherit;">cat ${formattedDate}/${post.title.toLowerCase().replace(/\s+/g, "-")}.md</a></h2>
            ${post.content}
          `;
          
          // Add to container
          log(`Adding post: ${post.title}`);
          postsContainer.appendChild(postElement);
        }
        
        // Update index
        currentIndex += postsToLoad;
        log(`Updated index to ${currentIndex}`);
        
        // Lazy load any new images
        lazyLoadImages();
      } catch (error) {
        logger.error('Error loading posts:', error);
      } finally {
        // Reset loading state
        loading = false;
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        log('Loading complete');
      }
    }, 100);
  }
  
  // Function to lazy load images
  function lazyLoadImages() {
    const images = document.querySelectorAll('img:not([loading="lazy"])');
    images.forEach(img => {
      if (!img.hasAttribute('loading') && img.getAttribute('fetchpriority') !== 'high') {
        img.setAttribute('loading', 'lazy');
      }
    });
  }
  
  // Initial setup
  lazyLoadImages();
  
  // Initial log message
  log(`Infinite scroll initialized with ${allPosts.length} total posts`);
  
  // Set up scroll event handler with throttling
  let scrollTimer;
  const handleScroll = function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(checkScroll, 100);
  };
  
  // Add event listeners
  window.addEventListener('scroll', handleScroll);
  scrollableContainer.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  log('Added scroll listeners to window and scrollable container');
  
  // Also check periodically
  setInterval(checkScroll, 1000);
});