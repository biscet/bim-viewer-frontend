import React from 'react';
import Select from 'react-select';
import {
  get, isEmpty,
} from 'src/lib/lodash';
import { getVariantSelect } from './SelectStyles';

const handlerChange = ({ onChange, jumpField }) => (e) => {
  onChange(e);
  jumpField();
};

// const handlerInputChange = (callback) => (val) => callback(val);

const getValue = (obj) => (isEmpty(obj) ? obj : get(obj, 'value', ''));

const getLabel = (obj) => (isEmpty(obj) ? obj : get(obj, 'label', getValue(obj)));

export const filterOption = (value) => (option, inputValue) => (
  (isEmpty(value) || value !== inputValue)
    ? (option.label.toString().toLowerCase().match(inputValue.toLowerCase()) || []).length > 0
    : option.label.toString().toLowerCase());

export const SelectCustom = React.forwardRef(({
  value, onChange, onBlur, // приходят из getPropsField - формы эффектора
  options, placeholder, name, label, jumpField, variant,
  required, errorText, hasError, disabled,
  propsControl, ...restProps
}, ref) => {
  // const [inputText, setInputText] = useState('');
  /* let validState = '';
  if (required && (hasError && (isEmpty(`${inputText}`.trim())))) {
    validState = 'invalid';
  } else if (value) {
    validState = 'valid';
  } */

  const hasFocused = name === get(document, 'activeElement.id', false);
  const { selectComponents, selectStyles, nameClassSelect } = getVariantSelect(variant, hasError);
  const { isSearchable } = restProps;

  const nameClassesInput = ['input-group__input'];
  const nameClassesLabel = ['input-group__label'];
  if (required && (hasError || (!isEmpty(`${value}`.trim()) && !hasFocused))) {
    nameClassesInput.push(hasError ? 'input-group__input--error' : '');
    // nameClassesLabel.push(hasError ? 'input-group__text-error' : '');
  }

  return (
    <>
      <label className={nameClassesLabel.join(' ')}>
        {label}
        {required && <span className="input-group__label--required"> *</span>}
      </label>
      <Select
        key={getValue(value)}
        // onInputChange={handlerInputChange(setInputText)}
        // classNamePrefix="react-select"
        className={nameClassSelect}
        defaultInputValue={isSearchable ? getLabel(value) : ''}
        defaultValue={!isSearchable ? value : null}
        value={value}
        {...restProps}
        filterOption={filterOption(getLabel(value))}
        placeholder={placeholder}
        options={options}
        onChange={handlerChange({ onChange, jumpField })}
        required={required}
        onBlur={onBlur}
        disabled={disabled}
        id={name}
        ref={ref}
        components={selectComponents}
        styles={selectStyles}
        propsControl={propsControl}
      />
      {hasError
      && !isEmpty(errorText)
      && <p className="input-group__text-error">{errorText}</p>}
    </>
  );
});

SelectCustom.defaultProps = {
  jumpField: () => '',
  variant: 'default',
  propsControl: null,
  isSearchable: false,
};
