document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.getElementById("siteHeader");
    const burgerButton = document.getElementById("burgerButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuClose = document.getElementById("mobileMenuClose");
    const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");
    const searchToggle = document.getElementById("searchToggle");
    const searchPanel = document.getElementById("searchPanel");
    const currentYear = document.getElementById("currentYear");
    const faqItems = document.querySelectorAll(".faq-item");
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu__link");

    const setHeaderState = () => {
        if (!header) return;
        if (window.scrollY > 24) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState);

    const closeSearchPanel = () => {
        if (!searchPanel || !searchToggle) return;
        searchPanel.classList.remove("is-open");
        searchToggle.setAttribute("aria-expanded", "false");
    };

    const openSearchPanel = () => {
        if (!searchPanel || !searchToggle) return;
        searchPanel.classList.add("is-open");
        searchToggle.setAttribute("aria-expanded", "true");
    };

    if (searchToggle && searchPanel) {
        searchToggle.setAttribute("aria-expanded", "false");

        searchToggle.addEventListener("click", () => {
            const isOpen = searchPanel.classList.contains("is-open");

            if (isOpen) {
                closeSearchPanel();
            } else {
                openSearchPanel();
            }
        });
    }

    const openMobileMenu = () => {
        if (!mobileMenu || !burgerButton) return;
        mobileMenu.classList.add("is-open");
        burgerButton.setAttribute("aria-expanded", "true");
        body.style.overflow = "hidden";
    };

    const closeMobileMenu = () => {
        if (!mobileMenu || !burgerButton) return;
        mobileMenu.classList.remove("is-open");
        burgerButton.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
    };

    if (burgerButton) {
        burgerButton.addEventListener("click", openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener("click", closeMobileMenu);
    }

    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener("click", closeMobileMenu);
    }

    if (mobileMenuLinks.length) {
        mobileMenuLinks.forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
            closeSearchPanel();
        }
    });

    document.addEventListener("click", (event) => {
        if (!searchPanel || !searchToggle) return;

        const clickedInsideSearch =
            searchPanel.contains(event.target) || searchToggle.contains(event.target);

        if (!clickedInsideSearch) {
            closeSearchPanel();
        }
    });

    if (faqItems.length) {
        faqItems.forEach((item) => {
            const question = item.querySelector(".faq-question");

            if (!question) return;

            question.addEventListener("click", () => {
                const isOpen = item.classList.contains("is-open");

                faqItems.forEach((faqItem) => faqItem.classList.remove("is-open"));

                if (!isOpen) {
                    item.classList.add("is-open");
                }
            });
        });
    }

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }

    if (window.AOS) {
        window.AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 40,
        });
    }

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const name = String(formData.get("name") || "").trim();
            const email = String(formData.get("email") || "").trim();
            const phone = String(formData.get("phone") || "").trim();
            const message = String(formData.get("message") || "").trim();

            if (!name || !email || !phone || !message) {
                alert("Please fill in your name, email, phone number, and project details.");
                return;
            }

            alert("Thank you. Your request has been submitted successfully.");
            contactForm.reset();
        });
    }
});