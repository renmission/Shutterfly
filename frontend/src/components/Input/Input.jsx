import PropTypes from 'prop-types';

const InputBox = ({ name, value, onChange, className, type = 'text', disabled = false, placeholder = '' }) => {
  return (
    <input
      name={name}
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
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'file']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
}

export default InputBox;