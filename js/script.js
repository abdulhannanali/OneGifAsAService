(function(){
	var gifAPI = (function () {
			var searchEndpoint = "http://api.giphy.com/v1/gifs/search";
			var API_KEY = "dc6zaTOxFJmzC";

			// randomizer for a random number to select an image 
			function randomizer(data){
				return Math.floor(Math.random() * data.length);
			}
			
			function imageSetter(imgUrl){
				$("#gifSite").attr("src", imgUrl);

			}			

			function queryGifs(query, rating, limit) {
				var imgUrl;
				var dataObj = {
					q: query,
					api_key: API_KEY
				};
	
				if (rating) {
					dataObj.rating = rating;
				}
				if (!limit) {
					dataObj.limit = 1;
				}
				$.ajax({
					url: searchEndpoint,
					data : dataObj, 
					cache: true
				}).done(function(response) {
					
					// If there is no image found for the specified query
					// Initiating another for a not found gif
					if (response.data.length == 0){
						queryGifs("404 not found", 'r', 25);
						console.log("0");
					}
					else {
						var num = randomizer(response.data);
						imageUrl = response.data[num].images.original.url;

						// Setting image on gif site
						imageSetter(imageUrl);
					}
					
				});
			}

	
			return {
				searchGif: queryGifs,

				/// A seperate function to get a welcome image from sublime text
				getWelcome: function (){
					gifAPI.searchGif("welcome","r",25);
				}
			};
	
		})();


		$(document).ready(function(){

			var loadingImage = (function(){
				var img = new Image();
				img.src = "loading.gif"
				return img;
			}());


			gifAPI.getWelcome();

			$("#gifBtn").on("click", function(){
				var query = $("#gifBox").val();
				$("#gifSite").attr("src", loadingImage.src);				
				gifAPI.searchGif(query, "r", 25);
			});


		});
})();