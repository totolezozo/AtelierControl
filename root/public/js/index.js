document.addEventListener("DOMContentLoaded", function () {
    // ==== Carousel Functionality ====
    const slides = document.querySelectorAll(".carousel-item");
    let index = 0;
    function changeSlide() {
      slides.forEach(slide => slide.classList.remove("active"));
      slides[index].classList.add("active");
      index = (index + 1) % slides.length;
    }
    setInterval(changeSlide, 4000);
    changeSlide();
  
    // ==== Toggle Menu Functionality ====
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    if (menuToggle && navbar) {
      menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");
      });
    }
  
    // ==== Dropdown Functionality ====
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) {
      dropdown.addEventListener("click", function (event) {
        event.preventDefault();
        const submenu = this.querySelector(".submenu");
        if (submenu) {
          submenu.classList.toggle("active");
        }
      });
    }
  
    // ==== Section Navigation Functionality ====
    const sections = {
      presentation: document.querySelector(".presentation-section"),
      climatisation: document.getElementById("climatisation-section"),
      chauffage: document.getElementById("chauffage-section"),
      plomberie: document.getElementById("plomberie-section"),
      contrat: document.getElementById("contrat-entretien-section"),
      zones: document.getElementById("zones-intervention-section"),
      contact: document.getElementById("contact-section"),
      realisations: document.getElementById("realisations-section")
    };
  
    const buttons = {
      presentation: document.querySelector("#menu a[href='#presentation']"),
      climatisation: document.querySelector(".submenu li:nth-child(1) a"),
      plomberie: document.querySelector(".submenu li:nth-child(2) a"),
      chauffage: document.querySelector(".submenu li:nth-child(3) a"),
      contrat: document.querySelector("#menu a[href='#contrat']"),
      zones: document.querySelector("#menu a[href='#zones']"),
      contact: document.querySelector("#menu a[href='#contact']"),
      realisations: document.querySelector("#menu a[href='#realisations']")
    };
  
    function hideAllSections() {
      Object.values(sections).forEach(section => {
        if (section) section.style.display = "none";
      });
    }
  
    function showSection(sectionName) {
      hideAllSections();
      if (sections[sectionName]) {
        sections[sectionName].style.display = "block";
      } else {
        console.warn(`❌ Section "${sectionName}" not found in HTML!`);
      }
    }
  
    // Attach event listeners for navigation buttons.
    // Note: Ensure that the "SERVICES" link has a class "no-autoscroll" in your HTML.
    Object.keys(buttons).forEach(key => {
      if (buttons[key]) {
        buttons[key].addEventListener("click", function (event) {
          event.preventDefault();
          showSection(key);
          // Skip auto-scroll for links with class "no-autoscroll"
          if (this.classList.contains("no-autoscroll")) return;
          const presentationElement = document.querySelector(".presentation");
          if (presentationElement) {
            presentationElement.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    });
  
    // ==== Carousel Caption Button Navigation ====
    document.querySelectorAll(".carousel-caption .button").forEach(button => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const altText = this.closest(".carousel-item").querySelector("img").alt.toLowerCase();
        let targetSection = "presentation";
        if (altText.includes("climatisation")) targetSection = "climatisation";
        else if (altText.includes("plomberie")) targetSection = "plomberie";
        else if (altText.includes("chauffage")) targetSection = "chauffage";
        else if (altText.includes("contrats")) targetSection = "contrat";
        showSection(targetSection);
        const presentationElement = document.querySelector(".presentation");
        if (presentationElement) {
          presentationElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  
    // ==== Additional Scroll Behavior for Navbar Links ====
    // (Optional: Remove this block if it's causing duplicate scroll behavior)
    document.querySelectorAll(".navbar a").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        // Skip auto-scroll if link has "no-autoscroll" class.
        if (this.classList.contains("no-autoscroll")) return;
        e.preventDefault();
        const targetElement = document.querySelector(".presentation");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  
    // ==== Initial Setup: Show Presentation Section Only ====
    hideAllSections();
    showSection("presentation");
  });
  

