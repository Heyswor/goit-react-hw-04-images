import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { ModalImg } from './ModalImg';
import PropTypes from 'prop-types';

import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

export function ImageGalleryItem({ image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleBackdropClick() {
    setIsModalOpen(false);
  }

  return (
    <li
      key={image.id}
      className={css.galleryItem}
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      <img src={image.webformatURL} alt={image.tags} />
      {isModalOpen && (
        <Modal onClose={handleBackdropClick}>
          <ModalImg imgLink={image.largeImageURL} imgAlt={image.tags} />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
