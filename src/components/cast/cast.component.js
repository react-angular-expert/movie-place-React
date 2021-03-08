import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import config from '../../config/setting';

import './cast.component.css';

class CastComponent extends Component {
  state = {
    cast: [],
    id: this.props.id,
  }

    componentWillMount() {
      this.getCast();
    }

    getCast = () => {
      let movieId = this.props.id;
      axios.get(config.API_ENDPOINT + 'movie/' + movieId + '/credits'+ config.API_KEY)
        .then(res => {
          this.setState({
            cast: res.data.cast,
          }, () => {
            //console.log(this.state.cast);
          });
        })
        .catch(err => console.log(err));
    }

    cast = () => {
      return this.state.cast.slice(0, 8).map((person) => {
        return (
          <Link className="cast-wrap" key={person.id} to={`/cast/${person.id}`}>
            <div key={person.id}>
              <div className="card">
                <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt="img tag" ref={img => this.img = img} onError={
                    () => this.img.src = 'http://riosparadalaw.com/en/wp-content/uploads/2014/02/placeholder-600x800.jpg'
                  } />
                <div className="card-body">
                  <h5 className="title">{ person.name }</h5>
                  <span className="text-muted">{ person.character }</span>
                </div>
              </div>
            </div>
          </Link>
        );
      });
    }

    render() {
      return(
        <div className="cast">
          {this.cast()}
        </div>
      )
    };
}

export default CastComponent;
