const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

const setMenuExpanded = (isExpanded) => {
    if (!menuToggle) return;
    menuToggle.setAttribute('aria-expanded', String(isExpanded));
};

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        setMenuExpanded(nav.classList.contains('active'));
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav || !menuToggle) return;
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        setMenuExpanded(false);
    }
});

// Page switching (no scrolling)
const pages = Array.from(document.querySelectorAll('.page'));
const navLinks = Array.from(document.querySelectorAll('nav a'));

const setActiveLink = (hash) => {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === hash;
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
};

const showPage = (hash) => {
    const targetHash = (hash && hash !== '#') ? hash : '#home';
    const target = document.querySelector(targetHash);
    if (!target || !target.classList.contains('page')) return;

    pages.forEach((p) => p.classList.remove('is-active'));
    target.classList.add('is-active');
    setActiveLink(targetHash);
};

navLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
        const hash = a.getAttribute('href') || '#home';
        if (!hash.startsWith('#')) return;
        e.preventDefault();

        showPage(hash);
        history.replaceState(null, '', hash);

        if (nav) {
            nav.classList.remove('active');
            setMenuExpanded(false);
        }
    });
});

// Other in-page hash links (hero buttons)
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    if (a.closest('nav')) return;
    if (a.classList.contains('skip-link')) return;

    a.addEventListener('click', (e) => {
        const hash = a.getAttribute('href') || '';
        if (!hash.startsWith('#') || hash === '#') return;
        const target = document.querySelector(hash);
        if (!target || !target.classList.contains('page')) return;

        e.preventDefault();
        showPage(hash);
        history.replaceState(null, '', hash);
    });
});

window.addEventListener('hashchange', () => {
    showPage(window.location.hash);
});

// Init
showPage(window.location.hash);

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}