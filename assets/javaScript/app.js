$(document).ready(function () {
  
  //Declare a initial array variable; further new topic will push into this array
  var topics = ["llama", "raccoon", "porcupine", "cat", "dog", "beaver", "horse",
    "koala", "sheep", "donkey", "deer","turkey","pig","cow", "moose", "polar bear","fox", "skunk", 
    "squirrel","armadillo", "wolf" 
  ];

  //complete to create button to the topic array
  function renderButtons() {
    //Use to prevent repeating exist topics when create button for new added animal
    $("#buttons-view").empty();
    // Looping through the array
    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button>");
      // Adding a class of animal to the button use to reference the class in later when user clicks the button
      newButton.addClass("animal");
      // Adding a data-attribute and make it equal to the name of a animal. reference its value when serach animal name in API request
      newButton.attr("data-name", topics[i]);
      // Providing the text in the button
      newButton.text(topics[i]);
      // Display the button to the HTML
      $("#buttons-view").append(newButton);
    };
  };

  // This is a event listener runs where submit button was clicked
  $("#add-animal").on("click", function (event) {
    //prevent submit the form when submit was clicked 
    event.preventDefault();
    //store the user input in a variable 
    var newAnimal = $("#user-input").val().trim();
    // use if statement to prevent blank input
    if (newAnimal === "") {
      alert("Please enter a name before click submit")
      return false;
    } else {
      //Adding the stored value into the array of topics,
      topics.push(newAnimal);
      // recall this function to make the new vaule also a button 
    renderButtons();
    }
   
  });

  //function for get the api request for the images of topic
  function getTheImage() {
    //variables declartion for forming the url use for the ajax request
    var apiKey = "GTcnBDlmXuXC0bdL3Xpq1GLOdqF0g7w1";
    // Get the vaule of the data-name attribute created in the rederButtons function 
    var animalName = $(this).attr("data-name");
    //Url to use in the ajax
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=" + apiKey;

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    }) .then(function (response) {
      //log the resulting object 
      console.log(response);
      // after log create a variable to hold the data array plan to use in this assignmnet 
      var results = response.data;
      //log the data to double check and uses as reference to look through for the images and rating information 
      console.log(results)

      //clear the html pages before show the new images need to check the id 
      $("#gifs-show").empty();
      // Looping over every result item
      for (var i = 0; i < 10; i++) { // set i <10 since we only need to see 10 images

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div has class named column for the gif
          var gifDiv = $("<div class='column'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var message = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var animalImage = $("<img class='gif'>");

          //Set multiple attributes and values:for using to response when click
          var stillUrl = results[i].images.fixed_height_still.url;
          var animateUrl = results[i].images.fixed_height.url;

          animalImage.attr("src", stillUrl);
          animalImage.attr("data-still", stillUrl);
          animalImage.attr("data-animate", animateUrl);
          animalImage.attr("data-state", "still");
          // Appending the paragraph and animalImage we created to the "gifDiv" div we created
          gifDiv.append(message);
          gifDiv.append(animalImage);

          // Prepending(so new images always start at the top ) the gifDiv to the "#gifs-show" div in the HTML
          $("#gifs-show").prepend(gifDiv);
        }
      }
    });
  }
 

  // Event Listener for showing the images while a buttton was clikced 
  $(document).on("click", ".animal", getTheImage);
 //copy the code from activity to get the pausing and play gif
  $(document).on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // if the state is still then update its image source url and data-state atrribute to animate
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    // when the state not equal still, then update its image urs and data-state atrribute to still
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  // call the function to display the initlal buttons
  renderButtons();
});
// problems need to fix later

/*1.  need to double check the code..
 be sure understand everypart and can redo this from scratch
  (highly recommand to set time to do it from scratch several times when its working ok)
2. need to remeber to set the width of p . look up and add class = w- (0-100)
3. fixing the image and form postion */
