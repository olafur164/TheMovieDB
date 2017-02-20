class TheMovieDB {
    constructor() {
        this.api_key = ''; // Your api key
        this.base_uri = 'https://api.themoviedb.org/3/'; // Base URI
        this.img_uri = 'https://image.tmdb.org/t/p/'; // Image URI
    }

    generateQuery( options ) {
        'use strict';
        let myOptions, query, option;
        myOptions = options || {}
        query = "?api_key=" + this.api_key;
        if ( Object.keys( myOptions ).length > 0 ) {
            for ( option in myOptions ) {
                if ( myOptions.hasOwnProperty( option ) && option !== "id" && option !== "body" ) {
                    query = query + "&" + option + "=" + myOptions[ option ];
                }
            }
        }
        return query;
    }
    validateRequired( args, argsReq, opt, optReq, allOpt ) {
        'use strict';
        let i, allOptional;
        allOptional = allOpt || false;
        if ( args.length !== argsReq ) {
            throw "The method requires  " + argsReq + " arguments and you are sending " + args.length + "!";
        }
        if ( allOptional ) {
            return;
        }
        if ( argsReq > 2 ) {
            for ( i = 0; i < optReq.length; i = i + 1 ) {
                if ( !opt.hasOwnProperty( optReq[ i ] ) ) {
                    throw optReq[ i ] + " is a required parameter and is not present in the options!";
                }
            }
        }
    }
    getImage(options) {
        'use strict';
        return this.images_uri + options.size + "/" + options.file;
    }
    client(options) {
        var result = null;
         $.ajax({
            url: this.base_uri + options.url,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data) {
                result = data;
            } 
         });
         return result
    }
}
class Configurations extends TheMovieDB {
    getConfiguration() {
        'use strict';
        this.validateRequired(arguments, 1);
        return this.client(
            {
                url: "configuration" + this.generateQuery()
            }
        )
    }
}
class Authentication extends TheMovieDB {
    generateToken() {
        'use strict';
        this.validateRequired(arguments, 1);
        return this.client(
            {
                url: "authentication/token/new" + this.generateQuery()
            }
        )
    }
    askPermissions(options) {
        'use strict';
        window.open("https://www.themoviedb.org/authenticate/" + options.token + "?redirect_to=" + options.redirect_to);

    }
    validateUser(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["request_token", "username", "password"]);
        return this.client(
            {
                url: "authentication/token/validate_with_login" + this.generateQuery(options)
            }
        )
    }
    generateSession(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["request_token"]);
        return this.client(
            {
                url: "authentication/session/new" + this.generateQuery(options)
            }
        )
    }
    generateGuestSession() {
        'use strict';
        this.validateRequired(arguments, 1);
        return this.client(
            {
                url: "authentication/guest_session/new" + this.generateQuery(options)
            }
        )
    }
}
class Certifications extends TheMovieDB {
    getMovieChanges(options) {
        'use strict';
        this.validateRequired(arguments, 1, "", "", true);
        return this.client(
            {
                url: "movie/changes" + this.generateQuery(options)
            }
        )
    }
    getPersonChanges(options) {
        'use strict';
        this.validateRequired(arguments, 1, "", "", true);
        return this.client(
            {
                url: "person/changes" + this.generateQuery(options)
            }
        )
    }
}
class Collections extends TheMovieDB {
    getCollection(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id"]);
        return this.client(
            {
                url: "collection/" + options.id + this.generateQuery(options)
            }
        )
    }
    getCollectionImages(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id"]);
        return this.client(
            {
                url: "collection/" + options.id + "/images" + this.generateQuery(options)
            }
        )
    }
}
class Companies extends TheMovieDB {
    getCompany(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id"]);
        return this.client(
            {
                url: "company/" + options.id + this.generateQuery(options)
            }
        )
    }
    getCompanyMovies(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id"]);
        return this.client(
            {
                url: "company/" + options.id + "/movies" + this.generateQuery(options)
            }
        )
    }
}
class Credits extends TheMovieDB {
    getCredit(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id"]);
        return this.client(
            {
                url: "credit/" + options.id + this.generateQuery(options)
            }
        )
    }
}
class Discover extends TheMovieDB {
    getMovies(options) {
        'use strict';
        this.validateRequired(arguments, 1, "", "", true);
        return this.client(
            {
                url: "discover/movie" + this.generateQuery(options)
            }
        )
    }
    getTvShows(options) {
        'use strict';
        this.validateRequired(arguments, 1, "", "", true);
        return this.client(
            {
                url: "discover/tv" + this.generateQuery(options)
            }
        )
    }
}
class Find extends TheMovieDB {
    getById(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id", "external_source"]);
        return this.client(
            {
                url: "find/" + options.id + this.generateQuery(options)
            }
        )
    }
}
class Keywords extends TheMovieDB {
    getById(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id"]);
        return this.client(
            {
                url: "keyword/" + options.id + this.generateQuery(options)
            }
        )
    }
    getMovies(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id"]);
        return this.client(
            {
                url: "keyword/" + options.id + "/movies" + this.generateQuery(options)
            }
        )
    }
}
class Lists extends TheMovieDB {
    getById(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "list/" + options.id + this.generateQuery(options)
            }
        )
    }
    getStatusById(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id", "movie_id"] );
        return this.client(
            {
                url: "list/" + options.id + "/item_status" + this.generateQuery(options)
            }
        )
    }
}
class Genres extends TheMovieDB {
    getList(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, [] );
        return this.client(
            {
                url: "genre/movie/list" + this.generateQuery(options)
            }
        )
    }
    getMovies(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id",] );
        return this.client(
            {
                url: "genre/" + options.id + "/movies" + this.generateQuery(options)
            }
        )
    }
}
class Jobs extends TheMovieDB {   
    getList() {
        'use strict';
        this.validateRequired(arguments, 1);
        return this.client(
            {
                url: "job/list" + this.generateQuery(options)
            }
        )
    }
}
class Movies extends TheMovieDB {
    getById(options) {
        this.validateRequired(arguments, 1, options, [] );
        return this.client(
            {
                url: "movie/" + options.id + this.generateQuery(options)
            }
        )
    }
    getAccountStates() {

    }
    getAlternativeTitles() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/alternative_title" + this.generateQuery(options)
            }
        )
    }
    getCredits(options) {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/credits" + this.generateQuery(options)
            }
        )
    }
    getImages(options) {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/images" + this.generateQuery(options)
            }
        )
    }
    getKeywords() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/keywords" + this.generateQuery(options)
            }
        )
    }
    getReleases() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/releases" + this.generateQuery(options)
            }
        )}
    getTrailers(options) {    
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/trailers" + this.generateQuery(options)
            }
        )

    }
    getVideos() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/videos" + this.generateQuery(options)
            }
        )
    }
    getTranslations() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/translations" + this.generateQuery(options)
            }
        )
    }
    getSimilarMovies(options,callback) {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/similar" + this.generateQuery(options)
            }
        )
    }
    getReviews() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/reviews" + this.generateQuery(options)
            }
        )
    }
    getLists() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/lists" + this.generateQuery(options)
            }
        )
    }
    getChanges() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/changes" + this.generateQuery(options)
            }
        )
    }
    getLatest() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/latest" + this.generateQuery(options)
            }
        )
    }
    getNowPlaying() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/now_playing" + this.generateQuery(options)
            }
        )
    }
    getPopular(options,callback) {
        this.validateRequired(arguments, 1, options, [] );
        return this.client(
            {
                url: "movie/popular" + this.generateQuery(options)
            }
        )
    }
    getTopRated() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/top_rated" + this.generateQuery(options)
            }
        )

    }
    getUpcoming() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/upcoming" + this.generateQuery(options)
            }
        )
    }
    getStatus() {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "movie/" + options.id + "/account_states" + this.generateQuery(options)
            }
        )
    }

}
class TV extends TheMovieDB {
    getById(options) {
        this.validateRequired(arguments, 1, options, [] );
        return this.client(
            {
                url: "tv/" + options.id + this.generateQuery(options)
            }
        )
    }
    getCredits(options) {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "tv/" + options.id + "/credits" + this.generateQuery(options)
            }
        )
    }
    getImages(options) {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "tv/" + options.id + "/images" + this.generateQuery(options)
            }
        )
    }
    getTrailers(options) {    
        this.validateRequired(arguments, 1, options, ["id", "type"] );
        return this.client(
            {
                url: "tv/" + options.id + "/videos" + this.generateQuery(options)
            }
        )

    }
    getSimilar(options,callback) {
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "tv/" + options.id + "/similar" + this.generateQuery(options)
            }
        )
    }
}
class Search extends TheMovieDB {
    getMovies(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, [] );
        return this.client(
            {
                url: "search/movie" + this.generateQuery(options)
            }
        )
    }
    getMulti(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["query", "page"] );
        return this.client(
            {
                url: "search/multi" + this.generateQuery(options)
            }
        )
    }
}
class People extends TheMovieDB {
    getById(options) {
        'use strict';
        this.validateRequired(arguments, 1, options, ["id"] );
        return this.client(
            {
                url: "person/" + options.id + "" + this.generateQuery(options)
            }
        )
    }
}
