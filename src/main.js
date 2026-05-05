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
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(12, 10, 9, 0.95)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.background = 'rgba(12, 10, 9, 0.8)';
      navbar.style.boxShadow = 'none';
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
    const cards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    function getCardsPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 992) return 2;
      return 3;
    }

    function updateCarousel() {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, reviews.length - cardsPerView);
      
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      
      const cardWidth = cards[0].offsetWidth;
      const gap = parseInt(window.getComputedStyle(track).gap) || 32; // 2rem = 32px
      
      const offset = currentIndex * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    prevBtn?.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn?.addEventListener('click', () => {
      const maxIndex = reviews.length - getCardsPerView();
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    window.addEventListener('resize', updateCarousel);
    
    // Auto scroll
    setInterval(() => {
      const maxIndex = reviews.length - getCardsPerView();
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    }, 5000);
  }
});
