// FAQ
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
        const faqItem = question.closest(".faq-item");
        const isOpen = faqItem.classList.contains("active");

        // Close all open FAQ items
        document.querySelectorAll(".faq-item.active").forEach(function (item) {
            item.classList.remove("active");

            const itemQuestion = item.querySelector(".faq-question");

            if (itemQuestion) {
                itemQuestion.setAttribute("aria-expanded", "false");
            }
        });

        if (!isOpen) {
            faqItem.classList.add("active");
            question.setAttribute("aria-expanded", "true");
        }
    });
});

// REGISTER ERRORS
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;


    function check(id, condition, message) {
        const input = document.getElementById(id);
        const error = document.getElementById(id + 'Error');
        if (condition) {
            if (error) error.textContent = message;
            if (input) input.classList.add('input-error');
            isValid = false;
        } else {
            if (error) error.textContent = '';
            if (input) input.classList.remove('input-error');
        }
    }

    const pass = document.getElementById('password')?.value || '';
    const confirm = document.getElementById('confirm_password')?.value || '';
    const email = document.getElementById('email')?.value.trim() || '';


    check('name', !document.getElementById('name')?.value.trim(), 'Name is required.');
    check('surname', !document.getElementById('surname')?.value.trim(), 'Surname is required.');
    check('email',!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),'Valid email required.');
    check('password', pass.length < 6, 'Min 6 characters required.');
    check('confirm_password', !confirm || pass !== confirm, 'Passwords do not match.');

    if (isValid) {
        alert('Registration successful!');
        this.reset();
    }
});

// change color

const themeButton = document.getElementById("change-background-btn");
const themeIcon = document.getElementById("theme-icon");


const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}


if (themeButton && themeIcon) {
    const isDark = document.body.classList.contains("dark-theme");

    themeIcon.textContent = isDark ? "☀️" : "🌙";
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeButton.addEventListener("click", function () {
        const isDark = document.body.classList.toggle("dark-theme");

        
        localStorage.setItem("theme", isDark ? "dark" : "light");

        
        themeIcon.textContent = isDark ? "☀️" : "🌙";

        
        themeButton.setAttribute("aria-pressed", String(isDark));
        themeButton.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    });
}


// clock
const dateTimeElement = document.getElementById("current-date-time");

function updateDateTime() {
    if (!dateTimeElement) {
        return;
    }

    const now = new Date();

    dateTimeElement.textContent = now.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
}

if (dateTimeElement) {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// TASK 3: Subscription Popup

const openPopupBtn = document.getElementById("openPopupBtn");
const popupModal = document.getElementById("popupModal");
const closePopupBtn = document.getElementById("closePopupBtn");
const subscribeForm = document.getElementById("subscribeForm");
const subscribeMessage = document.getElementById("subscribeMessage");

const subscribeEmail = subscribeForm?.querySelector(
    'input[type="email"]'
);

function openSubscribePopup() {
    if (!popupModal) return;

    popupModal.classList.add("is-open");
    popupModal.setAttribute("aria-hidden", "false");

    if (subscribeMessage) {
        subscribeMessage.textContent = "";
    }

    subscribeEmail?.focus();
}

function closeSubscribePopup() {
    if (!popupModal) return;

    popupModal.classList.remove("is-open");
    popupModal.setAttribute("aria-hidden", "true");

    openPopupBtn?.focus();
}

// Open the popup
openPopupBtn?.addEventListener("click", openSubscribePopup);

// Close using the X button
closePopupBtn?.addEventListener("click", closeSubscribePopup);

// Handle form submission
function handleSubscribeSubmit(event) {
    event.preventDefault();

    const email = subscribeEmail?.value.trim() || "";

    if (!email || !subscribeEmail.checkValidity()) {
        if (subscribeMessage) {
            subscribeMessage.textContent =
                "Please enter a valid email address.";
        }
        return;
    }

    if (subscribeMessage) {
        subscribeMessage.textContent =
            `Thank you for subscribing, ${email}!`;
    }

    subscribeForm.reset();
}

subscribeForm?.addEventListener("submit", handleSubscribeSubmit);

// Close when clicking the background
popupModal?.addEventListener("click", function (event) {
    if (event.target === popupModal) {
        closeSubscribePopup();
    }
});

// Close with Escape
document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        popupModal?.classList.contains("is-open")
    ) {
        closeSubscribePopup();
    }
});


// TASK 5: Keyboard Navigation

// TASK 5–6: Keyboard Navigation with switch

const cityEyeNavLinks = Array.from(
    document.querySelectorAll(".nav-links a")
);

cityEyeNavLinks.forEach(function (link, index) {
    link.addEventListener("keydown", function (event) {
        let nextIndex;
        
        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
                nextIndex = (index + 1) % cityEyeNavLinks.length;
                break;

            case "ArrowLeft":
            case "ArrowUp":
                nextIndex =
                    (index - 1 + cityEyeNavLinks.length) %
                    cityEyeNavLinks.length;
                break;

            default:
                return;
        }

        event.preventDefault();
        cityEyeNavLinks[nextIndex].focus();
    });
});

//hall of fame read more


const hofReadMoreBtn = document.getElementById("hofReadMoreBtn");
const hofMoreText = document.getElementById("hofMoreText");
const hofJoin = document.querySelector(".hof-join");

hofReadMoreBtn?.addEventListener("click", function () {
    const isOpening = hofMoreText.hidden;

    hofMoreText.hidden = !isOpening;
    hofJoin.classList.toggle("hof-expanded", isOpening);

    hofReadMoreBtn.innerHTML = isOpening
        ? 'Read Less <span>←</span>'
        : 'Read More <span>→</span>';

    hofReadMoreBtn.setAttribute("aria-expanded", String(isOpening));
});

