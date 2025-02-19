/**
* Template Name: Dewi
* Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();






function toggleChat() {
  var chatBox = document.getElementById("chatPopup");
  chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";
}

function sendToWhatsApp() {
  var inputField = document.getElementById("userMessage");
  var messageText = inputField.value.trim();
  if (messageText) {
      var phoneNumber = "+237679827840"; // Change to your WhatsApp number
      var whatsappURL = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(messageText);
      window.open(whatsappURL, "_blank");
  } else {
      alert("Please type a message.");
  }
}

function sendToEmail() {
  var inputField = document.getElementById("userMessage");
  var messageText = inputField.value.trim();
  if (messageText) {
      var email = "admin@bicod.org"; // Change to your email
      var subject = "New Chat Message";
      var emailURL = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(messageText);
      window.open(emailURL, "_blank");
  } else {
      alert("Please type a message.");
  }
}



function sendMail() {
  document.querySelector(".loading").style.display = "block"; // Show loading text

  let params = {
    name: document.querySelector("input[name='name']").value,
    email: document.querySelector("input[name='email']").value,
    subject: document.querySelector("input[name='subject']").value,
    message: document.querySelector("textarea[name='message']").value
  };

  emailjs.send("service_z8hmsjn", "template_m8qzeno", params)
    .then(function(response) {
      document.querySelector(".loading").style.display = "none"; // Hide loading
      document.querySelector(".sent-message").style.display = "block"; // Show success message
      document.getElementById("contact-form").reset(); // Clear form
      
      // ✅ Show confirmation alert
      alert("Votre message a été envoyé avec succès!");

    }, function(error) {
      document.querySelector(".loading").style.display = "none"; // Hide loading
      document.querySelector(".error-message").textContent = "Error sending message. Try again!";
      document.querySelector(".error-message").style.display = "block"; // Show error message

      // ❌ Show error alert
      alert("Le message n'a pas été envoyé. Essayez ultérieurement.");
    });
}







  const images = [
      "assets/img/PHOTO DE COUVERTURE 1.jpg",
      "assets/img/PHOTO DE COUVERTURE 2.jpg",
      "assets/img/FORMATION 1.jpg"
  ];

  let currentIndex = 0;
  const imgElement = document.getElementById("slideshow-img");

  function changeImage() {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.style.opacity = 0; // Fade out

      setTimeout(() => {
          imgElement.src = images[currentIndex];
          imgElement.style.opacity = 1; // Fade in
      }, 500); // Transition time (0.5s)
  }

  setInterval(changeImage, 3000); // Change image every 3 seconds