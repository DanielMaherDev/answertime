![hero image](assets/readmeimages/hero.png)

# Answer-Time Quiz

## Introduction

Answer-Time is a time-based quiz game. The game contains multiple quiz types, with a 10 second limit per question. The quicker the answer is provided, the more points are given. 

The interactive code was developed in Javascript and the interface was developed in HTML and CSS.

<a href="https://danielmaherdev.github.io/answertime/" rel="nofolow">Play Answer-Time quiz</a>



## Table of Contents

- [Answer-Time Quiz](#answertime-quiz)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [User Experience](#UserExperience)
      - [Strategy](#strategy)
  - [Technologies](#technologies)
  - [Features](#features)
    - [Main Page](#main-page)
    - [Options Menu](#options-menu)
    - [Rules Menu](#rules-menu)
    - [Results Menu](#results-menu)
    - [Game](#game)
  - [Testing](#testing)
  - [Unfixed Bugs](#unfixed-bugs)
  - [Features Left to Implement](#features-left-to-implement)
  - [Deployment](#deployment)
  - [Credits](#credits)
  - [Acknowledgements](#acknowledgements)

## User Experience

## Design

This game was designed with a mobile first approach. The CSS was built to be compatible with smaller screen sizes first, and was scaled for larger screens where appropriate using media queries.

The game is designed to be as intuitive as possible, with clear distinction for interactive elements via color scheme & hover effects.

It is designed with each section of the game structured in its own div within the HTML, to allow for easier readability, scalability and de-bugging.

#### Strategy

- Site goals

  - The main goal of the site is to provide a quiz which is interactive, and fun to play, providing feedback to user inputs.
  - To have a responsive design that is easy to use on any device.
- User goals
  - The user goals are to have a fun and interactive game to play.
  - The user can play the game on any device.

## Technologies

The technologies used in this project were HTML, CSS and JavaScript. The HTML was used to create the structure of the page, the CSS was used to style the page and the JavaScript was used to make the entire game work.

    * HTML
    * CSS
    * JavaScript
    * GitHub

## Features

### Welcome Section

The welcome section is the screen the end user is presented with on page load. 

It provides the user with a breif description of the game, along with a start button, and a how to play button. It also contains a logo which redirects to the welcome screen and a toggle for audio, both of which are present on any suqsequent screens.

![Welcome screen](assets/readmeimages/welcome-screen.png)

### Choose Game screen

The choose game screen allows the user to choose which quiz type they would like to play (General Knowledge/Music). 

![Choose Game](assets/readmeimages/choose-game.png)

### How to Play screen

The how to play screen provides the user with the guidelines of the game, along with a button to return to the welcome screen.

![How To Play](assets/readmeimages/how-to-play.png)

### Question screen

The question screen contains the current question number. It also contains a countdown bar, which decreases every second for 10 seconds. It also contains the current question, along with 4 buttons for each answer.
Finally, it containes the players current overall score, and the total possible score.
![Question Screen](assets/readmeimages/question-screen.png)

### Correct/Incorrect Answer screen

The correct answer screen displays the selected answer, and the number of seconds it took to select this ansswer. It also displays the number of points added to the overall score. Finally, it displays a button which can be selected to continue to the next question.

![Correct Answer](assets/readmeimages/correct-answer.png)

The incorrect answer screen simply displays the incorrect selected answer, along with a button to continue to the nect question.

![Incorrect Answer](assets/readmeimages/incorrect-answer.png)

### Timeout Screen

The timeout screen displays if 10 seconds have passed without an answer being selected. This follows the same template as the incorrect answer screen but just contains the text Times Up! along wit a button to proceed.

## Game over screen

The website was tested on a desktop computer and a mobile phone.
Also, W3C and Jigsaw validation was used to validate the website HTML and CSS.

W3C Validation:

[W3C](assets/images/W3C.png) -->

Jigsaw Validation:

![Jigsaw](assets/images/jigsaw.png)

Jshint validator was used to validate the JavaScript code.

![Jshint](assets/images/javascript_test.png)

One warning here but was part of the implementation of the game.
Functions declared within loops referencing an outer scoped variable may lead to confusing semantics.

Lighhouse mobile and desktop testing:

![LightHouse Mobile](assets/images/lighthouse_mobile.png)

![LightHouse Desktop](assets/images/lighthouse_desktop.png)

## Unfixed Bugs

- Based on the checkers rules, the player needs to capture as many pieces as possible. The game is not programmed to do that neither to check if the player is taking the best possible move. The game is programmed to force a take.

- The computer is not programmed to take the best possible move. The computer is programmed to take a random piece.

- It was reported to crash in Android, but I was not able to reproduce the error.

## Features Left to Implement

- Implement a better AI for the computer.
- A timer to limit the time of each player.
- A smoother animation for the pieces moving.
- In the future, a multiplayer mode.

## Deployment

- The game was deployed on GitHub pages.

## Credits

- Stack Overflow
- Guido, my mentor
- w3Schools
- This channel that teaches cheker's https://www.youtube.com/watch?v=WD3NTNQElew
- developer.mozilla.org (where I passed most of my time)

## Acknowledgements

- My mentor for saving me from starting in a wrong way, which would make the project impossible to finish.
- My colleagues for the slack channel.
- The tutors for the help.
- My last hackathon team which tested the game and gave great feedbacks

