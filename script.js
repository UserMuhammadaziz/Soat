// =========================
// ELEMENTLARNI OLISH
// =========================

const numbers = document.getElementById("numbers");

const ticks = document.getElementById("ticks");

const hourHand = document.getElementById("hour");

const minuteHand = document.getElementById("minute");

const secondHand = document.getElementById("second");

const weekdayEl = document.getElementById("weekday");

const dateEl = document.getElementById("date");

const digitalEl = document.getElementById("digital");


// =========================
// HAFTA KUNLARI
// =========================

const weekdays = [

    "Yakshanba",

    "Dushanba",

    "Seshanba",

    "Chorshanba",

    "Payshanba",

    "Juma",

    "Shanba"

];


// =========================
// OYLAR
// =========================

const months = [

    "Yanvar",

    "Fevral",

    "Mart",

    "Aprel",

    "May",

    "Iyun",

    "Iyul",

    "Avgust",

    "Sentabr",

    "Oktabr",

    "Noyabr",

    "Dekabr"

];


// =========================
// 1-12 RAQAMLAR
// =========================

for (let i = 1; i <= 12; i++) {

    const number = document.createElement("div");

    number.className = "number";

    number.textContent = i;


    const angle = i * 30;

    const radius = 41;


    number.style.transform =
        `rotate(${angle}deg)
         translateY(-${radius}%)
         rotate(-${angle}deg)`;


    numbers.appendChild(number);
}


// =========================
// 60 TA MINUT BELGISI
// =========================

for (let i = 0; i < 60; i++) {

    const tick = document.createElement("div");

    if (i % 5 === 0) {

        tick.className = "tick major";

    } else {

        tick.className = "tick";

    }


    tick.style.transform =
        `rotate(${i * 6}deg)`;


    ticks.appendChild(tick);
}


// =========================
// SOATNI YANGILASH
// =========================

function updateClock() {

    const now = new Date();


    // Hozirgi vaqt

    const hours = now.getHours();

    const minutes = now.getMinutes();

    const seconds = now.getSeconds();

    const milliseconds = now.getMilliseconds();


    // Sekundni silliq harakatlantirish

    const smoothSeconds =
        seconds + milliseconds / 1000;


    // =========================
    // STRELKA BURCHAKLARI
    // =========================

    const hourAngle =
        (hours % 12) * 30 +
        minutes * 0.5;


    const minuteAngle =
        minutes * 6 +
        smoothSeconds * 0.1;


    const secondAngle =
        smoothSeconds * 6;


    // =========================
    // STRELKALARNI BURISH
    // =========================

    hourHand.style.transform =
        `rotate(${hourAngle - 90}deg)`;


    minuteHand.style.transform =
        `rotate(${minuteAngle - 90}deg)`;


    secondHand.style.transform =
        `rotate(${secondAngle - 90}deg)`;


    // =========================
    // RAQAMLI SOAT
    // =========================

    const hh =
        String(hours).padStart(2, "0");


    const mm =
        String(minutes).padStart(2, "0");


    digitalEl.textContent =
        `${hh}:${mm}`;


    // =========================
    // HAFTA KUNI
    // =========================

    weekdayEl.textContent =
        weekdays[now.getDay()];


    // =========================
    // SANA
    // =========================

    dateEl.textContent =
        `${now.getDate()}
         ${months[now.getMonth()]}
         ${now.getFullYear()}`;


    // =========================
    // QAYTA ISHLATISH
    // =========================

    requestAnimationFrame(updateClock);
}


// =========================
// START
// =========================

updateClock();