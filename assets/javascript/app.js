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

    //  initial variables
    var trainName;
    var destination;
    var userTrainTime;
    var freqInMin;

    var newTrainTime;
    var timeDifference;
    var timeRem;
    var minutesAway;
    var nextTrain
    var nextArrival;

    // on click of submit
    $("#add-train").on("click", function (event) {
        event.preventDefault();

        // get user input
        trainName = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        userTrainTime = $("#time-input").val().trim();
        freqInMin = $("#freq-input").val().trim();
        // console.log(trainName + destination + userTrainTime + freqInMin);

        // calculate next train time
        newTrainTime = moment(userTrainTime, "hh:mm").subtract(1, "years");
        timeDifference = moment().diff(moment(newTrainTime), "minutes");
        timeRem = timeDifference % freqInMin;
        minutesAway = freqInMin - timeRem;

        nextTrain = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextTrain).format("hh:mm");

        // push values to firebase
        dataRef.ref().push({
            trainName: trainName,
            destination: destination,
            userTrainTime: userTrainTime,
            freqInMin: freqInMin,
            nextArrival: nextArrival,
            minutesAway: minutesAway
        });

        // clear input form
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#freq-input").val("");

    });

    // append to train schedule
    dataRef.ref().on("child_added", function (snap) {

        // variables to hold snapshot info
        var addTrainName = snap.val().trainName;
        var addDestination = snap.val().destination;
        var addFreqInMin = snap.val().freqInMin;
        var addNextArrival = snap.val().nextArrival;
        var addMinutesAway = snap.val().minutesAway;

        var snapArray = [addTrainName, addDestination, addFreqInMin, addNextArrival, addMinutesAway];
        var row = $("<tr>");

        for (var i = 0; i < snapArray.length; i++) {
            var col = $("<td>");
            col.text(snapArray[i]);
            col.appendTo(row);
        }

        $("#train-table").append(row);

    });


})