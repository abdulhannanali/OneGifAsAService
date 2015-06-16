(function(){
	var gifAPI = (function () {
			var searchEndpoint = "http://api.giphy.com/v1/gifs/search";
			var API_KEY = "dc6zaTOxFJmzC";

			// randomizer for a random number to select an image 
			function randomizer(data){
				return Math.floor(Math.random() * data.length);
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
					data : dataObj
				}).done(function(response) {
					
					// If there is no image found for the specified query
					// Initiating another for a not found gif
					if (response.data.length == 0){
						queryGifs("notfound", 'r', 25);
					}
					else {
						var num = randomizer(response.data);
						imageUrl = response.data[num].images.original;

						// Setting image on gif site
						$("#gifSite").attr("src", imageUrl);
	
					}
					
				});
			}

	
			return {
				searchGif: queryGifs,

				/// A seperate function to get a welcome image from sublime text
				getWelcome: function (){
					
				}
			};
	
		})();


		$(document).ready(function(){
			gifAPI.getWelcome();

			$("#gifBtn").on("click", function(){
				var query = $("#gifBox").val();
				gifAPI.searchGif(query).done(function(respone){

				});
			});
		});
})();