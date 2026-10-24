// FAQ
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
        const faqItem =  question.closest(".faq-item");
        const isOpen = faqItem.classList.contains("active");

        faqItem.classList.toggle("active", !isOpen);
        question.setAttribute("aria-expanded", String(!isOpen));
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
    check('email', !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'Valid email required.');
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

        s
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

// Subscribe
const modal = document.getElementById('popupModal');
    const openBtn = document.getElementById('openPopupBtn');
    const closeBtn = document.getElementById('closePopupBtn');
    const subscribeForm = document.getElementById('subscribeForm');


    openBtn?.addEventListener('click', () => {
        if (modal) modal.style.display = 'flex';
    });


    closeBtn?.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });


    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });


    subscribeForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for subscribing!');
        if (modal) modal.style.display = 'none';
        subscribeForm.reset();
    }); 

    let number = Math.floor(Math.random()*6)-1;
    console.log(number);

    let num = Math.floor(Math.random()*(999-99+1))+99;
    console.log(num)