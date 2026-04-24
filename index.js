/*** DARK MODE ***/

const themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
    const isDark = document.body.classList.toggle("dark-mode");
    themeButton.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
};

if (themeButton) {
    themeButton.addEventListener("click", toggleDarkMode);
}


/*** HAMBURGER MENU ***/

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        hamburger.classList.toggle("open", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });
}

navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger?.classList.remove("open");
        hamburger?.setAttribute("aria-expanded", "false");
    });
});



/*** SCROLL FADE-IN ANIMATIONS ***/

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in").forEach(el => fadeObserver.observe(el));


/*** ACTIVE NAV LINK ON SCROLL ***/

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".navbar a[href^='#']");

const updateActiveNav = () => {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 130) {
            current = section.id;
        }
    });
    navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });


/*** CTA BUTTONS ***/

document.getElementById("register-btn")?.addEventListener("click", () => {
    document.getElementById("rsvp").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("schedule-btn")?.addEventListener("click", () => {
    document.getElementById("schedule").scrollIntoView({ behavior: "smooth" });
});


/*** RSVP FORM & PARTICIPANTS ***/

function addParticipant(person) {
    const p = document.createElement("p");
    p.textContent = `${person.name} from ${person.school} is attending`;
    document.getElementById("participants").appendChild(p);
}


/*** FORM VALIDATION ***/

const validateForm = () => {
    let hasErrors = false;
    const rsvpInputs = document.getElementById("rsvp-form").elements;

    for (let i = 0; i < rsvpInputs.length; i++) {
        const input = rsvpInputs[i];
        if (input.type === "button") continue;

        if (input.value.trim().length < 2) {
            hasErrors = true;
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    }

    const email = document.getElementById("email");
    if (!email.value.includes("@")) {
        hasErrors = true;
        email.classList.add("error");
    } else {
        email.classList.remove("error");
    }

    if (!hasErrors) {
        const person = {
            name:   document.getElementById("name").value.trim(),
            email:  document.getElementById("email").value.trim(),
            school: document.getElementById("school").value.trim()
        };

        addParticipant(person);
        showModal(person);

        for (let i = 0; i < rsvpInputs.length; i++) {
            if (rsvpInputs[i].type !== "button") rsvpInputs[i].value = "";
        }
    }
};

document.getElementById("submit-btn")?.addEventListener("click", validateForm);


/*** SUCCESS MODAL ***/

let modalTimer;

const showModal = (person) => {
    const modal = document.getElementById("success-modal");
    document.getElementById("modal-text").textContent =
        `🎉 Thanks for RSVPing, ${person.name}! We'll see you at HackTCU!`;
    modal.style.display = "flex";

    clearTimeout(modalTimer);
    modalTimer = setTimeout(closeModal, 5000);
};

const closeModal = () => {
    clearTimeout(modalTimer);
    document.getElementById("success-modal").style.display = "none";
};

document.getElementById("modal-close")?.addEventListener("click", closeModal);

document.getElementById("success-modal")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
});
