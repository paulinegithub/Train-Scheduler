# Train Scheduler

## Go to deployed app: [https://plsenh.github.io/Train-Scheduler/](https://plsenh.github.io/Train-Scheduler/)

![screenshot](./assets/images/TrainScheduler.PNG)

---

## Overview:

View current train schedules, next arrival times, and how may minutes away the next train is. Users can input their own train schedules to add to the table.

## Details:

Data persistence is attained through a Firebase database. The user enters the train name, destination, the time of the first train, and the train frequency in minutes.

When the user enters data into , it is uploaded to a Firebase database. Submitting another train entry refreshes the data, and the calculated data (Next Arrival and Minutes Away) is updated. Refreshing the web browser will also update the data.

---

## Built with:

- [Bootstrap](https://getbootstrap.com/) - Front-end component library for developing with HTML, CSS, and JS.
- [Firebase](https://firebase.google.com/) - Mobile and web application development platform with database functionality.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - High-level programming language.
- [jQuery](https://jquery.com/) - JavaScript library.
- [Moment.js](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.
- [Visual Studio Code](https://code.visualstudio.com/) - source code editor developed by Microsoft.

## Author:

- **Pauline Senh** - [plsenh](https://github.com/plsenh)
