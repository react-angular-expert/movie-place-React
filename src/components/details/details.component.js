import React, {Component} from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { Circle } from 'rc-progress';

import config from '../../config/setting';

import CastComponent from '../cast/cast.component';
import CrewComponent from '../Crew/crew.component';
import Loading from '../Loading/loading.component';

import './details.component.css';

class DetailsComponent extends Component {
  state = {
    movie: [],
    reviews: [],
    loading: true,
  };

  componentWillMount() {
    this.getMovie();
    this.getMovieReview();
  }

  getMovie = () => {
    let movieId = this.props.match.params.id;
    axios.get(config.API_ENDPOINT + 'movie/' + movieId + config.API_KEY)
      .then(res => {
        this.setState({
          movie: res.data,
          loading: false
        }, () => {
          // console.log(this.state.movie);
        });
      })
      .catch(err => console.log(err));
  }

  getMovieReview = () => {
    let movieId = this.props.match.params.id;
    axios.get(config.API_ENDPOINT + 'movie/' + movieId + '/reviews' + config.API_KEY)
      .then(res => {
        this.setState({
          reviews: res.data.results,
        }, () => {
          console.log(this.state.reviews);
        });
      })
      .catch(err => console.log(err));
  }

  checkRating = () => {
    const movieFile = this.state.movie;
    let rating = movieFile.vote_average * 10;
    let clsName = "";

    if(rating < 20) {
      return clsName = "danger";
    } else if(rating < 60) {
      return clsName ="warning";
    } else if(rating < 80) {
      return clsName ="info";
    } else {
      return clsName ="success";
    }
  }

  revenue = () => {
    const movie = this.state.movie;
    const max = movie.revenue + movie.budget;
    const maxNumber = +max;
    const revenue = +movie.revenue;
    const current = revenue * 100 / maxNumber;
    return current
  }

  onReviews = () => {
     return this.state.reviews.map((rev) => {
         return (
           <div key={rev.id} className="tab blue">
              <input id={rev.id} type="radio" name="tabs2" />
              <label htmlFor={rev.id}>{ rev.author }</label>
              <div className="tab-content">
                <p>{ rev.content }</p>
              </div>
            </div>
         )
      })

  }

  render() {
    const { loading } = this.state;
    const movieFile = this.state.movie;
    const movieId = this.props.match.params.id;

    if(loading) {
      return <Loading />
    }

    return (
      <div className="detail-wrapper">

        <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieFile.backdrop_path})`}}
             className="poster">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <h1 className="poster__header">{movieFile.original_title}</h1>
                <h2 className="txt-color poster__tagline">{ movieFile.tagline }</h2>
                <p className="txt-color">Relese Date: <span className="badge badge-success">{ movieFile.release_date }</span></p>
                <p className="txt-color poster__overview"><span className="font-weight-bold">Overview:</span> <br/> { movieFile.overview }</p>
                <a className="txt-color" href={ movieFile.homepage } target="_blank">Visit movie page</a>
              </div>
            <div className="col-12 col-md-6 poster__image-wrap">
                <img className="poster__image" src={`https://image.tmdb.org/t/p/w500/${movieFile.poster_path}`} alt="{ movieFile.original_title }" />
            </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <br />
              <h3 className="text-center">Movie Rating</h3>
              <Progress color={this.checkRating()} value={movieFile.vote_average * 10}>{movieFile.vote_average * 10}%</Progress>
            </div>
          </div>
        </div>

        <CastComponent id={movieId}/>

        <div className="row money">
          <div className="col-12 col-sm-12 col-md-4">
            <CrewComponent id={movieId}/>
          </div>
          <div className="col-12 col-sm-12 col-md-4 revenue">
            <h3>Box Office Numbers</h3>
            <br/>
          <p>Movie Budget: <span className="revenue__budget">{`$ ${movieFile.budget}.00`}</span></p>
            <br/>
          <p>Movie Income: <span className="revenue__income">{`$ ${movieFile.revenue}.00`}</span></p>
            <br/>
            <div className="revenue__wrap">
              <Circle className="revenue__graph" percent={this.revenue()} strokeWidth="3" strokeColor={movieFile.revenue - movieFile.budget > 0 ? '#45ccce' : 'red'} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4">
             <h3>Reviews</h3>
             <div className="review__wrap">
               {this.onReviews()}
             </div>
          </div>
        </div>

      </div>
    );
  }
}

export default DetailsComponent;
