// DOM Elements
const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const contactForm = document.getElementById("contact-form")
const sections = document.querySelectorAll("section[id]")

function createStars() {
  const starsContainer = document.getElementById("stars")
  const stars2Container = document.getElementById("stars2")
  const stars3Container = document.getElementById("stars3")

  if (!starsContainer || !stars2Container || !stars3Container) return

  // Clear existing stars
  starsContainer.innerHTML = ""
  stars2Container.innerHTML = ""
  stars3Container.innerHTML = ""

  // Create small stars (layer 1 - fastest)
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div")
    star.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      background: white;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 200}%;
      opacity: ${Math.random() * 0.8 + 0.2};
      box-shadow: 0 0 ${Math.random() * 3 + 1}px rgba(255, 255, 255, 0.8);
    `
    starsContainer.appendChild(star)
  }

  // Create medium stars (layer 2 - medium speed)
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div")
    star.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 200}%;
      opacity: ${Math.random() * 0.7 + 0.3};
      box-shadow: 0 0 ${Math.random() * 4 + 2}px rgba(167, 139, 250, 0.6);
    `
    stars2Container.appendChild(star)
  }

  // Create large stars (layer 3 - slowest)
  for (let i = 0; i < 25; i++) {
    const star = document.createElement("div")
    star.style.cssText = `
      position: absolute;
      width: 3px;
      height: 3px;
      background: white;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 200}%;
      opacity: ${Math.random() * 0.6 + 0.4};
      box-shadow: 0 0 ${Math.random() * 6 + 3}px rgba(139, 92, 246, 0.8);
    `
    stars3Container.appendChild(star)
  }
}

// Initialize stars on load
createStars()

// ==================== //
// ==================== //
let ticking = false

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset
      const stars = document.getElementById("stars")
      const stars2 = document.getElementById("stars2")
      const stars3 = document.getElementById("stars3")

      if (stars && stars2 && stars3) {
        // Different parallax speeds for depth effect
        stars.style.transform = `translateY(${scrolled * 0.3}px)`
        stars2.style.transform = `translateY(${scrolled * 0.2}px)`
        stars3.style.transform = `translateY(${scrolled * 0.1}px)`
      }

      ticking = false
    })
    ticking = true
  }
})

// Mobile Navigation Toggle
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  }
})

// Navbar Scroll Effect
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Active Navigation Link on Scroll
function setActiveNavLink() {
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", setActiveNavLink)
window.addEventListener("load", setActiveNavLink)

// Smooth Scroll for Navigation Links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Scroll Reveal Animation
function revealOnScroll() {
  const elements = document.querySelectorAll(".skill-category, .timeline-item, .project-card, .publication-card")
  const windowHeight = window.innerHeight

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const revealPoint = 150

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("revealed")
    }
  })
}

// Add CSS for reveal animation
const style = document.createElement("style")
style.textContent = `
    .skill-category,
    .timeline-item,
    .project-card,
    .publication-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .skill-category.revealed,
    .timeline-item.revealed,
    .project-card.revealed,
    .publication-card.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .timeline-item:nth-child(1) { transition-delay: 0.1s; }
    .timeline-item:nth-child(2) { transition-delay: 0.2s; }
    .timeline-item:nth-child(3) { transition-delay: 0.3s; }
    
    .skill-category:nth-child(1) { transition-delay: 0.1s; }
    .skill-category:nth-child(2) { transition-delay: 0.2s; }
    .skill-category:nth-child(3) { transition-delay: 0.3s; }
    
    .project-card:nth-child(1) { transition-delay: 0.1s; }
    .project-card:nth-child(2) { transition-delay: 0.2s; }
    .project-card:nth-child(3) { transition-delay: 0.3s; }
    .project-card:nth-child(4) { transition-delay: 0.4s; }
`
document.head.appendChild(style)

window.addEventListener("scroll", revealOnScroll)
window.addEventListener("load", revealOnScroll)

// Contact Form Handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Basic validation
  if (!name || !email || !message) {
    showNotification("Mohon lengkapi semua field!", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Email tidak valid!", "error")
    return
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Mengirim..."
  submitBtn.disabled = true

  setTimeout(() => {
    showNotification("Pesan berhasil dikirim! Terima kasih.", "success")
    contactForm.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 1500)
})

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification
function showNotification(message, type) {
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Add styles
  notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        background-color: ${type === "success" ? "#64ffda" : "#ff6b6b"};
        color: ${type === "success" ? "#0a192f" : "#fff"};
    `

  document.body.appendChild(notification)

  // Add animation keyframes
  if (!document.querySelector("#notification-styles")) {
    const notificationStyles = document.createElement("style")
    notificationStyles.id = "notification-styles"
    notificationStyles.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `
    document.head.appendChild(notificationStyles)
  }

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease forwards"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

// Typing Effect for Role Title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.textContent = ""

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect on load
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80)
    }, 500)
  }
})

// Parallax Effect for Profile
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero")
  const scrolled = window.pageYOffset

  if (hero && scrolled < hero.offsetHeight) {
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`
  }
})

// Skills tab functionality
const skillTabs = document.querySelectorAll(".skill-tab")
const skillPanels = document.querySelectorAll(".skill-panel")

skillTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and panels
    skillTabs.forEach((t) => t.classList.remove("active"))
    skillPanels.forEach((p) => p.classList.remove("active"))

    // Add active class to clicked tab and corresponding panel
    tab.classList.add("active")
    const panelId = tab.getAttribute("data-tab")
    document.getElementById(panelId).classList.add("active")
  })
})
