
// ============================
// DOM Elements
// ============================

const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const contactForm = document.getElementById("contact-form")
const sections = document.querySelectorAll("section[id]")

// ============================
// Create Stars
// ============================

function createStars() {
  const starsContainer = document.getElementById("stars")
  const stars2Container = document.getElementById("stars2")
  const stars3Container = document.getElementById("stars3")

  if (!starsContainer || !stars2Container || !stars3Container) return

  starsContainer.innerHTML = ""
  stars2Container.innerHTML = ""
  stars3Container.innerHTML = ""

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
    `
    starsContainer.appendChild(star)
  }

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
    `
    stars2Container.appendChild(star)
  }

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
    `
    stars3Container.appendChild(star)
  }
}

createStars()

// ============================
// Parallax Stars
// ============================

let ticking = false

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset
      const stars = document.getElementById("stars")
      const stars2 = document.getElementById("stars2")
      const stars3 = document.getElementById("stars3")

      if (stars && stars2 && stars3) {
        stars.style.transform = `translateY(${scrolled * 0.3}px)`
        stars2.style.transform = `translateY(${scrolled * 0.2}px)`
        stars3.style.transform = `translateY(${scrolled * 0.1}px)`
      }

      ticking = false
    })
    ticking = true
  }
})

// ============================
// Mobile Navigation
// ============================

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active")
    navMenu.classList.toggle("active")
  })
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navToggle && navMenu) {
      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
})

document.addEventListener("click", (e) => {
  if (navMenu && navToggle) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
    }
  }
})

// ============================
// Navbar Scroll Effect
// ============================

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (navbar) {
    if (currentScroll > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }
})

// ============================
// Active Nav Link on Scroll
// ============================

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

// ============================
// Smooth Scroll
// ============================

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

// ============================
// Contact Form (SAFE VERSION)
// ============================

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    if (!name || !email || !message) {
      alert("Mohon lengkapi semua field!")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Email tidak valid!")
      return
    }

    alert("Pesan berhasil dikirim!")
    contactForm.reset()
  })
}

// ============================
// Skills Tab (FIXED)
// ============================

const skillTabs = document.querySelectorAll(".skill-tab")
const skillPanels = document.querySelectorAll(".skill-panel")

skillTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    skillTabs.forEach((t) => t.classList.remove("active"))
    skillPanels.forEach((p) => p.classList.remove("active"))

    tab.classList.add("active")

    const panelId = tab.getAttribute("data-tab")
    const targetPanel = document.getElementById(panelId)

    if (targetPanel) {
      targetPanel.classList.add("active")
    }
  })
})
