$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCbPMBCVFZ0m7NQzbSd1e4HtIfLoO3N6Ws",
        authDomain: "trainscheduler-42b4f.firebaseapp.com",
        databaseURL: "https://trainscheduler-42b4f.firebaseio.com",
        projectId: "trainscheduler-42b4f",
        storageBucket: "trainscheduler-42b4f.appspot.com",
        messagingSenderId: "150252326000"
    };
    firebase.initializeApp(config);

    var dataRef = firebase.database();

    // variables for user input
    var trainName;
    var destination;
    var firstTrainTime;
    var freqInMin;

    // on click of submit
    $("#add-train").on("click", function (event) {
        event.preventDefault();

        // get user input
        trainName = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = $("#time-input").val().trim();
        freqInMin = $("#freq-input").val().trim();

        // push values to firebase
        dataRef.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            freqInMin: freqInMin,
        });

        // clear input form
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#freq-input").val("");

    });

    // variables for calculations
    var newTrainTime;
    var timeDifference;
    var timeRem;
    var minutesAway;
    var nextArrival;

    // function to calculate nextArrival and minutesAway
    function getNextTrain(firstTrainTime, freqInMin) {

        // calculate next arrival and minutes away
        newTrainTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        timeDifference = moment().diff(moment(newTrainTime), "minutes");
        timeRem = timeDifference % freqInMin;
        minutesAway = freqInMin - timeRem;
        nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
    }

    // append new train & times to train schedule
    dataRef.ref().on("child_added", function (snap) {

        getNextTrain(snap.val().firstTrainTime, snap.val().freqInMin);

        var snapArray = [snap.val().trainName, snap.val().destination, snap.val().freqInMin, nextArrival, minutesAway];

        var row = $("<tr>");

        for (var i = 0; i < snapArray.length; i++) {
            var col = $("<td>");
            col.addClass("col col-xs-2");
            col.text(snapArray[i]);
            col.appendTo(row);
        }

        $("#train-table").append(row);

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

})