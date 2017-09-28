// Initialize Firebase
var config = {
apiKey: "AIzaSyAdN7cXfBMKAaQrPTrQiTLtrc91IluRGro",
authDomain: "employeedatamanagement-7e5d6.firebaseapp.com",
databaseURL: "https://employeedatamanagement-7e5d6.firebaseio.com",
projectId: "employeedatamanagement-7e5d6",
storageBucket: "",
messagingSenderId: "658563184318"
};

firebase.initializeApp(config);

var name;
var role; 
var startDate;
var monthlyRate;
var database = firebase.database();
var monthsWorked; 


database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	//calculate  total billed and months worked - use moment.js 
	var newStartDate = moment(childSnapshot.val().startDate, "DDMMYY");
	var now = moment();
	var months = parseInt(now.diff(newStartDate, "months"));
	var totalBilled = parseInt(monthlyRate) * months; 

	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().role);
	console.log(childSnapshot.val().startDate);
	console.log(childSnapshot.val().monthlyRate);

	//then we need to display information on the html 
	var row = $("<tr>");
	var cell_1 = $("<td>");
	var cell_2 = $("<td>");
	var cell_3 = $("<td>");
	var cell_4 = $("<td>");
	var cell_5 = $("<td>");
	var cell_6 = $("<td>");

	//Add the column values.
	cell_1.text(childSnapshot.val().name);
	cell_2.text(childSnapshot.val().role);
	cell_3.text(childSnapshot.val().startDate);
	cell_4.text(months);
	cell_5.text(childSnapshot.val().monthlyRate);
	cell_6.text(totalBilled);



	row.append(cell_1);
	row.append(cell_2);
	row.append(cell_3);
	row.append(cell_4);
	row.append(cell_5);
	row.append(cell_6);

	// ID of the table goes here.
	$("#employee-table").append(row);


},function(errorObject){
  console.log("The read failed:" + errorObject.code);
});




// on click do onSubmit()
$("#submit").on("click", function(event){

	//nice to have - check if any fields are empty and dont let them submit if there is. 

	event.preventDefault();

	//get the value in each of the text boxes 
	name = $("#employee-name").val().trim();
	role = $("#role").val().trim();
	startDate = $("#start-date").val().trim();
	monthlyRate = $("#monthly-rate").val().trim();

	// push to database 
	database.ref().push({
        "name": name,
        "monthlyRate": monthlyRate,
        "role": role,
        "startDate": startDate,
        "dateAdded": firebase.database.ServerValue.TIMESTAMP

     });

	// empty the fields 
	$("#employee-name").val("");
	$("#role").val("");
	$("#start-date").val("");
	$("#monthly-rate").val("");



}); 