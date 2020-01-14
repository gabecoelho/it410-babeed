# Babeed

## BYU IT 410 - Domain Driven Design

# 🆙 Domain Events

Account created

Used logged in

User logged out

Wet diaper logged

Wet diaper logged with past datetime

Poopy diaper logged

Poopy diaper logged with past datetime

Feeding/Nursing tracker started

Feeding/Nursing tracker stopped

Wet diaper entered into history

Poopy diaper entered into history

Feeding/Nursing entered into history

- Bonus functionality

    History poopy diaper created

    History poopy diaper edited

    History poopy diaper deleted

    History wet diaper created

    History wet diaper edited

    History wet diaper deleted

    History feeding/nursing created

    History feeding/nursing edited

    History feeding/nursing deleted

# 👉🏻 Domain Commands

Create account

Log in

Log out

Add wet diaper

Add wet diaper with different datetime

Add poopy diaper

Add poopy diaper with different datetime

Start feeding/nursing tracker

Stop feeding/nursing tracker

- Bonus functionality

    Create **new** history poopy diaper 

    Create **new** history wet diaper 

    Create **new** history feeding/nursing

    Edit history poopy diaper

    Edit history wet diaper

    Edit history feeding/nursing

    Delete history poopy diaper

    Delete history wet diaper

    Delete history feeding/nursing

# ♟ Entities and Value Objects

- User
- Diaper
- Feed/Nursing

# 🧩 Properties and Types

- User

    id (string)

    name (string)

    email (string)

    password (string)

- Feed/Nursing

    id (string)

    minutes (float)

    start_datetime (ISO 8601 string)

    stop_datetime (ISO 8601 string)

- Diaper

    id (string)

    type (string)

    datetime (ISO 8601 string)
