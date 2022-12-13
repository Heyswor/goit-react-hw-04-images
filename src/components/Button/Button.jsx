import css from '../Button/Button.module.css';

export const Button = ({ text, onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      className={css.Button}
    >
      {text}
    </button>
  );
};
