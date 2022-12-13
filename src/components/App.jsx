// import {} from '';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { useState, useEffect } from 'react';
import { searchImg } from './services/pixabiApi';
import { Notify } from 'notiflix';
import { Vortex } from 'react-loader-spinner';

export function App() {
  const [searchValue, setSearchValue] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [entryData, setEntryData] = useState([]);
  const [error, setError] = useState(null);
  const [loadMoreBtnShown, setLoadMoreBtnShown] = useState(true);

  const handleDataAdd = searchValue => {
    setSearchValue(searchValue);
  };

  const handleLoadMoreBtnShown = () => {
    setPage(page => page + 1);
    setIsLoading(true);
  };

  useEffect(() => {
    if (searchValue === null) {
      return;
    }
    searchImg(searchValue, page)
      .then(data => {
        if (data.total === 0) {
          setIsLoading(false);
          return Notify.failure(`Nothing was found for ${searchValue}`);
        }
        if (data.total.length < 12) {
          setLoadMoreBtnShown(false);
        }
        setEntryData(data.hits);
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }, [searchValue, page]);

  return (
    <div>
      <Searchbar
        onSubmit={handleDataAdd}
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
        <Button text="Load More" onClick={handleLoadMoreBtnShown} />
      )}
    </div>
  );
}
