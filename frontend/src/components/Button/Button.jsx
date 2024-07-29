import propTypes from 'prop-types';

const Button = ({ text, onClick, className, type = 'button', disabled = false }) => {
  return (
    <button 
      onClick={onClick} 
      className={`${className}`}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: propTypes.string.isRequired,
  onClick: propTypes.func,
  className: propTypes.string,
  type: propTypes.oneOf(['button', 'submit', 'reset']),
  disabled: propTypes.bool,
}

export default Button;