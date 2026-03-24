// Tab skip btn
document.addEventListener("DOMContentLoaded", function () {

  // ===== SKIP LINK (UNCHANGED) =====
  const skipLink = document.getElementById("skip-link");

  function hideSkipLink() {
    skipLink.style.transform = "translateY(-110%)";
  }

  // Hide on TAB press
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      hideSkipLink();
    }
  }, { once: true });

  // Hide on scroll (KEEP THIS ✅)
  window.addEventListener("scroll", hideSkipLink, { once: true });


  // ===== MENU TAB ACCESSIBILITY (NEW ADDITION) =====
  const menuItems = document.querySelectorAll(".menu-item-has-children");

  menuItems.forEach(item => {
    const link = item.querySelector("a");
    const subMenu = item.querySelector(".sub-menu");

    if (!link || !subMenu) return;

    // 👉 TAB focus pe submenu open
    link.addEventListener("focus", () => {
      if (window.innerWidth >= 1025) return;

      item.classList.add("active");
      subMenu.style.maxHeight = subMenu.scrollHeight + "px";
    });

    // 👉 focus bahar gaya → submenu close
    item.addEventListener("focusout", (e) => {
      if (window.innerWidth >= 1025) return;

      if (!item.contains(e.relatedTarget)) {
        item.classList.remove("active");
        subMenu.style.maxHeight = null;
      }
    });
  });

});


// header sticky scroll
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("bg-white", "shadow-md");
  } else {
    header.classList.remove("bg-white", "shadow-md");
  }
});

//   logo slider
const swiper = new Swiper('.logo-slider', {
  loop: true,

  slidesPerView: 4,
  spaceBetween: 25,

  // Enable drag
  grabCursor: true,

  // Responsive
  breakpoints: {
    0: {
      slidesPerView: 2
    },
    576: {
      slidesPerView: 3
    },
    768: {
      slidesPerView: 4
    }
  }
});

// Counter numbers
document.addEventListener("DOMContentLoaded", () => {

  const counters = document.querySelectorAll(".counter");
  const section = document.getElementById("counter-section");

  let started = false;

  const runCounter = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // total animation time
      const stepTime = Math.max(Math.floor(duration / target), 10);

      let count = 0;

      const updateCount = () => {
        count++;
        counter.innerText = count;

        if (count < target) {
          setTimeout(updateCount, stepTime);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        runCounter();
        started = true;
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(section);

});
 

//  play Popup video      
const playBtn = document.getElementById("playBtn");
const modal = document.getElementById("videoModal");
const closeBtn = document.getElementById("closeBtn");
const iframe = document.getElementById("videoFrame");

const videoURL = "https://www.youtube.com/embed/VIDEO_ID?autoplay=1";

playBtn.addEventListener("click", () => {
  modal.classList.remove("opacity-0", "pointer-events-none");
  iframe.src = videoURL;
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("opacity-0", "pointer-events-none");
  iframe.src = ""; 
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("opacity-0", "pointer-events-none");
    iframe.src = "";
  }
});


// review-swiper
const swiper1 = new Swiper('.review-slider', {
  loop: true,

  slidesPerView: 3,
  spaceBetween: 25,

  autoplay: {
    delay: 2500, 
    disableOnInteraction: false, 
  },

  speed: 800,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1
    },
    576: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    }
  }
});

// Accordion
window.addEventListener("load", function () {

  const items = document.querySelectorAll(".accordion-item");

  // ===== Set height for default active =====
  items.forEach(item => {
    if (item.classList.contains("active")) {
      const content = item.querySelector(".accordion-content");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });

  // ===== Click behavior =====
  items.forEach(item => {

    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {

      const isOpen = item.classList.contains("active");

      items.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".accordion-content").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }

    });

  });

});

// mobile menu
document.addEventListener("DOMContentLoaded", function () {

  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("main-menu");
  const allLinks = menu.querySelectorAll("a");

  // ===== MENU TOGGLE =====
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("-translate-y-full");
    menu.classList.toggle("opacity-0");
    menu.classList.toggle("pointer-events-none");
    menuBtn.classList.toggle("active");
  });

  // ===== RESTORE ACTIVE LINK =====
  const activeLink = localStorage.getItem("activeMenu");
  if (activeLink) {
    const link = menu.querySelector(`a[href="${activeLink}"]`);
    if (link) link.classList.add("text-(--button-bg)");
  }

  // ===== MENU CLICK =====
  menu.addEventListener("click", function (e) {

    if (window.innerWidth >= 1025) return;

    const clickedLink = e.target.closest("a");
    if (!clickedLink) return;

    const parentItem = clickedLink.closest(".menu-item-has-children");

    // ===== CHECK IF ARROW CLICK =====
    const rect = clickedLink.getBoundingClientRect();
    const clickX = e.clientX;
    const isArrowClick = parentItem && (rect.right - clickX < 30);

    // ===== ARROW CLICK → OPEN SUBMENU =====
    if (parentItem && isArrowClick) {
      e.preventDefault();

      const subMenu = parentItem.querySelector(".sub-menu");
      const parentLink = parentItem.querySelector("a");

      // ❗ remove blue when opening submenu
      parentLink.classList.remove("text-(--button-bg)");

      if (parentItem.classList.contains("active")) {
        subMenu.style.maxHeight = null;
        parentItem.classList.remove("active");
      } else {
        subMenu.style.maxHeight = subMenu.scrollHeight + "px";
        parentItem.classList.add("active");
      }

      return;
    }

    // ===== NORMAL LINK CLICK → GO TO PAGE =====

    // store active link
    localStorage.setItem("activeMenu", clickedLink.getAttribute("href"));

    // remove all active dropdown states
    document.querySelectorAll(".menu-item-has-children").forEach(item => {
      item.classList.remove("active");
      const sub = item.querySelector(".sub-menu");
      if (sub) sub.style.maxHeight = null;
    });

    // apply active color (blue)
    allLinks.forEach(l => l.classList.remove("text-(--button-bg)"));
    clickedLink.classList.add("text-(--button-bg)");

    // close menu
    menu.classList.add("-translate-y-full", "opacity-0", "pointer-events-none");
    menuBtn.classList.remove("active");

  });

});
