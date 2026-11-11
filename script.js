(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.hamburger');
  var navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    var setMenu = function (open) {
      navLinks.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('open'));
    });

    // Close the menu after tapping a link
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- Rotating slides (hero on home, photos on about) ---------- */
  function rotate(items, interval) {
    if (items.length < 2 || reduceMotion) return;
    var current = 0;
    setInterval(function () {
      items[current].classList.remove('active');
      current = (current + 1) % items.length;
      items[current].classList.add('active');
    }, interval);
  }

  rotate(document.querySelectorAll('.slide'), 3000);
  rotate(document.querySelectorAll('.about-slides img'), 3000);

  /* ---------- Customer reviews (home page only) ---------- */
  var form = document.getElementById('review-form');

  if (form) {
    var list = document.getElementById('review-list');
    var status = document.getElementById('review-status');
    var nameInput = document.getElementById('review-name');
    var textInput = document.getElementById('review-text');

    var setStatus = function (message, type) {
      status.textContent = message;
      status.className = 'form-status ' + type;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = nameInput.value.trim();
      var comment = textInput.value.trim();

      if (name === '' || comment === '') {
        setStatus('Please enter both your name and a comment.', 'error');
        return;
      }

      // textContent (not innerHTML) so visitors can't inject HTML or scripts
      var item = document.createElement('div');
      item.className = 'review-item';

      var heading = document.createElement('h4');
      heading.textContent = name;

      var body = document.createElement('p');
      body.textContent = comment;

      item.appendChild(heading);
      item.appendChild(body);

      var empty = list.querySelector('.review-empty');
      if (empty) empty.remove();

      list.prepend(item);
      form.reset();
      setStatus('Thank you for your review!', 'success');
    });
  }

  /* ---------- Scroll reveal ---------- */
  var targets = document.querySelectorAll('.fade-in, .fade-left, .fade-right');

  if ('IntersectionObserver' in window && !reduceMotion && targets.length) {
    root.classList.add('js');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  // /* ---------- Footer year ---------- */
  // var year = document.getElementById('year');
  // if (year) year.textContent = new Date().getFullYear();
})();