import PropTypes from 'prop-types';

const InputBox = ({ value, onChange, className, type = 'text', disabled = false, placeholder = '' }) => {
  return (
    <input 
      value={value}
      onChange={onChange}
      className={className}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
}

InputBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'file']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
}

export default InputBox;