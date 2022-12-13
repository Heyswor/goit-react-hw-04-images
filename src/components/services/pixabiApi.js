import PropTypes from 'prop-types';

const controller = new AbortController();
const signal = controller.signal;

export async function searchImg(searchValue, page) {
  return await fetch(
    `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=30513394-8e383ed067439270a89ebf2b5&image_type=photo&orientation=horizontal&per_page=12`,
    { signal }
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Can't find ${searchValue}`));
  });
}

searchImg.propTypes = {
  searchValue: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
