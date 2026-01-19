  document.addEventListener("DOMContentLoaded", () => {
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
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("open");
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

  // Theme is set statically to dark via HTML attribute; no toggle required.
});
