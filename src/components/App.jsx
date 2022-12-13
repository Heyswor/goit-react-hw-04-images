// import {} from '';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import { searchImg } from './services/pixabiApi';
import {Notify} from 'notiflix';
import { Vortex } from 'react-loader-spinner';

export class App extends Component {
  state = {
    searchValue: null,
    page: 1,
    isLoading: false,
    entryData: [],
    error: null,
    loadMoreBtnShown: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      searchImg(searchValue, page)
        .then(data => {
          if (data.total === 0) {
            this.setState({ isLoading: false });
            return Notify.failure(`Nothing was found for ${searchValue}`);
          }
          if (data.hits.length < 12) {
            this.setState({ loadMoreBtnShown: false });
          }
          this.setState(prevState => ({
            entryData: [...prevState.entryData, ...data.hits],
            isLoading: false,
          }));
        })
        .catch(error => {
          console.log(error);
          this.setState({ error });
        });
    }
  }

  handleDataAdd = searchValue => {
    this.setState({
      searchValue,
      page: 1,
      entryData: [],
      isLoading: true,
      loadMoreBtnShown: true,
    });
  };

  handleLoadMoreBtnShown = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  render() {
    const { isLoading, entryData, loadMoreBtnShown, searchValue } = this.state;

    return (
      <div>
        <Searchbar
          onSubmit={this.handleDataAdd}
          isLoading={isLoading}
          searchValue={searchValue}
        />

        {entryData.length > 0 && (
          <ImageGallery>
            {entryData.map(element => (
              <ImageGalleryItem key={element.id} image={element} />
            ))}
          </ImageGallery>
        )}
        {isLoading && (
          <Vortex
            visible={true}
            height="200"
            width="200"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortexWrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
        )}

        {entryData.length > 0 && !isLoading && loadMoreBtnShown && (
          <Button text="Load More" onClick={this.handleLoadMoreBtnShown} />
        )}
      </div>
    );
  }
}
