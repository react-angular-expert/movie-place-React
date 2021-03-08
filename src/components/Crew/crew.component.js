import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './crew.component.css';

import config from '../../config/setting';

class CrewComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        crew: [],
        id: this.props.id,
      }
    }

    componentWillMount() {
      this.getCrew();
    }

    getCrew = () => {
      let movieId = this.props.id;
      axios.get(config.API_ENDPOINT + 'movie/' + movieId + '/credits'+ config.API_KEY)
        .then(res => {
          this.setState({
            crew: res.data.crew,
          }, () => {
            //console.log(this.state.crew);
          });
        })
        .catch(err => console.log(err));
    }

    crew = () => {
      return this.state.crew.map((person) => {
        if(person.job === 'Director') {
          return (
            <Link key={person.id} to={`/cast/${person.id}`}>
              <div className="card card-director" key="person.id">
                <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} ref={img => this.img = img} onError={
                    () => this.img.src = 'http://riosparadalaw.com/en/wp-content/uploads/2014/02/placeholder-600x800.jpg'}
                />
                <div className="card-body">
                  <h5 className="card-title">{person.name}</h5>
                  <span className="text">{person.job}</span>
                  </div>
              </div>
            </Link>
          )
        }
        return null;
      });
    }

    render() {
      return(
        <div>
          {this.crew()}
        </div>
      )
    };
}

export default CrewComponent;
