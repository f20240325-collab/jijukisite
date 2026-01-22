document.addEventListener("DOMContentLoaded", () => {
  // --- EmailJS Initialization ---
  const EMAILJS_PUBLIC_KEY = "hTDjOON4bNLKiBD8_";
  const EMAILJS_SERVICE_ID = "service_xq2263m";
  const EMAILJS_TEMPLATE_ID = "template_0egjdci";
  
  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log("EmailJS initialized successfully");
  } else {
    console.error("EmailJS library not loaded");
  }

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // --- Respect prefers-reduced-motion ---
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }
  } catch (e) {
    // ignore
  }

  // --- Mobile Nav Toggle ---
  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("open");
    });
  }

  // --- Dropdown Menu Toggle ---
  const dropdownBtn = document.querySelector(".nav-dropdown-btn");
  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const expanded = dropdownBtn.getAttribute("aria-expanded") === "true";
      dropdownBtn.setAttribute("aria-expanded", String(!expanded));
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-dropdown")) {
        dropdownBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- Contact Form Handler ---

  // --- Contact Form Handler ---
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  function showMessage(message, type) {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.className = `form-message ${type}`;
      formMessage.style.display = "block";
    }
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const description = document.getElementById("description").value.trim();

      // Basic validation
      if (!name || !phone || !email || !description) {
        showMessage("Please fill in all fields.", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
      }

      // Phone validation (basic)
      const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
      if (!phoneRegex.test(phone) || phone.length < 10) {
        showMessage("Please enter a valid phone number.", "error");
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector(".form-submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        // Send email via EmailJS
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: name,
            from_email: email,
            phone: phone,
            message: description,
            to_email: "Ravit004@gmail.com"
          }
        );

        showMessage("Thank you! Your message has been sent successfully. We'll get back to you soon.", "success");
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
          formMessage.classList.remove("success", "error");
          formMessage.textContent = "";
        }, 5000);
      } catch (error) {
        console.error("EmailJS Error:", error);
        showMessage("Error sending message. Please try again later.", "error");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // --- Services Expansion Logic ---
  const servicesGrid = document.getElementById("servicesGrid");
  const readMoreBtns = document.querySelectorAll(".read-more-btn");
  const backBtns = document.querySelectorAll(".back-btn");
  const allCards = document.querySelectorAll(".expand-card");

  // Function to expand a card
  readMoreBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Get the parent card of the clicked button
      const parentCard = e.target.closest(".expand-card");

      // Add Expanding class to grid (changes layout mode)
      servicesGrid.classList.add("expanding");

      // Set clicked card to active, others to hidden
      allCards.forEach((card) => {
        if (card === parentCard) {
          card.classList.add("active");
          card.classList.remove("hidden");
        } else {
          card.classList.remove("active");
          card.classList.add("hidden");
        }
      });

      // Scroll to top of services section slightly
      const yOffset = -100;
      const y =
        servicesGrid.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Function to collapse (Go Back)
  backBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent bubbling

      // Remove grid expansion class
      servicesGrid.classList.remove("expanding");

      // Reset all cards
      allCards.forEach((card) => {
        card.classList.remove("active");
        card.classList.remove("hidden");
      });
    });
  });

  // --- Smooth Anchor Scrolling ---
  // --- Smooth Anchor Scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Close mobile nav if open
        if (navLinks && navLinks.classList.contains("open")) {
          navLinks.classList.remove("open");
          if (navToggle) navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // --- Mobile Touch/Scroll Observer for Hover Effects ---
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  if (isMobile) {
    // Observer for Story Cards
    const storyCards = document.querySelectorAll('.story-card');
    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mobile-active');
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-50px'
    });

    storyCards.forEach(card => {
      storyObserver.observe(card);
      
      // Also add touch support
      card.addEventListener('touchstart', () => {
        storyCards.forEach(c => c.classList.remove('mobile-active'));
        card.classList.add('mobile-active');
      });
    });

    // Observer for Approach Items
    const approachItems = document.querySelectorAll('.approach-item');
    const approachObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mobile-active');
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-50px'
    });

    approachItems.forEach(item => {
      approachObserver.observe(item);
      
      // Also add touch support
      item.addEventListener('touchstart', () => {
        approachItems.forEach(i => i.classList.remove('mobile-active'));
        item.classList.add('mobile-active');
      });
    });

    // Observer for Feature Items
    const featureItems = document.querySelectorAll('.feature-item');
    const featureObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mobile-visible');
        }
      });
    }, {
      threshold: 0.3
    });

    featureItems.forEach(item => featureObserver.observe(item));

    // Observer for Hover Cards (Industries)
    const hoverCards = document.querySelectorAll('.hover-card');
    const hoverObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mobile-visible');
        }
      });
    }, {
      threshold: 0.3
    });

    hoverCards.forEach(card => hoverObserver.observe(card));
  }

  // Theme is set statically to dark via HTML attribute; no toggle required.
});
