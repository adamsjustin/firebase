// Initialize Firebase
var config = {
  apiKey: "AIzaSyCRhfyAoHvRXQt_shXHuhc6sqNC8OmJZ8k",
  authDomain: "fir-homework-62a67.firebaseapp.com",
  databaseURL: "https://fir-homework-62a67.firebaseio.com",
  projectId: "fir-homework-62a67",
  storageBucket: "fir-homework-62a67.appspot.com",
  messagingSenderId: "184005692034"
};
firebase.initializeApp(config);

  var database = firebase.database();
  

  // Button for add)ing trains
  $("#submitButton").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var current = moment().format("hh:mm");
    var name = $("#name").val().trim();
    var dest = $("#dest").val().trim();
    var ftt = moment($("#ftt").val().trim(), "HH:mm").format("HH:mm a");
    var freq = moment($("#freq").val().trim(), "mm").format("mm");



    var formated = moment(ftt, "hh:mm").subtract(1, "years");
    var diff = moment().diff(moment(formated), "minutes");
    var apart = diff % freq;
    var away = freq - apart;
    var arrival = moment().add(away, "minutes").format("hh:mm");




    var newTrain = {
      name: name,
      destination: dest,
      start: ftt,
      frequency: freq,
      away: away,
      arrival: arrival

    };


    // Uploads train data to the database
    database.ref().push(newTrain);



    // Clears all of the text-boxes
    $("#name").val("");
    $("#dest").val("");
    $("#ftt").val("");
    $("#freq").val("");
  });

  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(prevChildKey);

    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var freq = childSnapshot.val().frequency;
    var arrival = childSnapshot.val().arrival;
    var trainAway = childSnapshot.val().away;

console.log(name);
console.log(dest);
console.log(freq);
console.log(arrival);
console.log(trainAway);
    // Add each train's data into the table
    $("#table").append([
      $("<tr>"),
      $("<td>").text(name),
      $("</td><td>").text(dest),
      $("</td><td>").text(freq), + " mins",
      $("</td><td>").text(arrival),
      $("</td><td>").text(trainAway), " mins" +
      "</td><tr>"
    ]);
  });



