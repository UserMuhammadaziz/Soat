// =========================
// ELEMENTLAR
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
// 1 - 12 RAQAMLAR
// =========================

for (let i = 1; i <= 12; i++) {

    const number = document.createElement("div");

    number.className = "number";

    number.textContent = i;

    // 12 tepada bo'lishi uchun
    const angle = (i * 30) - 90;

    // Soat markazidan masofa
    const radius = 42;

    // Foizda joylashuv
    const x = 50 + radius * Math.cos(angle * Math.PI / 180);
    const y = 50 + radius * Math.sin(angle * Math.PI / 180);

    number.style.left = `${x}%`;
    number.style.top = `${y}%`;

    number.style.transform = "translate(-50%, -50%)";

    numbers.appendChild(number);
}


// =========================
// 60 TA MINUT BELGISI
// =========================

for (let i = 0; i < 60; i++) {

    const tick = document.createElement("div");

    tick.className =
        i % 5 === 0
            ? "tick major"
            : "tick";

    tick.style.transform =
        `rotate(${i * 6}deg)`;

    ticks.appendChild(tick);
}


// =========================
// SOATNI YANGILASH
// =========================

function updateClock() {

    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // Sekund silliq harakat qiladi
    const smoothSeconds =
        seconds + milliseconds / 1000;


    // =========================
    // STRELKALAR
    // =========================

    const hourAngle =
        (hours % 12) * 30 +
        minutes * 0.5;

    const minuteAngle =
        minutes * 6 +
        smoothSeconds * 0.1;

    const secondAngle =
        smoothSeconds * 6;


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
        `${now.getDate()} ${
            months[now.getMonth()]
        } ${now.getFullYear()}`;


    requestAnimationFrame(updateClock);
}


// =========================
// ISHGA TUSHIRISH
// =========================

updateClock();