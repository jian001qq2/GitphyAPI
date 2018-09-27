$(document).ready(function (){
//Declare a initial array variable; further new topic will push into this array
var topics = ["monkey", "tiger", "lion", "bear", "tuna", "frog","horse",
 "bird", "sheep", "donkey", "deer"];

//
function renderButtons() {
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button>");
      // Adding a class of animal to our button use to reference the class in later when user clicks the button
      newButton.addClass("animal");
      // Adding a data-attribute and make it equal to the name of a animal so reference later in the code for API request
      newButton.attr("data-name", topics[i]);
      // Providing the text in the button
      newButton.text(topics[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(newButton);
    };
};

// This function handles events where submit button is clicked
function addNewButton() {
$("#add-animal").on("click", function(event) {
    event.preventDefault();
//store the user input in a variable 
    var newAnimal = $("#user-input").val().trim();//problem .trim is undefined in console
    // Adding the stored value into the array of topics, use if statement to prevent blank input
   if (newAnimal ==="") {
        alert("Please enter a name before click submit")
return false;
    } else{
   topics.push(newAnimal);}
 // recall this function to make the new vaule also a button
    renderButtons();

  });
};
//function for get the api
function getTheImage() {
  //variable declartion for use to form the url in to use for the ajax request
  var apiKey ="GTcnBDlmXuXC0bdL3Xpq1GLOdqF0g7w1";//doubble check the key to see if it's right
  var animalName= $(this).attr("data-name");
  var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=" + apiKey;

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  })
}
// Function for displaying the images consider to declare the function in seperate one recall the function name
  $(document).on("click", ".animal", getTheImage);
addNewButton() // just to test not really put in here
  // call the function to display the initlal buttons
  renderButtons();
});
