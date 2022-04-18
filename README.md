# Nutrition Navigator: Find out what your favorite foods consist off and how they stack up against one another

## Description

Simple food searching app which uses the [Nutrionix API](https://www.nutritionix.com/) to display lists of food items based on inputted keywords and utilizes these major technologies: React, Firebase, CSS, ChartJS

## Challenges/Features

- Working with a post request for the "nutrient details" endpoint that required headers
- creating a pagination component that takes in an array of data and outputs a spliced array, is reusable and dynamic
- passing props through multiple components (prop drilling)
- Saving/Retrieving data to/from Firebase
- error handling on maxed out API calls, missing data
- making responsive for all screen sizes using flexbox
- Loading states 


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation and Setup Instructions

### `clone repo`

In the project directory, you can run:

### `npm install`

Installs requisite modules needed to run project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Reflection

This React app lets users save food items details from search results and displays a food Details view from searched items. Users can compare up to three different foods on one chart and have an unlimited number of charts.

This was a group project done by [Solomon Serry](https://github.com/SolomonSerry), [Abdul Abdi](https://github.com/Abdul1Abdi), and [Bart Batalinski](https://github.com/bbatal) as a culminating final project at Juno College of Technology. Working in a team and the designing and agreeing on the flow of the project was the primary challenge for all of us and figuring out how routing and different technologies like ChartJS, Pagination, and multiple endpoints would fit in and what the timelines would be for these to be implemented taught us all a lot about ironing out details early on. 

This project is easy to use, scalable, reusable (user profiles can be added, authentication, and other features can easily be fit in). Has a modern look and feel, for mobile, tablet, and desktop. 

## Dependencies

| Project      | Home Page                                    |
|--------------|----------------------------------------------|
| React        | <https://reactjs.org/>                       |
| ChartJS      | <https://www.chartjs.org/>                   |
| Firebase     | <https://firebase.google.com/>               |
| Axios        | <https://www.npmjs.com/package/axios>        |