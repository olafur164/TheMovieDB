# TheMovieDB Class

We have a main class called TheMovieDB, in that class we have a few methods like getApi and requirevalidation and generateQuery
using these methods in extended classes like Movies we can make an api request and fetch data from themoviedb.org
### Movies examples


Get data by movie id
```js
const db = new Movies();
const data = db.getById({id: 2});
```

Get Credits for movie
```js
const db = new Movies();
const data = db.getCredits({id: 2});
```

Get Trailers for movie
```js
const db = new Movies();
const data = db.getTrailers({id: 2});
```

Get Stills for movies by movie id
```js
const db = new Movies();
const data = db.getImages({id: 2});
```

Get Similar movies by movie id
```js
const db = new Movies();
const data = db.getSimilarMovies({id: 2});
```

### Search Examples

Fetching data from multi search, searching for deadpool on page 1
```js
const db = new Search();
const data = db.getMulti({query: 'deadpool', page: 1})
```
