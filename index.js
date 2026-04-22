/*** DARK MODE ***/

// Select the theme button
let themeButton = document.getElementById("theme-button");

// Toggle dark mode
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
};

// Event listener for dark mode
if (themeButton) {
    themeButton.addEventListener("click", toggleDarkMode);
}


/*** RSVP FORM HANDLING ***/

// Get the submit button
let button = document.getElementById("submit-btn");

// Function to add participant (USES OBJECT NOW)
function addParticipant(person) {

    let newParticipant = document.createElement("p");
    newParticipant.textContent = `${person.name} from ${person.school} is attending`;

    let participantsDiv = document.getElementById("participants");
    participantsDiv.appendChild(newParticipant);
}


/*** FORM VALIDATION ***/

const validateForm = () => {

    let containsErrors = false;

    let rsvpInputs = document.getElementById("rsvp-form").elements;

    // Loop through inputs
    for (let i = 0; i < rsvpInputs.length; i++) {

        let input = rsvpInputs[i];

        // Skip button
        if (input.type === "button") continue;

        if (input.value.trim().length < 2) {
            containsErrors = true;
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    }

    // Check email format
    let email = document.getElementById("email");

    if (!email.value.includes("@")) {
        containsErrors = true;
        email.classList.add("error");
    } else {
        email.classList.remove("error");
    }

    // If no errors → create object + add participant + show modal
    if (containsErrors === false) {

        let person = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            school: document.getElementById("school").value.trim()
        };

        addParticipant(person);
        toggleModal(person);

        // Clear inputs
        for (let i = 0; i < rsvpInputs.length; i++) {
            if (rsvpInputs[i].type !== "button") {
                rsvpInputs[i].value = "";
            }
        }
    }
};


/*** SUCCESS MODAL ***/

const toggleModal = (person) => {

    let modal = document.getElementById("success-modal");
    let modalText = document.getElementById("modal-text");

    // Show modal
    modal.style.display = "flex";

    // Personalized message
    modalText.textContent = `🎉 Thanks for RSVPing, ${person.name}! We’ll see you at HackTCU!`;

    // Hide after 5 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
};


// Event listener
if (button) {
    button.addEventListener("click", validateForm);
}