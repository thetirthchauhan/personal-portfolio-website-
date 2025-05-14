// Toggle Book Open/Close
function toggleBook(bookElement) {
  bookElement.classList.toggle("open");
}

// Particles Animation
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * -5}s`;
    particlesContainer.appendChild(particle);
  }
}

// Typing Animation
function startTypingAnimation() {
  const typingText = document.querySelector(".typing-text");
  const roles = ["Web Developer", "Software Developer", "Web Designer"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    if (charIndex < roles[roleIndex].length && !isDeleting) {
      typingText.textContent += roles[roleIndex][charIndex];
      charIndex++;
      setTimeout(type, 150);
    } else if (charIndex > 0 && isDeleting) {
      typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, 100);
    } else {
      isDeleting = !isDeleting;
      roleIndex = (roleIndex + 1) % roles.length;
      if (!isDeleting) setTimeout(type, 500);
      else setTimeout(type, 150);
    }
  }
  type();
}

// Navbar Scroll Effect
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  // Check if the device is not mobile (avoid issues on mobile)
  const isMobile = window.innerWidth <= 768;
  window.addEventListener("scroll", () => {
    if (!isMobile) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });
}

// Hamburger Menu Toggle
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("active");
    }
  });
}
// Project Data
// --------------------------------------------
const projects = [
  {
    title: "Chauhan Construction Website",
    description:
      "A fully responsive website crafted for Chauhan Construction Company, designed to professionally showcase their services, past projects, and contact information with a smooth user experience across all devices.",
    directLink: "https://chauhan-construction.vercel.app/",
    githubLink:
      "https://github.com/thetirthchauhan/chauhan-construction-company-website",
    video: "assets/CC.mp4",
  },

  {
    title: "Inventory Management System",
    description:
      "A simple and efficient inventory management system for small businesses. It enables users to add products, view stock, and save inventory data, helping streamline product tracking and management.",
    directLink: "https://snazzy-gelato-3d7efa.netlify.app/",
    githubLink:
      "https://github.com/thetirthchauhan",
    video: "assets/comming video.mp4",
  },
  {
    title: "Bill/Invoice Generator",
    description:
      "An efficient billing system designed for small businesses. It generates professional invoices quickly, reduces manual errors, and saves time—perfect for shops, freelancers, and vendors needing fast, reliable billing support.",
    directLink: "https://snazzy-gelato-3d7efa.netlify.app/",
    githubLink:
      "https://github.com/thetirthchauhan",
    video: "assets/comming video.mp4",
  },
  {
    title: "More Projects Gallery",
    description:
      "A collection of my projects showcasing my skills and creativity. Each project is designed to demonstrate my proficiency in web development, UI/UX design, and problem-solving abilities. for more details, please visit my GitHub profile.",
    directLink: "https://github.com/thetirthchauhan",
    githubLink:
      "https://github.com/thetirthchauhan",
    video: "assets/CC.mp4",
  },  
];
function updateProject(projectIndex) {
  const { title, description, directLink, githubLink, video } =
    projects[projectIndex - 1];

  const descriptionElement = document.getElementById("video-description");
  const videoBox = document.getElementById("video-box");
  const videoElement = videoBox.querySelector(".project-video");

  descriptionElement.innerHTML = `
    <p class="intro-text">I have created some projects like...</p>
    <h3 class="project-title">${title}</h3>
    <p class="project-desc">${description}</p>
    <div class="project-links">
      <a href="${directLink}" target="_blank" class="project-button direct-button">Live Demo ↗</a>
      <a href="${githubLink}" target="_blank" class="project-button github-button">View Code ↗</a>
    </div>
  `;

  videoElement.querySelector("source").src = video;
  videoElement.load();
}

document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  startTypingAnimation();
  handleNavbarScroll();
  toggleMenu();

  updateProject(1);

  const cards = document.querySelectorAll(".video-menu .container .card");
  if (cards.length > 0) {
    // Set the first card as active by default
    cards[0].classList.add("active-card");

    // Add hover and click events to each card
    cards.forEach((card) => {
      // On hover (only for splitting, no data change)
      card.addEventListener("mouseenter", function () {
        // Remove active-card from all cards
        cards.forEach(c => c.classList.remove("active-card"));
        // Add active-card to the hovered card
        this.classList.add("active-card");
      });

      // On click (for splitting and data change)
      card.addEventListener("click", function () {
        // Remove active-card from all cards
        cards.forEach(c => c.classList.remove("active-card"));
        // Add active-card to the clicked card
        this.classList.add("active-card");
        // Update project data
        const projectIndex = this.getAttribute("data-project");
        updateProject(projectIndex);
      });
    });
  }

  // Play video when video-box is in view
  const videoBox = document.getElementById("video-box");
  const videoElement = videoBox.querySelector(".project-video");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        videoElement.play();
      }
    });
  }, { threshold: 0.9 }); // Play when 90% of video-box is visible
  observer.observe(videoBox);

  // Initialize AOS
  AOS.init({ disable: 'mobile' });
});
// -------------------------------------------------

// Contact Form
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const result = document.getElementById("result");
  const form = document.getElementById("contact-form");

  // Name validation (required)
  if (!name) {
    alert("Please enter your name.");
    return false;
  }

  // Email validation (basic format)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    alert("Please enter your email.");
    return false;
  } else if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Phone validation (exactly 10 digits)
  const phonePattern = /^\d{10}$/;
  if (!phone) {
    alert("Please enter your phone number.");
    return false;
  } else if (!phonePattern.test(phone)) {
    alert("Phone number must be exactly 10 digits.");
    return false;
  }

  // Subject validation (required)
  if (!subject) {
    alert("Please enter the subject.");
    return false;
  }

  // Message validation (required, max 500 characters)
  if (!message) {
    alert("Please enter your message.");
    return false;
  }
  // else if (message.length > 500) {
  //   alert("Message cannot exceed 500 characters.");
  //   return false;
  // }

  // Web3Forms submission
  const formData = new FormData(form);
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        result.innerHTML = json.message || "Submission failed.";
      }
    })
    .catch((error) => {
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      const button = document.querySelector(".quantum-core");
      button.classList.add("sent"); // Trigger "Sent" animation

      // After 3 seconds, reset the form and revert to "Send Message"
      setTimeout(() => {
        form.reset();
        button.classList.remove("sent"); // Revert to "Send Message"
        result.innerHTML = ""; // Clear result message
      }, 4000); // 3 seconds
    });

  return true;
}

// Restrict phone input to digits only and stop at 10 digits
document.getElementById("phone").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9]/g, ""); // Allow only digits
  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10); // Enforce 10-digit limit
  }
});
