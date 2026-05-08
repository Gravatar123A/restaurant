const reviews = [
  {
    name: "Shika Kapoor",
    time: "2 months ago",
    text: "It was our first time at this restaurant and we had a wonderful experience. Prabhat Kumar Pandit provided outstanding service and gave us excellent recommendations. We had the Hanging Kebab and the Chicken Dum Biryani — both dishes were amazing.",
    rating: 5
  },
  {
    name: "Sagar Mehta",
    time: "3 months ago",
    text: "I had a fantastic experience at this restaurant. The staff were friendly and specially thanks mr. Roshan. Attentive, the food came out quickly, and everything tasted fresh and delicious. Definitely one of the best places I've visited.",
    rating: 5
  },
  {
    name: "Swati Kewlani",
    time: "2 months ago",
    text: "One of the best biryanis I’ve had! Rich flavors, great aroma, and perfectly balanced spices. Definitely worth trying. Amazing service by Prabhat and Chandani! Really made our dining experience special.",
    rating: 5
  },
  {
    name: "Fiza Irshad",
    time: "5 months ago",
    text: "I visit Biryanis and Biryanis very often, and every visit reminds me why this restaurant is one of my absolute favorites. This time I tried the Triple Schezwan Fried Rice, and it was incredible — perfectly spiced, full of flavor.",
    rating: 5
  },
  {
    name: "Wen Wen",
    time: "2 months ago",
    text: "I came here with my friends and actually I am not eating spicy, so I ask to please let me request to the Chef. The Chef, Mr. Akshay, made my order perfectly, tasty food, thank you so much.",
    rating: 5
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
      bars[0].style.transform = 'translateY(8px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }));

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hero Parallax
    if (hero) {
      const scrollPos = window.scrollY;
      hero.style.backgroundPositionY = `${scrollPos * 0.5}px`;
    }
  });

  // Render Reviews
  const track = document.getElementById('reviewTrack');
  const dotsContainer = document.getElementById('carouselDots');
  
  if (track && dotsContainer) {
    reviews.forEach((review, index) => {
      // Create review card
      const card = document.createElement('div');
      card.className = 'review-card';
      
      const stars = '★'.repeat(review.rating);
      
      card.innerHTML = `
        <div class="stars">${stars}</div>
        <p class="review-text">"${review.text}"</p>
        <div class="reviewer">
          <div class="reviewer-avatar">${review.name.charAt(0)}</div>
          <div class="reviewer-info">
            <h4>${review.name}</h4>
            <span>Local Guide • ${review.time}</span>
          </div>
        </div>
      `;
      track.appendChild(card);
      
      // Create dot
      const dot = document.createElement('div');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    // Carousel Logic
    let currentIndex = 0;
    let autoScrollInterval;
    const cards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    function getCardsPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function updateCarousel() {
      if (!cards.length) return;
      
      const cardsPerView = getCardsPerView();
      const totalCards = cards.length;
      const maxIndex = Math.max(0, totalCards - cardsPerView);
      
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;
      
      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(track).gap) || 32;
      
      const offset = currentIndex * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
        // Hide dots that would go beyond maxIndex
        dot.style.display = index > maxIndex ? 'none' : 'block';
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
      resetAutoScroll();
    }

    function resetAutoScroll() {
      clearInterval(autoScrollInterval);
      startAutoScroll();
    }

    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        const cardsPerView = getCardsPerView();
        const maxIndex = cards.length - cardsPerView;
        
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      }, 5000);
    }

    prevBtn?.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
        resetAutoScroll();
      }
    });

    nextBtn?.addEventListener('click', () => {
      const maxIndex = cards.length - getCardsPerView();
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
        resetAutoScroll();
      }
    });

    window.addEventListener('resize', () => {
      updateCarousel();
    });
    
    // Initial call
    setTimeout(updateCarousel, 100);
    startAutoScroll();
  }
});
