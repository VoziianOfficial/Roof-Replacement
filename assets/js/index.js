document.addEventListener("DOMContentLoaded", () => {
    const searchData = [
        {
            title: "Roof Assessment",
            keywords: ["assessment", "inspection", "roof inspection", "roof check", "estimate"],
            url: "roof-assessment.html",
        },
        {
            title: "Roof Installation",
            keywords: ["installation", "new roof", "install", "roof install"],
            url: "roof-installation.html",
        },
        {
            title: "Roof Restoration",
            keywords: ["restoration", "repair", "roof repair", "restore", "leak repair"],
            url: "roof-restoration.html",
        },
        {
            title: "Full Roof Replacement",
            keywords: ["replacement", "roof replacement", "full replacement", "replace roof"],
            url: "full-roof-replacement.html",
        },
        {
            title: "Emergency Roof Damage",
            keywords: ["storm", "damage", "emergency", "leak", "urgent", "roof damage"],
            url: "emergency-roof-damage.html",
        },
        {
            title: "About RTB",
            keywords: ["about", "company", "team", "who we are"],
            url: "about.html",
        },
        {
            title: "Services",
            keywords: ["services", "all services", "roofing services"],
            url: "services.html",
        },
        {
            title: "Contact",
            keywords: ["contact", "phone", "email", "estimate", "quote"],
            url: "contact.html",
        },
    ];

    const searchResults = document.getElementById("searchResults");
    const siteSearchForm = document.getElementById("siteSearchForm");
    const siteSearchInput = document.getElementById("siteSearchInput");
    const heroSearchForm = document.getElementById("heroSearchForm");
    const heroSearchInput = document.getElementById("heroSearchInput");

    const renderSearchResults = (results) => {
        if (!searchResults) return;

        if (!results.length) {
            searchResults.innerHTML = `<span class="chip">No matching pages found</span>`;
            return;
        }

        searchResults.innerHTML = results
            .map(
                (item) => `
          <a href="${item.url}" class="chip">${item.title}</a>
        `
            )
            .join("");
    };

    const findMatches = (query) => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return searchData;
        }

        return searchData.filter((item) => {
            const inTitle = item.title.toLowerCase().includes(normalizedQuery);
            const inKeywords = item.keywords.some((keyword) =>
                keyword.toLowerCase().includes(normalizedQuery)
            );

            return inTitle || inKeywords;
        });
    };

    if (siteSearchInput) {
        siteSearchInput.addEventListener("input", (event) => {
            const matches = findMatches(event.target.value);
            renderSearchResults(matches);
        });
    }

    if (siteSearchForm && siteSearchInput) {
        siteSearchForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const matches = findMatches(siteSearchInput.value);

            if (matches.length) {
                window.location.href = matches[0].url;
            } else {
                renderSearchResults([]);
            }
        });
    }

    if (heroSearchForm && heroSearchInput) {
        heroSearchForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const matches = findMatches(heroSearchInput.value);

            if (matches.length) {
                window.location.href = matches[0].url;
            } else if (searchResults) {
                renderSearchResults([]);
                const searchPanel = document.getElementById("searchPanel");
                const searchToggle = document.getElementById("searchToggle");

                if (searchPanel) searchPanel.classList.add("is-open");
                if (searchToggle) searchToggle.setAttribute("aria-expanded", "true");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    }

    renderSearchResults(searchData);

    if (window.Swiper) {
        new Swiper("#reviewsSlider", {
            loop: true,
            speed: 700,
            spaceBetween: 18,
            slidesPerView: 1,
            navigation: {
                nextEl: ".reviews-next",
                prevEl: ".reviews-prev",
            },
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1100: {
                    slidesPerView: 3,
                },
            },
        });
    }

    const mapElement = document.getElementById("map");

    if (mapElement && window.L) {
        const officeCoordinates = [40.7549, -73.9865];

        const map = L.map("map", {
            scrollWheelZoom: false,
        }).setView(officeCoordinates, 14);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        const marker = L.marker(officeCoordinates).addTo(map);

        marker.bindPopup(
            `
      <strong>Roof Replacement RTB</strong><br>
      1450 Broadway, New York, NY 10018
      `
        );
    }
});