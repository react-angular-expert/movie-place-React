import React, {Component} from 'react';
import axios from 'axios';

import config from '../../config/setting';

import Loading from '../Loading/loading.component';
import CardComponent from '../movieCard/card.component';

class GenreComponent extends Component {
  state = {
    movie: [],
    genres: [],
    disabled: true,
    page: 1,
    loading: true,
    name: 0
  }

  componentWillMount() {
    this.getGenres();
    this.getGenre();
  }

  getGenre = () => {
    let movieId = this.props.match.params.id;
    axios.get(config.API_ENDPOINT + 'genre/' + movieId + '/movies' + config.API_KEY + '&sort_by=created_at.asc')
      .then(res => {
        this.setState({
          movie: res.data.results,
          name: res.data.id,
          loading: false
        }, () => {
          //console.log(this.state.movie);
        });
      })
      .catch(err => console.log(err));
  }

  getGenres = () => {
    axios.get(config.API_ENDPOINT + 'genre/movie/list' + config.API_KEY)
      .then(res => {
        this.setState({
          genres: res.data.genres,
        }, () => {
          //console.log(this.state.genres)
        }
        );
      }).catch(function (error) {
        console.log(error);
      });
  }

  renderMovies = () => {
    return this.state.movie.map((m) => {
      return (
        <CardComponent key={m.id} movie={m}/>
      )
    });
  }

  getGenreName = () => {
    return this.state.genres.map((genre) => {
      if(this.state.name === genre.id) {
        return <h1 key={genre.id} className="featured-header">{genre.name}</h1>
      }
      return null;
    });
  }

  next = () => {
    let movieId = this.props.match.params.id;
    this.state.page +=1;
    axios.get(config.API_ENDPOINT + 'genre/' + movieId + '/movies' +  config.API_KEY + '&sort_by=created_at.asc' + '&page=' + this.state.page)
      .then(res => {
        this.setState({
          movie: res.data.results,
          disabled: false
        }, () => {
          window.scrollTo(0, 0);
        }
        );
      }).catch(function (error) {
        console.log(error);
      });
  }

  prev = () => {
    let movieId = this.props.match.params.id;
    this.state.page -=1;
    if(this.state.page === 1) {
      this.setState({
        disabled: true
      })
    }
    axios.get(config.API_ENDPOINT  + 'genre/' + movieId + '/movies' +   config.API_KEY + '&sort_by=created_at.asc' + '&page=' + this.state.page)
      .then(res => {
        this.setState({
          movie: res.data.results
        }, () => {
          window.scrollTo(0, 0);
        }
        );
      }).catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { loading } = this.state;

    if(loading) {
      return <Loading />
    }


    return(
      <div className="movie_wrap">
        <div className="container">
          {this.getGenreName()}

          <div className="card-wrap">
            {this.renderMovies()}
          </div>

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${this.state.disabled && 'disabled'}`}>
                <a className="page-link"
                   onClick={this.prev}>
                   Previous</a>
              </li>
              <li className="page-item">
                <a className="page-link"
                    onClick={this.next}>
                    Next</a>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    )
  }
}

export default GenreComponent;
