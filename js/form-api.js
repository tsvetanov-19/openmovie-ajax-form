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

                        var $div = $('div[id^="movie"]:last');
                        console.log($div);
                        var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;

                        var $newMovie = $div.clone().prop('id', 'movie'+num );
                        $newMovie.find('.movie-title').text(response.Title);
                        $newMovie.find('.movie-plot').text(response.Plot);
                        console.log($newMovie);
                        $newMovie.insertAfter($div);
                        //set movie data from OpenMovie API

                        if(jQuery.inArray("actors", boxes) !== -1) {
                           $newMovie.find('.movie-actors').text(response.Actors);
                        }

                        if(jQuery.inArray("director", boxes) !== -1) {
                            $newMovie.find('.movie-director').text(response.Director);
                        }

                        if(jQuery.inArray("released", boxes) !== -1) {
                            $newMovie.find('.movie-release-date').text(response.Released);
                        }

                        if(jQuery.inArray("genre", boxes) !== -1) {
                            $newMovie.find('.movie-genre').text(response.Genre);
                        }

                        if(movieRating =='true') {
                            $newMovie.find('.movie-rating').html('<a target="_blank" href="'+ response.tomatoURL+'"> Rotten tomatoes </a>');
                        }


                        var img = $($newMovie).find("img");
                        img.attr("src",response.Poster);

                        $newMovie.removeAttr('hidden');
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
            $("#movie0").hide();
        });
    },


};

$(document).ready(function () {
     FormAPI.init();
});

//helpers
