(function () {
    var hasAnimation = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    if (hasAnimation) gsap.registerPlugin(ScrollTrigger);
    var linearQuery = window.matchMedia('(max-width: 1023px), (max-height: 640px), (prefers-reduced-motion: reduce)');
    var sectionIds = ['hero', 'projects', 'experience', 'about', 'skills', 'educacion', 'contact'];
    var noteNames = ['inicio', 'proyectos', 'experiencia', 'sobre-mi', 'stack', 'educacion', 'contacto'];
    var observer;
    var activeIndex = 0;

    function isLinear() { return linearQuery.matches || !hasAnimation; }

    function setActive(index) {
        activeIndex = index;
        navItems.forEach(function (item, i) {
            item.classList.toggle('is-active', i === index);
            if (i === index) item.setAttribute('aria-current', 'location');
            else item.removeAttribute('aria-current');
        });
        document.getElementById('currentNote').textContent = noteNames[index] + '.md';
        document.getElementById('sectionStatus').textContent = '0' + (index + 1) + ' / 07';
    }

    var canvas = document.getElementById('canvas');
    var navItems = document.querySelectorAll('.nav__item');
    var directionArrow = document.getElementById('directionArrow');
    var sectionNames = ['hero', 'projects', 'experience', 'about', 'skills', 'blog', 'contact'];
    var sectionProgress = [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1.0];
    var activated = {};
    var gsapCtx;

    function init() {
        if (gsapCtx) gsapCtx.revert();
        activated = {};
        if (observer) observer.disconnect();
        document.body.classList.toggle('linear-layout', !hasAnimation);

        if (isLinear()) {
            initMobile();
        } else {
            initDesktop();
        }
    }

    function initDesktop() {
        gsapCtx = gsap.context(function () {
            var vw = window.innerWidth;
            var vh = window.innerHeight;

            // Position canvas so Hero is visible
            gsap.set(canvas, { x: 0, y: -3 * vh, visibility: 'visible' });

            // Set initial animation states per direction of travel
            gsap.set('.section--hero .animate-in',       { opacity: 0, y: 20 });
            gsap.set('.section--projects .animate-in',   { opacity: 0, x: 20 });
            gsap.set('.section--experience .animate-in', { opacity: 0, y: -20 });
            gsap.set('.section--about .animate-in',      { opacity: 0, x: 20 });
            gsap.set('.section--skills .animate-in',     { opacity: 0, y: -20 });
            gsap.set('.section--blog .animate-in',       { opacity: 0, x: 20 });
            gsap.set('.section--contact .animate-in',    { opacity: 0, y: -20 });

            // Animate hero content in on load
            gsap.to('.section--hero .animate-in', {
                opacity: 1, y: 0,
                duration: 0.8, stagger: 0.1, delay: 0.3,
                ease: 'power2.out'
            });
            activated.hero = true;

            // Build the zigzag path timeline
            var tl = gsap.timeline();

            // Segment 1: Hero → Projects (right)
            tl.to(canvas, { x: -vw, ease: 'power2.inOut', duration: 1 });
            // Segment 2: Projects → Experience (up)
            tl.to(canvas, { y: -2 * vh, ease: 'power2.inOut', duration: 1 });
            // Segment 3: Experience → About (right)
            tl.to(canvas, { x: -2 * vw, ease: 'power2.inOut', duration: 1 });
            // Segment 4: About → Skills (up)
            tl.to(canvas, { y: -vh, ease: 'power2.inOut', duration: 1 });
            // Segment 5: Skills → Blog (right)
            tl.to(canvas, { x: -3 * vw, ease: 'power2.inOut', duration: 1 });
            // Segment 6: Blog → Contact (up)
            tl.to(canvas, { y: 0, ease: 'power2.inOut', duration: 1 });

            ScrollTrigger.create({
                animation: tl,
                trigger: '.scroll-track',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.8,
                onUpdate: function (self) {
                    var p = self.progress;
                    updateNav(p);
                    updateArrow(p);
                    checkActivation(p);
                }
            });
        });
    }

    function initMobile() {
        canvas.style.visibility = 'visible';
        observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) setActive(sectionIds.indexOf(entry.target.id));
            });
        }, { rootMargin: '-25% 0px -50% 0px', threshold: 0 });
        document.querySelectorAll('.section').forEach(function (section) { observer.observe(section); });
    }

    function updateNav(progress) {
        var closest = 0;
        var minDist = 2;
        for (var i = 0; i < sectionProgress.length; i++) {
            var d = Math.abs(progress - sectionProgress[i]);
            if (d < minDist) {
                minDist = d;
                closest = i;
            }
        }
        setActive(closest);
    }

    function updateArrow(progress) {
        // 6 segmentos alternando derecha / arriba; el +0.01 gira la flecha justo antes del quiebre
        var segment = Math.min(5, Math.floor((progress + 0.01) * 6));
        var isVertical = segment % 2 === 1;
        directionArrow.classList.toggle('point-up', isVertical);

        // Fade out near the end
        if (progress > 0.95) {
            directionArrow.style.opacity = String(Math.max(0, 1 - (progress - 0.95) / 0.05));
        } else {
            directionArrow.style.opacity = '1';
        }
    }

    function checkActivation(progress) {
        for (var i = 0; i < sectionNames.length; i++) {
            var name = sectionNames[i];
            if (activated[name]) continue;
            if (Math.abs(progress - sectionProgress[i]) < 0.1) {
                activated[name] = true;
                var sel = '.section--' + name + ' .animate-in';
                gsap.to(sel, {
                    opacity: 1, x: 0, y: 0,
                    duration: 0.6, stagger: 0.1,
                    ease: 'power2.out'
                });
            }
        }
    }

    function navigate(index, behavior) {
        if (isLinear()) {
            document.getElementById(sectionIds[index]).scrollIntoView({ behavior: behavior, block: 'start' });
        } else {
            var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({ top: sectionProgress[index] * maxScroll, behavior: behavior });
        }
        setActive(index);
    }

    navItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var index = parseInt(item.dataset.index, 10);
            history.replaceState(null, '', '#' + sectionIds[index]);
            navigate(index, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
        });
    });

    window.addEventListener('hashchange', function () {
        var index = sectionIds.indexOf(window.location.hash.slice(1));
        if (index >= 0) navigate(index, 'auto');
    });

    init();
    setActive(0);
    var initialIndex = sectionIds.indexOf(window.location.hash.slice(1));
    if (initialIndex >= 0) requestAnimationFrame(function () { navigate(initialIndex, 'auto'); });

    linearQuery.addEventListener('change', function () {
        var index = activeIndex;
        init();
        navigate(index, 'auto');
    });

    // Debounced resize
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            var index = activeIndex;
            init();
            navigate(index, 'auto');
        }, 300);
    });
})();
