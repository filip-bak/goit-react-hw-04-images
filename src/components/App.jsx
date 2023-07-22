import React, { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import getData, { getTotalPages } from 'api';
import DotsLoader from './DotsLoader';
import Placeholder from './Placeholder';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    currentPage: 0,
    searchQuery: null,
    totalPages: 0,
    language: 'en',
  };

  handleSubmit = query => {
    const { searchQuery } = this.state;
    if (searchQuery === query) {
      return;
    }
    this.setState({ searchQuery: query, currentPage: 1, loading: true });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      loading: true,
    }));
  };

  ifShowButton = () => {
    const { images, searchQuery, currentPage, totalPages } = this.state;

    const noMoreImages = totalPages === currentPage;

    if (images.length < 12 || noMoreImages) {
      return false;
    } else if (searchQuery !== null) {
      return true;
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      const { searchQuery, currentPage, totalPages } = this.state;

      if (
        prevState.searchQuery !== searchQuery ||
        prevState.currentPage !== currentPage
      ) {
        const data = await getData({
          searchQuery,
          currentPage,
        });

        // On searchQuery change get new state
        if (prevState.searchQuery !== searchQuery) {
          this.setState({
            images: data.hits,
            totalPages: getTotalPages(data.totalHits, 12),
            loading: false,
          });

          window.scrollTo(0, 0);

          return;
        }

        if (totalPages < currentPage) {
          this.setState({ currentPage: totalPages + 1, loading: false });

          return;
        }

        this.setState(prevState => ({
          ...prevState,
          loading: false,
          images: [...prevState.images, ...data.hits],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { images, loading, currentPage, totalPages } = this.state;
    const ifNoImagesFound =
      images.length === 0 &&
      currentPage === 1 &&
      totalPages === 0 &&
      loading === false;

    return (
      <div className="wrapper">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />

        {ifNoImagesFound && <Placeholder title="Sorry, no images found" />}

        {loading ? (
          <DotsLoader loading={loading} />
        ) : (
          this.ifShowButton() && <Button onLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
