import turtle
import time
import math

# =========================
# OYNA
# =========================

screen = turtle.Screen()
screen.title("⏰ Premium Clock")
screen.bgcolor("#0b1120")
screen.setup(width=700, height=800)
screen.tracer(0)


# =========================
# TURTLE
# =========================

pen = turtle.Turtle()
pen.hideturtle()
pen.speed(0)


# =========================
# SOAT TASHQI HALQALARI
# =========================

# Katta tashqi doira
pen.penup()
pen.goto(0, -250)
pen.pendown()
pen.pensize(8)
pen.color("#334155")
pen.circle(250)

# Ichki doira
pen.penup()
pen.goto(0, -235)
pen.pendown()
pen.pensize(3)
pen.color("#1e40af")
pen.circle(235)


# =========================
# SOAT RAQAMLARI
# =========================

raqam_rangi = "#e2e8f0"

for i in range(1, 13):

    angle = math.radians(90 - i * 30)

    x = 195 * math.cos(angle)
    y = 195 * math.sin(angle)

    pen.penup()
    pen.goto(x, y - 12)

    pen.color(raqam_rangi)

    pen.write(
        str(i),
        align="center",
        font=("Arial", 20, "bold")
    )


# =========================
# SOAT BELGILARI
# =========================

for i in range(60):

    angle = math.radians(90 - i * 6)

    x1 = 215 * math.cos(angle)
    y1 = 215 * math.sin(angle)

    if i % 5 == 0:
        uzunlik = 12
        qalinlik = 4
    else:
        uzunlik = 6
        qalinlik = 2

    x2 = (215 - uzunlik) * math.cos(angle)
    y2 = (215 - uzunlik) * math.sin(angle)

    pen.penup()
    pen.goto(x1, y1)
    pen.pendown()

    pen.color("#64748b")
    pen.pensize(qalinlik)

    pen.goto(x2, y2)


# =========================
# STRELKA YARATISH
# =========================

def create_hand(color, width, angle, length):

    hand = turtle.Turtle()
    hand.hideturtle()
    hand.speed(0)

    hand.color(color)
    hand.pensize(width)

    hand.penup()
    hand.goto(0, 0)

    hand.setheading(angle)

    hand.pendown()
    hand.forward(length)

    return hand


hour_hand = None
minute_hand = None
second_hand = None


# =========================
# MATNLAR
# =========================

weekday_text = turtle.Turtle()
weekday_text.hideturtle()

date_text = turtle.Turtle()
date_text.hideturtle()

digital_text = turtle.Turtle()
digital_text.hideturtle()


# =========================
# OY NOMLARI
# =========================

oylar = {
    1: "Yanvar",
    2: "Fevral",
    3: "Mart",
    4: "Aprel",
    5: "May",
    6: "Iyun",
    7: "Iyul",
    8: "Avgust",
    9: "Sentabr",
    10: "Oktabr",
    11: "Noyabr",
    12: "Dekabr"
}


# =========================
# HAFTA KUNLARI
# =========================

hafta = {
    0: "Dushanba",
    1: "Seshanba",
    2: "Chorshanba",
    3: "Payshanba",
    4: "Juma",
    5: "Shanba",
    6: "Yakshanba"
}


# =========================
# SOATNI YANGILASH
# =========================

def update_clock():

    global hour_hand
    global minute_hand
    global second_hand

    # Eski strelkalarni o'chirish
    if hour_hand:
        hour_hand.clear()
        hour_hand.hideturtle()

    if minute_hand:
        minute_hand.clear()
        minute_hand.hideturtle()

    if second_hand:
        second_hand.clear()
        second_hand.hideturtle()


    # Hozirgi vaqt
    now = time.localtime()

    hour = now.tm_hour % 12
    minute = now.tm_min
    second = now.tm_sec


    # =========================
    # BURCHAKLAR
    # =========================

    hour_angle = 90 - (hour * 30 + minute * 0.5)

    minute_angle = 90 - (minute * 6 + second * 0.1)

    second_angle = 90 - second * 6


    # =========================
    # STRELKALAR
    # =========================

    hour_hand = create_hand(
        "#60a5fa",
        10,
        hour_angle,
        120
    )

    minute_hand = create_hand(
        "#34d399",
        7,
        minute_angle,
        170
    )

    second_hand = create_hand(
        "#f87171",
        3,
        second_angle,
        195
    )


    # =========================
    # MARKAZ
    # =========================

    pen.penup()
    pen.goto(0, -10)
    pen.dot(20, "#fbbf24")

    pen.goto(0, -5)
    pen.dot(8, "#ffffff")


    # =========================
    # HAFTA KUNI
    # =========================

    weekday_text.clear()

    weekday_text.color("#38bdf8")

    weekday_text.penup()
    weekday_text.goto(0, -300)

    weekday_text.write(
        hafta[now.tm_wday],
        align="center",
        font=("Arial", 24, "bold")
    )


    # =========================
    # SANA
    # =========================

    date_text.clear()

    date_text.color("#cbd5e1")

    sana = (
        f"{now.tm_mday} "
        f"{oylar[now.tm_mon]} "
        f"{now.tm_year}"
    )

    date_text.penup()
    date_text.goto(0, -335)

    date_text.write(
        sana,
        align="center",
        font=("Arial", 17, "normal")
    )


    # =========================
    # RAQAMLI SOAT
    # =========================

    digital_text.clear()

    digital_text.color("#f8fafc")

    vaqt = time.strftime("%H:%M", now)

    digital_text.penup()
    digital_text.goto(0, -390)

    digital_text.write(
        vaqt,
        align="center",
        font=("Arial", 38, "bold")
    )


    # =========================
    # YANGILASH
    # =========================

    screen.update()

    screen.ontimer(update_clock, 1000)


# =========================
# ISHGA TUSHIRISH
# =========================

update_clock()

screen.mainloop()