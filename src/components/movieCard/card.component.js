import React from 'react';
import {Link} from 'react-router-dom';
import { Progress } from 'reactstrap';

const CardComponent = (props) =>  {

  const checkRating = () => {
    let rating = props.movie.vote_average * 10;
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

  // Our main app wrapper
  return(
    <div className="card">
    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt={ props.movie.title } ref={img => this.img = img} onError={
        () => this.img.src = 'http://riosparadalaw.com/en/wp-content/uploads/2014/02/placeholder-600x800.jpg'
      } />
    <div className="card-body">
      <h4 className="card-title">{ props.movie.title }</h4>
      <p className="card-text">{ props.movie.overview }</p>
      <br/>
      <span className="font-weight-bold card-body-break">Rating:</span>
      <div className="progress-wrap">
         <Progress color={checkRating()} value={props.movie.vote_average * 10}>{props.movie.vote_average * 10}%</Progress>
         <br/>
         <span className="font-weight-bold">Relese: </span><span className="badge badge-success">{ props.movie.release_date }</span>
       </div>
       <br/>
      <Link className="btn btn-primary btn-block"
        to={`/movie/${props.movie.id}`}>Details</Link>
    </div>
  </div>
  )
}

export default CardComponent;
