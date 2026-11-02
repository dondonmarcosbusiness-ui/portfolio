/* MIRA Portfolio — Dark Editorial interactions */

(function () {
    'use strict';

    /* ---------- Mobile menu ---------- */
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const open = menu.hasAttribute('hidden');
            if (open) {
                menu.removeAttribute('hidden');
            } else {
                menu.setAttribute('hidden', '');
            }
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
        });

        menu.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => {
                menu.setAttribute('hidden', '');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Active rail link on scroll ---------- */
    const sections = document.querySelectorAll('section[id]');
    const railLinks = document.querySelectorAll('.rail-link');

    const updateActive = () => {
        const y = window.scrollY + window.innerHeight * 0.3;
        let current = '';
        sections.forEach((s) => {
            if (s.offsetTop <= y) current = s.id;
        });
        railLinks.forEach((l) => {
            l.classList.toggle('active', l.dataset.section === current);
        });
    };
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    /* ---------- Reveal on scroll ---------- */
    const reveals = document.querySelectorAll(
        '.ed-block, .story, .story-card, .timeline li, .task-block, .owner, .svc-list li, .logo-stage, .proc, .sym, .pal-swatch, .type-panel, .ig-post, .spec, .poster, .chapter-head'
    );
    reveals.forEach((el) => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );
        reveals.forEach((el) => io.observe(el));
    } else {
        reveals.forEach((el) => el.classList.add('visible'));
    }

    /* ---------- Like button ---------- */
    const likeBtn = document.querySelector('[data-like]');
    const likeCount = document.getElementById('likeCount');
    let liked = false;
    let likes = 1248;

    if (likeBtn && likeCount) {
        likeBtn.addEventListener('click', () => {
            liked = !liked;
            likes += liked ? 1 : -1;
            likeBtn.classList.toggle('liked', liked);
            likeBtn.setAttribute('aria-pressed', String(liked));
            likeCount.textContent = likes.toLocaleString() + ' likes';
        });
    }

    /* ---------- Smooth anchor scroll ---------- */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (!id || id === '#') return;
            const t = document.querySelector(id);
            if (!t) return;
            e.preventDefault();
            const top = t.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();
