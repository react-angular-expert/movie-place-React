import React, {Component} from 'react';
import axios from 'axios';

import './cast.details.component.css';

import config from '../../config/setting';

import CardComponent from '../movieCard/card.component';

class CastDetailsComponent extends Component {
  state = {
    person: [],
    projects: [],
    loading: true,
  }

  componentWillMount() {
    this.getPersonDetails();
    this.getPersonMovies();
  }

  getPersonDetails = () => {
    let personId = this.props.match.params.id;
    axios.get(config.API_ENDPOINT + 'person/' + personId + config.API_KEY)
      .then(res => {
        this.setState({
          person: res.data,
          loading: false
        }, () => {
          //console.log(this.state.person);
        });
      })
      .catch(err => console.log(err));
  }

  getPersonMovies = () => {
    let personId = this.props.match.params.id;
    axios.get(config.API_ENDPOINT + 'person/' + personId + '/movie_credits' + config.API_KEY)
      .then(res => {
        this.setState({
          projects: res.data.cast,
        }, () => {
          //console.log(this.state.projects);
        });
      })
      .catch(err => console.log(err));
  }


  death = (data) => {
    if(data) {
      return <p className="txt-color">Death Date: <span className="badge badge-danger">{ data }</span></p>
    }
  }

  onPersonMoviesReceived = () => {
    return this.state.projects.map((movie) => {
      return <CardComponent key={movie.id} movie={movie}/>
    });
  }

  render() {
    const person = this.state.person;

    return(
      <div>
        <div className="poster">
          <div className="container movie_wrap">
            <div className="row">
              <div className="col">
                <h1 className="poster__header">{ person.name }</h1>
                <h2 className="txt-color poster__tagline">{ person.place_of_birth }</h2>
                <p className="txt-color">Birth Date: <span className="badge badge-success">{ person.birthday }</span></p>
                {this.death(person.deathday)}
                <p className="txt-color poster__overview"><span className="font-weight-bold">Overview:</span> <br/> { person.biography }</p>
              </div>
            <div className="col poster__image-wrap">
                <img className="poster__image" src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={ person.name } />
            </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="card-wrap">
            {this.onPersonMoviesReceived()}
          </div>
        </div>

      </div>

    )
  }
}

export default CastDetailsComponent;
