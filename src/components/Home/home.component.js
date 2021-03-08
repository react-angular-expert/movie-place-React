import React, {Component} from 'react';
import axios from 'axios';

import CarouselComponent from '../Carousel/carousel.component';
import CardComponent from '../movieCard/card.component';

import config from '../../config/setting';

class HomeComponent extends Component {
  state = {
    featured: [],
  };

  componentWillMount = () => {
    this.getMeetups();
  }

  getMeetups = () => {
    axios.get(config.API_ENDPOINT + 'movie/upcoming' + config.API_KEY)
      .then(res => {
        this.setState({
          featured: res.data.results
        }, () => {
          //console.log(this.state.featured)
        }
        );
      }).catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const movies = this.state.featured.map((item) => {
      return (
        <div className="card-wrap-div"  key={item.id}>
          <CardComponent movie={item}/>
        </div>
      );
    });

    return (
      <div>
        <CarouselComponent />
        <div className="container">
            <br/>
            <h1 className="featured-header">Featured Movies</h1>

            <div className="card-wrap">
              {movies}
            </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
