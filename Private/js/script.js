// JavaScript Magic Happens here!

// I always use a function to make sure that my (.html) is linked with my (.js) file or not?

const buildConnection = () => {
  console.log(
    '%c Follow an Uncommon set of Rules and just Keep Coding.',
    'font-size: 2rem; color: #e67e22'
  );
};

// buildConnection();

// =========== Make Active Link ===========

// Make mobile navigation work

const btnNavEl = document.querySelector('.navbar__menu-btns');
const headerEl = document.querySelector('.header__container');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('menu__open');
});

/** =========== SMOOTH SCROLLING ANIMATION ============ */
function smoothScrolling() {
  const allLinks = document.querySelectorAll('a:link');

  allLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = link.getAttribute('href');

      // Scroll back to top
      if (href === '#')
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

      // Scroll to other links
      if (href !== '#' && href.startsWith('#')) {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      }

      // Scroll to other pages
      if (href !== '#') {
        window.open(href, '_self');
      }

      // Close mobile naviagtion
      const headerEl = document.querySelector('.header__container');
      if (link.classList.contains('navbar__link'))
        headerEl.classList.toggle('menu__open');
    });
  });
}
smoothScrolling();

// Sticky navigation

const sectionHeroEl = document.querySelector('.section__hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky');
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove('sticky');
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);

obs.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}

checkFlexGap();

// Set current year
const yearEl = document.querySelector('.footer__year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;
