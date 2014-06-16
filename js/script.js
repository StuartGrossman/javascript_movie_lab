"use strict";

$(function(){
	var idList = []
	var nameList = []
	$("#searchButton").on("click", function(e){
		e.preventDefault()
		var userInput = $("#searchTerm").val();

		var request = {
			url: "http://www.omdbapi.com/",
			type: 'get',
			dataType: 'json',
			data: {s: userInput }
		}
		var response = $.ajax(request)
		response.done(function (data) {
			$('.movie_list').html('');
			idList = []
			nameList = []
			$.each(data["Search"], function(index, movie){
				$('.movie_list').append("<li>" + movie["Title"] + "</li>")
				 idList.push(movie['imdbID'])
				 nameList.push(movie['Title'])
				 console.log(idList)
				 console.log(nameList)
			})
		})
	})
	$('.movie_list').delegate('li', 'click', function(e){
	// $('.movie_info').remove();
	var userInput = $(e.target)
	var index = 0
	for(var i = 0; i <= nameList.length - 1; i++){
		if(nameList[i] == userInput.html()){
			console.log(nameList[i])
			index = i
		}
	}
	console.log(index)
	var idbm_input = idList[index]
	console.log(idbm_input)
	var request = {
	url: "http://www.omdbapi.com/",
	type: 'get',
	dataType: 'json',
	data: {i: idbm_input }
	}
		var response = $.ajax(request)
		 response.done(function (data) {
			console.log(data)
			$('.movie_info').html('');
			$('.movie_info').append("<center>"+ "<h3>" + data["Title"] + "</h3>" + "</center>")
			$('.movie_info').append("<li>" + "Actors-- " + data["Actors"] + "</li>" + "<br>")
			$('.movie_info').append("<li>" + "Rated-- " + data["Rated"] + "</li>" + "<br>")
			$('.movie_info').append("<li>" + "Writer-- " + data["Writer"] + "</li>" + "<br>")
				var url = "<img src=" + "'" + data["Poster"] + "'" + ">" 
				console.log(url);
			$('.movie_info').append(url)
		})
	})
});