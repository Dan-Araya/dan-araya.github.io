(function () {
    var pageLanguage = document.documentElement.lang;
    var url = new URL(window.location.href);
    var requestedLanguage = url.searchParams.get('lang');
    var preferenceKey = 'portfolio-language';
    var savedLanguage;

    try {
        if (requestedLanguage === pageLanguage) {
            localStorage.setItem(preferenceKey, requestedLanguage);
            url.searchParams.delete('lang');
            history.replaceState(null, '', url);
        }
        savedLanguage = localStorage.getItem(preferenceKey);
    } catch {
        // The language links also work when storage is unavailable.
    }

    var browserLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
    var preferredLanguage = savedLanguage || (/^es(?:-|$)/i.test(browserLanguage) ? 'es' : 'en');
    if (pageLanguage === 'es' && requestedLanguage !== 'es' && preferredLanguage === 'en') {
        var alternate = document.querySelector('link[rel="alternate"][hreflang="en"]');
        var englishUrl = new URL(alternate.href);
        englishUrl.search = url.search;
        englishUrl.hash = url.hash;
        window.location.replace(englishUrl);
        return;
    }

    document.addEventListener('click', function (event) {
        var link = event.target.closest('.workspace-language');
        if (!link) return;

        var destination = new URL(link.href);
        var current = new URL(window.location.href);
        current.searchParams.set('lang', link.hreflang);
        destination.search = current.search;
        destination.hash = current.hash;
        link.href = destination.href;
    });
})();
