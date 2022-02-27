
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  
  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  
  /**
   * Sticky header on scroll
   */
   const selectHeader = document.querySelector('#header');
   if (selectHeader) {
     document.addEventListener('scroll', () => {
       window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
     });
   }
 
   /**
    * Navbar links active state on scroll
    */
   let navbarlinks = document.querySelectorAll('#navbar .scrollto');
 
   function navbarlinksActive() {
     navbarlinks.forEach(navbarlink => {
 
       if (!navbarlink.hash) return;
 
       let section = document.querySelector(navbarlink.hash);
       if (!section) return;
 
       let position = window.scrollY;
       if (navbarlink.hash != '#header') position += 200;
 
       if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
         navbarlink.classList.add('active');
       } else {
         navbarlink.classList.remove('active');
       }
     })
   }
   window.addEventListener('load', navbarlinksActive);
   document.addEventListener('scroll', navbarlinksActive);
 
   
   /**
    * Mobile nav toggle
    */
   const mobileNavToogle = document.querySelector('.mobile-nav-toggle');
   if (mobileNavToogle) {
     mobileNavToogle.addEventListener('click', function(event) {
       event.preventDefault();
 
       document.querySelector('body').classList.toggle('mobile-nav-active');
 
       this.classList.toggle('bi-list');
       this.classList.toggle('bi-x');
     });
   }
 


  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  
  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

 

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()
