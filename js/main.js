/* ============================================================
   THE TEA JOURNEY — Main Controller
   Scroll animations, navigation, lazy initialization
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ---- Navigation ---- */
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');

    navToggle.addEventListener('click', function () {
        navList.classList.toggle('open');
    });

    // Close nav when clicking a link
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navList.classList.remove('open'));
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.chapter-nav')) {
            navList.classList.remove('open');
        }
    });

    /* ---- Progress Bar ---- */
    const progressBar = document.getElementById('progressBar');

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }

    /* ---- Active nav highlighting ---- */
    const chapters = document.querySelectorAll('.chapter, .hero');
    const navLinks = document.querySelectorAll('.nav-list a');

    function updateActiveNav() {
        const scrollPos = window.scrollY + window.innerHeight / 3;

        chapters.forEach((chapter) => {
            const top = chapter.offsetTop;
            const bottom = top + chapter.offsetHeight;
            const id = chapter.id;

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ---- Scroll-triggered animations (Intersection Observer) ---- */
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px',
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    /* ---- Separate observer for maps, charts, and SVGs ---- */
    /* Uses a generous rootMargin to pre-initialize before scrolling into view */
    const interactiveElements = document.querySelectorAll('.map-container, .chart-container, .knowledge-tree');

    const interactiveObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const mapEl = entry.target.querySelector('.map');
                if (mapEl && mapEl.id) {
                    initMapIfVisible(mapEl.id);
                }
                const canvas = entry.target.querySelector('canvas');
                if (canvas && canvas.id) {
                    initChartIfVisible(canvas.id);
                }
                const svg = entry.target.querySelector('#treeSvg');
                if (svg) {
                    initChartIfVisible('treeSvg');
                }
                interactiveObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.01,
        rootMargin: '200px 0px 200px 0px',
    });

    interactiveElements.forEach(el => interactiveObserver.observe(el));

    /* ---- Timeline items animation ---- */
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -30px 0px',
    });

    timelineItems.forEach(item => timelineObserver.observe(item));

    /* ---- Scroll listener (throttled) ---- */
    let ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateProgress();
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial state
    updateProgress();
    updateActiveNav();

    /* ---- Fallback: ensure maps/charts init on first significant scroll ---- */
    let mapsInitialized = false;
    function initAllMapsAndCharts() {
        if (mapsInitialized) return;
        mapsInitialized = true;
        Object.keys(MAP_INITIALIZERS).forEach(function(k) {
            MAP_INITIALIZERS[k]();
            setTimeout(function() { if (MAPS[k]) MAPS[k].invalidateSize(); }, 400);
        });
        Object.keys(CHART_INITIALIZERS).forEach(function(k) {
            CHART_INITIALIZERS[k]();
        });
    }
    // Init all maps once user scrolls past the hero
    window.addEventListener('scroll', function onFirstScroll() {
        if (window.scrollY > 200) {
            initAllMapsAndCharts();
            window.removeEventListener('scroll', onFirstScroll);
        }
    });
    // Safety net: init everything after 3 seconds regardless
    setTimeout(initAllMapsAndCharts, 3000);

    /* ---- Smooth scroll for anchor links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---- Parallax-like effect on hero ---- */
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function () {
        if (window.scrollY < window.innerHeight) {
            const offset = window.scrollY * 0.3;
            heroContent.style.transform = `translateY(${offset}px)`;
            heroContent.style.opacity = 1 - (window.scrollY / (window.innerHeight * 0.8));
        }
    });
});
