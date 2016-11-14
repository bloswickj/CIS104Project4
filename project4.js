/**
 *   @author Bloswick, John (bloswickj@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Project 4 || created: 11.14.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let continueInput, earlyExit;
let userChoice, userRating, selectedMovie;
let movies = [], totalRatings = [], numRatings = [], averageRatings = [];

function main(){
    PopulateInitialMovies();
    SetInitialValues();
    if (continueInput == null) {
        SetContinueInput();
    }
    while (continueInput == 1) {
        SetUserChoice();
        if (earlyExit == 0) {
            if (userChoice == 1) {
                SetSelectedMovie();
                SetUserRating();
                if (earlyExit == 0) {
                    PopulateNumRatings();
                    PopulateTotalRatings();
                    PopulateAverageRatings();
                    SetContinueInput();
                }
            }
            else if (userChoice == 0){
                SetSelectedMovie();
                PrintAverageRating();
                SetContinueInput();
            }
            else if (userChoice == 2){
                PopulateMovies();
                SetNewValues();
            }
        }
    }
    if (earlyExit == 0) {
        PrintGoodbye();
    }
    if (earlyExit == 1){
        console.log('Too many failed attempts. Exiting program.');
    }
}

main();

function SetInitialValues() {
    for (let i = 0; i < movies.length; i++) {
        totalRatings[i] = 0;
    }
    for (let i = 0; i < movies.length; i++) {
        numRatings[i] = 0;
    }
    for (let i = 0; i < movies.length; i++) {
        averageRatings[i] = 0;
    }
}

function SetNewValues() {
    numRatings [movies.length - 1] = 0;
    totalRatings [movies.length - 1] = 0;
    averageRatings [movies.length - 1] = 0;
}

function SetContinueInput(){
    if (continueInput === 1) {
        for (let i=0; i<3; i++) {
            continueInput = Number(PROMPT.question(`\nDo you want to continue?\n\t0.) No\n\t1.) Yes `));
            if (continueInput !== 0 && continueInput !== 1) {
                console.log(`${continueInput} is not a valid response.`);
                earlyExit = 1;
                continueInput = 0;
            }
            else {
                earlyExit = 0;
                break;
            }
        }
    }
    else{
        continueInput = 1;
    }
}

function SetSelectedMovie() {
    PrintMovies();
    for (let i = 0; i < 5; i++) {
        selectedMovie = PROMPT.questionInt("Please select a movie from the list above: ");
        if (selectedMovie < 0 || selectedMovie > movies.length - 1) {
            console.log("That is not a valid selection.");
            earlyExit = 1;
            continueInput = 0;
        }
        else {
            earlyExit = 0;
            break;
        }
    }
}

function SetUserChoice() {
    process.stdout.write('\x1Bc');
    console.log("Would you like to view the average rating for a movie or rate a movie?\n\t0.) View Average Rating\n\t1.) Rate Movie\n\t2.) Add A Movie To The List");
    for (let i = 0; i < 5; i++) {
        userChoice = PROMPT.questionInt("Please select a choice from the list above: ")
        if (userChoice < 0 ||userChoice > 2) {
            console.log("That is not a valid selection.");
            earlyExit = 1;
            continueInput = 0;
        }
        else {
            earlyExit = 0;
            break;
        }
    }
}
function SetUserRating(){
    for (let i=0; i<5; i++){
        userRating = PROMPT.questionInt(`\nPlease enter a rating on a scale of 0 to 5 for the movie '${movies[selectedMovie]}': `);
        if (userRating < 0 || userRating > 5){
            console.log('That is not a valid response.');
            earlyExit = 1;
        }
        else{
            process.stdout.write('\x1Bc');
            console.log(`Thank you for giving a rating of ${userRating} to '${movies[selectedMovie]}'`);
            earlyExit = 0;
            break;
        }
    }
}

function PopulateInitialMovies() {
    movies [0] = "Star Wars: The Phantom Menace";
    movies [1] = "Star Trek: First Contact";
    movies [2] = "Titanic";
    movies [3] = "Jurassic Park";
}

function PopulateMovies() {
    process.stdout.write('\x1Bc');
    movies [movies.length] = PROMPT.question("Please enter the name of the movie: ");
}

function PopulateNumRatings() {
    numRatings[selectedMovie] = numRatings[selectedMovie] + 1;
}

function PopulateTotalRatings() {
    totalRatings[selectedMovie] = totalRatings[selectedMovie] + userRating;
}

function PopulateAverageRatings() {
    averageRatings[selectedMovie] = totalRatings[selectedMovie] / numRatings[selectedMovie];
}

function PrintAverageRating() {
    console.log(`The average rating for '${movies[selectedMovie]}' is ${averageRatings[selectedMovie]}`);
}

function PrintMovies() {
    process.stdout.write('\x1Bc');
    console.log("Available Movies:");
    for (let i = 0; i < movies.length; i++ )
    {
        console.log(`\t${i}). ${movies[i]}`);
    }
}

function PrintGoodbye(){
    process.stdout.write('\x1Bc');
    console.log('\n\tgoodbye.');
}
