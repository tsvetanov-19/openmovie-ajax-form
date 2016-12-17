var FormAPI = {
    init : function () {
        FormAPI.callAPI();
        FormAPI.regularLayout();
        FormAPI.fancyLayout();
    },

    callAPI : function() {
        $(".form-horizontal").submit(function( event ) {
            event.preventDefault();
            movieAPIUrl = 'http://www.omdbapi.com/';
            //var element = $('*');
            var movieTitle = $("#searchinput").val();
            movieTitle = movieTitle.replace(/(\s)+/g, '+');
            //movieTitle.split(" ").join("+");
            var movieType = $("#selectMovieType").val();
            var movieRating =$('input[name=rating]:checked', '.form-horizontal').val();
            var plotType = $('input[name=plot]:checked', '.form-horizontal').val();
            var boxes = [];
            $(".movie-box input:checkbox:checked").each(function() {
                boxes.push($(this).val());
            });
            console.log(boxes);
            var queryString = '?t=' + movieTitle + '&type='+ movieType + '&plot=' + plotType + '&tomatoes=' + movieRating;
            console.log(queryString);

            $.ajax({
                method: "POST",
                url: movieAPIUrl + queryString,
                data: {},
                success: function (response) {
                    console.log(response);
                    if(response.Response == 'False') {
                        alert("Movie not found!");
                    }

                    else {

                        var div = $('div[id^="movie"]:last');
                        var divTemplate = $('div[id="movie0"]');
                        console.log(divTemplate);
                        var num = parseInt( div.prop("id").match(/\d+/g), 10 ) +1;

                        var newMovie = divTemplate.clone().prop('id', 'movie'+num );
                        newMovie.find('.movie-title').text(response.Title);
                        newMovie.find('.movie-plot').text(response.Plot);
                        console.log(newMovie);
                        newMovie.insertAfter(div);
                        //set movie data from OpenMovie API


                        //todo: replace this if-else sequence  with a dynamic loop for the checkboxes
                        if(jQuery.inArray("actors", boxes) !== -1) {
                            newMovie.find('.movie-actors').text(response.Actors);
                        }
                        else {
                            newMovie.find('.movie-actors').remove();
                        }


                        if(jQuery.inArray("director", boxes) !== -1) {
                            newMovie.find('.movie-director').text(response.Director);
                        }
                        else {
                            newMovie.find('.movie-director').remove();
                        }


                        if(jQuery.inArray("released", boxes) !== -1) {
                            console.log('released');
                            newMovie.find('.movie-release-date').text(response.Released);
                        }
                        else {
                            newMovie.find('.movie-release-date').remove();
                        }


                        if(jQuery.inArray("genre", boxes) !== -1) {
                            newMovie.find('.movie-genre').text(response.Genre);
                        }
                        else {
                            newMovie.find('.movie-genre').remove();
                        }


                        if(movieRating =='true') {
                            console.log('rotten');
                            newMovie.find('.movie-rating').html('<a target="_blank" href="'+ response.tomatoURL+'"> Rotten tomatoes </a>');
                        }
                        else {
                            newMovie.remove('.movie-rating');
                        }


                        var img = newMovie.find("img");
                        img.attr("src",response.Poster);

                        newMovie.removeAttr('hidden');
                        newMovie.removeAttr('style');
                    }

                }
            });
        });
    },

    regularLayout : function() {
        $(document).on('click', '#regular', function (e) {
            e.preventDefault();
            console.log("regular");
            $(".movie-div").removeClass("div-inline");
        });
    },

    fancyLayout : function() {
        $(document).on('click', '#fancy', function (e) {
            e.preventDefault();
            console.log("fancy");
            $(".movie-div").addClass("div-inline");
            //TODO: replace this dirty little hack with permanent fix
            $("#movie0").hide();
        });
    },


};

$(document).ready(function () {
     FormAPI.init();
});

//helpers
