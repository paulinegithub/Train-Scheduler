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
    var freqInMin = 0;

    // on click of submit
    $("#add-train").on("click", function (event) {
        event.preventDefault();

        // get user input
        trainName = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        userTrainTime = $("#time-input").val().trim();
        freqInMin = $("#freq-input").val().trim();

        // calculate next train time
        var newTrainTime = moment(userTrainTime, "hh:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(newTrainTime), "minutes");
        var tRemainder = diffTime % freqInMin;
        var minutesAway = freqInMin - tRemainder;

        var nextTrain = moment().add(minutesAway, "minutes");
        var nextArrival = moment(nextTrain).format("hh:mm");

        // push values to firebase
        dataRef.ref().push({
            trainName: trainName,
            destination: destination,
            userTrainTime: newTrainTime,
            freqInMin: freqInMin,
            // add calculated next times
            nextArrival: nextArrival,
            minutesAway: minutesAway
        });

    });

    // append to train schedule
    database.ref().on("child_added", function (snap) {
        
        addTrainName = snap.val().trainName;
        addDestination = snap.val().destination;
        addNextArrival = snap.val().nextArrival;
        addFreqInMin = snap.val().freqInMin;
        addMinutesAway = snap.val().minutesAway;

        var dataArray = [addTrainName, addDestination, addNextArrival, addFreqInMin, addMinutesAway];
        var row = $("<tr>");

        for (var i = 0; i < dataArray.length; i++) {
            var td = $("<td>");
            td.text(dataArray[i]);
            td.appendTo(row);
        }
        
        $("#train-table").append(row);

        $("#train-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#freq-input").val("");
    });

})