// Initilize synth API
const synth = window.speechSynthesis;

const screen = document.querySelector("#InputBox");
const speed = document.querySelector("#speed");
const pitch = document.querySelector("#pitch");
const speedValue = document.querySelector("#rate-value");
const PithValue = document.querySelector("#pitch-value");
const Voices = document.querySelector("#voices");
const SpeachBtn = document.querySelector(".speech-btn");
// const Bodyanimation = document.querySelector(".sound-box");
let fragmentDocument = new DocumentFragment();

// Init Voices array 

let voicesArray = [];

const getVoice = () => {
    voicesArray = synth.getVoices();
    console.log(voicesArray)
    // Loop through all voices and create dom element for it
    voicesArray.forEach(Voice => {
        let option = document.createElement("option");
        option.innerHTML = `${Voice.name} ('${Voice.lang}')`;
        option.setAttribute("data-lang", Voice.lang);
        option.setAttribute("data-name", Voice.name);
        fragmentDocument.appendChild(option);
    })
    Voices.appendChild(fragmentDocument);
}
getVoice()

if (synth.onvoiceschanged !== undefined) {
    // Voices.innerHTML = "";
    synth.onvoiceschanged = getVoice;
}

// speak
const speak = () => {

    // check if it is speaking
    if (synth.speaking) {
        console.error("Already Speaking...")
        return;
    }

    // check for empty screen
    if (screen.value !== "") {

        // add gif animation

        document.querySelector(".sound-box").classList.add("show-gif");
        document.querySelector(".textModule").classList.add("opacity");
        document.querySelectorAll(".form-group").forEach(item => {
            item.classList.add("opacity");
        })
        // Get speak text
        let speakText = new SpeechSynthesisUtterance(screen.value);

        // speak end this is run when we finish speeking (and call and (onend) event)
        speakText.onend = e => {
            document.querySelector(".sound-box").classList.remove("show-gif");
            document.querySelector(".textModule").classList.remove("opacity");
            document.querySelectorAll(".form-group").forEach(item => {
                item.classList.remove("opacity");
            })
            console.log("done speaking...", e)
        }

        // check for speeking error
        speakText.onerror = e => {
            console.log("Something went wrong...", e);
        }

        const selectedvoice = Voices.selectedOptions[0].getAttribute('data-name');


        // Loop through all voices to select a voice
        voicesArray.forEach(vce => {
            if (vce.name === selectedvoice) {
                speakText.voice = vce;
            }
        })

        //Set rate of voice and pitch of voice
        speakText.rate = speed.value;
        speakText.pitch = pitch.value;

        synth.speak(speakText);

    }
}

// Add event Listeners
SpeachBtn.addEventListener("click", (e) => {
    // console.log("Bingo")
    speak();
    screen.blur();
})


// add eventlistener on speed and pitch of voices
speed.addEventListener("change", (e) => {
    speedValue.textContent = speed.value;
})
pitch.addEventListener("change", (e) => {
    PithValue.textContent = pitch.value;
})


// speak when voice reselect speak into selected voice
Voices.addEventListener("change", e => speak());