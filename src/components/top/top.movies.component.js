import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import { Button, ButtonGroup } from 'reactstrap';

import config from '../../config/setting';

import CardComponent from '../movieCard/card.component';
import Loading from '../Loading/loading.component';

class TopMoviesComponent extends Component {
  state = {
    top: [],
    page: 1,
    disabled: true,
    loading: true,
  }

  componentWillMount() {
    this.getTopMovies();
  }

  getTopMovies = () => {
    axios.get(config.API_ENDPOINT + 'movie/top_rated' + config.API_KEY)
      .then(res => {
        this.setState({
          top: res.data.results,
          loading: false
        }, () => {
          //console.log(this.state.popular)
        }
        );
      }).catch(function (error) {
        console.log(error);
      });
  }

  renderMovies = () => {
    return this.state.top.map((movie) => {
      return (
        <CardComponent movie={movie}/>
      )
    });
  }

  next = () => {
    this.state.page +=1;
    axios.get(config.API_ENDPOINT + 'movie/top_rated' + config.API_KEY + '&page=' + this.state.page)
      .then(res => {
        this.setState({
          top: res.data.results,
          disabled: false
        }, () => {
          window.scrollTo(0, 0);
          //console.log(this.state.popular)
        }
        );
      }).catch(function (error) {
        console.log(error);
      });
  }

  prev = () => {
    this.state.page -=1;
    if(this.state.page === 1) {
      this.setState({
        disabled: true
      })
    }
    axios.get(config.API_ENDPOINT + 'movie/top_rated' + config.API_KEY + '&page=' + this.state.page)
      .then(res => {
        this.setState({
          top: res.data.results
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

    return (
      <div className="container movie_wrap">
        <h1 className="featured-header">Popular Movies</h1>
        <ButtonGroup>
          <Button><Link to={'/movies/popular'}>Popular</Link></Button>{' '}
          <Button active><Link to={'/movies/top'}>Top Rated</Link></Button>{' '}
          <Button><Link to={'/movies/upcoming'}>Upcoming</Link></Button>
        </ButtonGroup>

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
    )
  }
}
export default TopMoviesComponent;
