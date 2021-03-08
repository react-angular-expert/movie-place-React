import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import config from '../../config/setting';
import './genre.component.css';

import Loading from '../Loading/loading.component';

class GenresComponent extends Component {
  state = {
    genres: [],
    loading: true
  }

  componentWillMount() {
    this.getGenres();
  }

  getGenres = () => {
    axios.get(config.API_ENDPOINT + 'genre/movie/list' + config.API_KEY)
      .then(res => {
        this.setState({
          genres: res.data.genres,
          loading: false
        }, () => {
          //console.log(this.state.genres)
        }
        );
      }).catch(function (error) {
        console.log(error);
      });
  }

  renderGenres = () => {
    return this.state.genres.map((genre) => {
      return (
        <Link className={`genre-badge genre-badge-${genre.name}`} key={genre.id} to={`/genre/${genre.id}`}>{genre.name}</Link>
      )
    });
  }


  render() {
    const { loading } = this.state;


    if(loading) {
      return <Loading />

    }

    return (
      <div className="movie_wrap">
        {this.renderGenres()}
      </div>
    )
  }
}
export default GenresComponent;
