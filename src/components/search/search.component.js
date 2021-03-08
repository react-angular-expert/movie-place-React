import React, {Component} from 'react';
import axios from 'axios';

import config from '../../config/setting';

import { Alert } from 'reactstrap';
import CardComponent from '../movieCard/card.component';

class SearchComponent  extends Component {
  state = {
    search: '',
    result: [],
    error: false
  }

  search = (e) => {
    this.setState({search: e.target.value});
  }

  submitSearch = (e) => {
    if(this.state.search.length > 2) {
      this.onSearchEnter();
      this.showError(false);
      this.getSearchedMovies();
      this.setState({search: ''});
    } else {
      this.showError(true);
    }
    e.preventDefault();
  }

  getSearchedMovies = () => {
    axios.get(config.API_ENDPOINT + 'search/movie' + config.API_KEY + '&query=' + this.state.search)
      .then(res => {
        this.setState({
          result: res.data.results,
        }, () => {
          console.log(this.state.result)
        }
        );
      }).catch(function (error) {
        console.log(error);
      });
  }

  showMovies = () => {
    return  this.state.result.map((movie) => {
      return (
        <CardComponent key={movie.id} movie={movie}/>
      )
    });
  }

  showError = (show) => {
    this.setState(prevState => ({
      error: show
    }))
  }

  rerenderError = () => {
    if(this.state.error) {
      return <Alert color="warning">
                This is a warning alert — check it out!
              </Alert>
    } else {
      return null
    }
  }

  onSearchEnter = () => {
    console.log(this.state.search);
  }

  // Our main app wrapper
  render() {
    return(
      <div className="container movie_wrap">
        <br/>
        <form>
          <div className="input-group">
            <input minLength="3"
                   required
                   name="search"
                   onChange={this.search}
                   value={this.state.search}
                   className="form-control" type="text" placeholder="Search" />
            <button className="btn btn-outline-success"
                    type="submit"
                    onClick={this.submitSearch}>Search</button>
          </div>
          <br/>
          {this.rerenderError()}
        </form>

        <div className="card-wrap">
          {this.showMovies()}
        </div>

      </div>
    )
  }
}

export default SearchComponent;
