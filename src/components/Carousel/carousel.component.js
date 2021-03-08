import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

import config from '../../config/setting';

import './carousel.component.css';

class CarouselComponent extends Component {
  state = {
    activeIndex: 0,
    slides: [],
  };


  componentWillMount() {
    this.getSlides();
  }

  getSlides = () => {
    axios.get(config.API_ENDPOINT + 'movie/upcoming' + config.API_KEY)
      .then(res => {
        this.setState({
          slides: res.data.results
        }, () => {
          //console.log(this.state.slides)
        }
        );
      }).catch(function (error) {
        console.log(error);
      });
  }

  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.slides.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.slides.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const activeIndex = this.state.activeIndex;
    const slides = this.state.slides.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.id}
          className="carousel__image"
        >
          <div className="gradient-img"></div>
          <div className="carousel__background" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`}}></div>
          <div className="carousel-caption d-none d-md-block">
          <Link
            to={`/movie/${item.id}`}>
            <h3>{item.title}</h3>
          </Link>
          <p>{item.overview}</p>
        </div>
        </CarouselItem>
      );
    });

    return (
      <div className="carousel__wrap">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={this.state.slides} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}


export default CarouselComponent;
