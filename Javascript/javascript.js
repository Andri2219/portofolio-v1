// IIFE untuk mengisolasi variabel dan menghindari polusi global
(function() {
  // Fungsi untuk throttling event scroll
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Fungsi untuk menangani menu mobile
  function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('menu');
  
    mobileMenuButton.addEventListener('click', function() {
      menu.classList.toggle('hidden');
      this.classList.toggle('open');  // Toggle class 'open' untuk animasi
    });
  
    
  function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('menu');

    mobileMenuButton.addEventListener('click', function() {
      menu.classList.toggle('hidden');
    });

    document.querySelectorAll('#menu a').forEach(item => {
      item.addEventListener('click', function() {
        if (!menu.classList.contains('hidden') && window.innerWidth < 768) {
          menu.classList.add('hidden');
        }
      });
    });
  }
}

  // Fungsi untuk menangani navigasi aktif
  function setupActiveNavigation() {
    const sections = ['about', 'projects', 'blogs', 'contact'];
    const links = sections.map(section => document.getElementById(`${section}-link`));

    function setActiveLink() {
      let current = '';
      let scrollPosition = window.scrollY;

      if (scrollPosition < 100) {
        current = 'about';
      } else {
        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              current = section;
            }
          }
        });
      }

      links.forEach(link => {
        const isActive = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', isActive);
        link.classList.toggle('bg-green-500/50', isActive);
        link.classList.toggle('text-gray-300', !isActive);
      });
    }

    window.addEventListener('scroll', throttle(setActiveLink, 100));
    setActiveLink(); // Panggil sekali untuk set state awal
  }

  // Fungsi untuk animasi pengetikan
  function setupTypeAnimation() {
    const messages = [
      `if (learn && practice){ 
        skill++; 
      }`
    ];

    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.getElementById('cursor');
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentMessage = messages[messageIndex];

      if (isDeleting) {
        typedTextElement.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          messageIndex = (messageIndex + 1) % messages.length;
          setTimeout(type, 1000);
        } else {
          setTimeout(type, 30);
        }
      } else {
        typedTextElement.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentMessage.length) {
          isDeleting = true;
          setTimeout(type, 3000);
        } else {
          setTimeout(type, Math.random() * 150 + 50);
        }
      }
    }

    setTimeout(type, 1000);
  }

  // Fungsi untuk interaksi skill
  function setupSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillDescription = document.getElementById('skillDescription');

    const descriptions = {
      'HTML': 'The backbone of web pages, providing structure and semantics.',
      'CSS': 'Styles and layouts that bring designs to life.',
      'Tailwind CSS': 'Utility-first framework for rapid UI development.',
      'JavaScript': 'Adds interactivity and dynamic behavior to web apps.'
    };

    skillItems.forEach(item => {
      const skillText = item.querySelector('p');
      item.addEventListener('mouseenter', () => {
        const skill = item.getAttribute('data-skill');
        skillDescription.textContent = descriptions[skill];
        skillDescription.style.opacity = '1';
        skillDescription.style.transform = 'translateY(0)';

        skillText.style.opacity = '1';
        item.style.transform = 'translateY(-10px)';
      });

      item.addEventListener('mouseleave', () => {
        skillDescription.style.opacity = '0';
        skillDescription.style.transform = 'translateY(4px)';

        skillText.style.opacity = '0';
        item.style.transform = 'translateY(0)';
      });
    });
  }

  // Fungsi untuk menangani formulir kontak
  function setupContactForm() {
    document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();
      this.reset();

      const toast = document.createElement('div');
      toast.innerHTML = '✉️ Pesan terkirim!';
      toast.className = 'fixed bottom-4 right-4 bg-teal-500 text-white text-sm py-2 px-4 rounded-full shadow-lg transform translate-y-0 opacity-100 transition-all duration-500';
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('translate-y-16', 'opacity-0');
        setTimeout(() => document.body.removeChild(toast), 500);
      }, 3000);
    });
  }

  // Fungsi untuk animasi reveal
  function setupRevealAnimations() {
    function revealWithDelay(el, delay) {
      setTimeout(() => {
        el.classList.add('animate__animated', 'animate__fadeInUp');
      }, delay);
    }

    const sections = document.querySelectorAll('.glassmorphism, .bg-[#334155]');
    sections.forEach((el, i) => revealWithDelay(el, i * 200));
  }

  // Inisialisasi semua fitur saat DOM selesai dimuat
  document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    setupActiveNavigation();
    setupSkillInteractions();
    setupContactForm();
  });

  // Inisialisasi fitur yang memerlukan semua aset dimuat
  window.addEventListener('load', function() {
    setupTypeAnimation();
    setupRevealAnimations();
  });
})();