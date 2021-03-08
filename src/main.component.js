import React from 'react';
import {Switch, Route} from 'react-router';

import './main.component.css';

// Components import
import HomeComponent from './components/Home/home.component';
import DetailsComponent from './components/details/details.component';
import MoviesComponent from './components/movies/movies.component';
import TopMoviesComponent from './components/top/top.movies.component';
import UpcomingMoviesComponent from './components/upcoming/upcoming.movie.component';
import SearchComponent from './components/search/search.component';
import CastDetailsComponent from './components/CastDetails/cast.details.component';
import GenresComponent from './components/genres/genres.component';
import GenreComponent from './components/genre/genre.component';
import NoMatch from './components/404/noMatch.component';

const Main = () => (
  // Our Main App ROUTER
  <main className="wrap-container">
    <Switch>
      <Route exact path="/" component={HomeComponent}/>
      <Route exact path="/movie/:id" component={DetailsComponent}/>
      <Route exact path="/movies/popular" component={MoviesComponent}/>
      <Route exact path="/movies/top" component={TopMoviesComponent}/>
      <Route exact path="/movies/upcoming" component={UpcomingMoviesComponent}/>
      <Route exact path="/movies/search" component={SearchComponent}/>
      <Route exact path="/cast/:id" component={CastDetailsComponent}/>
      <Route exact path="/genres" component={GenresComponent}/>
      <Route exact path="/genre/:id" component={GenreComponent}/>
      <Route component={NoMatch}/>
    </Switch>
  </main>
);

export default Main;
