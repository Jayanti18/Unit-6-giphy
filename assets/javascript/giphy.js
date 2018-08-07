

var animals = ["cat", "dog", "rabbit", "tiger", "lion", "chicken", "goldfish", "bird", "goat", "squirrel", "frog","turtle", "donkey"]; 


// Adding a click event listener to all elements with a class of "animal-btn"
            
            $(document).on("click", ".btn-info", displayAnimalInfo);
            renderButtons();
            
            // displayAnimalInfo function re-renders the HTML to display the appropriate content
            function displayAnimalInfo() {
                //First clear the previous gifs 
                $("#gifs-appear-here").empty();
                // Grabbing and storing the data-animal property value from the button
                var animal = $(this).attr("data-name");
                // var dstill = $(this).attr("data-state");
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=MPP1hsyRO2fkXqhVydWUuVh3BtfhEztj&limit=10";

                // AJAX GET request to queryURL
                $.ajax({
                    url: queryURL,
                    method: "Get"
                })

                    .then(function (response) {

                        // storing the data from the AJAX request in the results variable
                        var results = response.data;
                        console.log(results);

                        // Looping through each result item
                        for (var i = 0; i < results.length; i++) {

                            // Creating and storing a div tag
                            var animalDiv = $("<div>");

                            // Creating a paragraph tag with the result item's rating
                            var p = $("<p>").text("Rating: " + results[i].rating);

                            // Creating and storing an image tag
                            var animalImage = $("<img>");
                            animalImage.addClass("gif");

                            // Setting the src attribute of the image to a property pulled off the result item, also stroe the still url in variable data-still and animated url in data-animate

                            animalImage.attr("src", results[i].images.fixed_height.url);
                            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                            animalImage.attr("data-animate", results[i].images.fixed_height.url);
                            animalImage.attr("data-state", 'unstill');

                            // animalImage.attr("src", results[i].images.fixed_height.url, "dataanimate", results[i].images.fixed_height.url, "datastill", results[i].images.fixed_height_still.url, "data-state:", "unstill");
                            // animalImage.attr({
                            //     src: results[i].images.fixed_height.url,
                            //     dataanimate: results[i].images.fixed_height.url,
                            //     datastill: results[i].images.fixed_height_still.url,
                            //     data-state: "unstill" 
                            // });


                       console.log(animalImage.attr);
                            // Appending the paragraph and image tag to the animalDiv
                            animalDiv.append(p);
                            animalDiv.append(animalImage);

                            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                            $("#gifs-appear-here").append(animalDiv);
                        }
                    });

            };

            function renderButtons() {

                // Deleting the animals prior to adding new animals otherwise the buttons will repeat
                $("#animal-buttons").empty();
                // document.gif.innerHTML = ' ';
                // Looping through the array of animals
                for (var i = 0; i < animals.length; i++) {
                    // Then dynamicaly generating buttons for each animal in the array
                    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
                    var a = $("<button>");
                    // Adding a class of animal-btn to our button
                    a.addClass("btn btn-info");
                    // Adding a data-attribute
                    a.attr("data-name", animals[i]);
                    // Providing the initial button text
                    a.text(animals[i]);
                    // Adding the button to the HTML
                    $("#animal-buttons").append(a);
                }
            }

            // This function handles the addition of an animal button when the Submit button is clicked
            $("#add-animal").on("click", function (event) {
                event.preventDefault();
                // This line grabs the input from the textbox
                var animal = $("#atd").val().trim();
                // Adding animal from the textbox to our array
                animals.push(animal);
                // reset the text box to blank
                document.getElementById("atd").value = "";
                // Calling renderButtons which handles the processing of our animal array
                renderButtons();
            });

        

         //code to stop and play the picture when clicked or toggle     
            $(".gif").on("click", function () {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                // var state = $(this).attr("datastate");
                var state = JSON.parse("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state !== "still") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                } else {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
                $(this).attr("src", JSON.PARSE("data-still"));
            });




            // Pseudocoding

// create an array of animals.
// build the animal button dynamically (reading from array) and display on the top.
// when animal button is clicked it pass this animal name to the URL with key.
// append at least 10picture on the screen.
// if user adds a button then add this button in the array and reload the buttons from the updated array.
// check user click gif pic, toggle between still and animation.

