import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { get, isEmpty, isObject } from 'src/lib/lodash';

import 'src/ui/styles/Other/Form/Input.scss';

const handlerChange = ({ onChange, jumpField, maskPattern }) => (e) => {
  onChange(e);
  jumpField(e, maskPattern);
};

export const Input = React.forwardRef(
  (
    {
      value,
      onChange,
      onBlur, // приходят из getPropsField - формы эффектора
      placeholder,
      name,
      label,
      type,
      tabIndex,
      typeInput,
      mask,
      maskPlaceholder,
      maskPattern,
      jumpField,
      required,
      errorText,
      hasError,
      disabled,
      showPassword,
      isTextError,
      ...restProps
    },
    ref,
  ) => {
    const [showPass, setShowPass] = useState(false);
    const hasFocused = name === get(document, 'activeElement.id', false);

    const nameClassesInput = ['input-group__input'];
    const nameClassesLabel = ['input-group__label'];
    if (required && (hasError || (!isEmpty(`${value}`.trim()) && !hasFocused))) {
      nameClassesInput.push(hasError ? 'input-group__input--error' : '');
      // nameClassesLabel.push(hasError ? 'input-group__input--error' : '');
    }

    nameClassesInput.push(showPassword ? 'input-group__input--show-pass' : '');

    // с значение должна попадать только строка
    const val = (isEmpty(value)
    // разобраться с этим трешем - откуда тут вообще объект может быть!!
    || isObject(value) ? get(value, 'target.value', '') : value);

    return (
      <>
        {!isEmpty(label) && (
        <label className={nameClassesLabel.join(' ')}>
          {label}
          {required && <span className="input-group__label--required"> *</span>}
        </label>
        )}
        {!isEmpty(mask)
          ? (
            <InputMask
              {...restProps}
              {...(!isEmpty(mask) ? { mask } : {})}
              {...(!isEmpty(maskPlaceholder) ? { maskPlaceholder } : {})}
              className={nameClassesInput.join(' ')}
              tabIndex={tabIndex}
              type={type}
              placeholder={placeholder}
              required={required}
              value={val}
              onChange={handlerChange({ onChange, jumpField, maskPattern })}
              onBlur={onBlur}
              disabled={disabled}
              id={name}
              ref={ref}
            />
          ) : (
            <div className="pos-relative">
              <input
                {...restProps}
                className={nameClassesInput.join(' ')}
                tabIndex={tabIndex}
                type={showPass ? 'text' : type}
                placeholder={placeholder}
                required={required}
                value={val}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                id={name}
                ref={ref}
              />
              {showPassword ? (
                <ShowPassSVG
                  show={showPass}
                  onClick={() => setShowPass(!showPass)}
                />
              ) : null}
            </div>
          )}

        {isTextError && hasError && !isEmpty(errorText) && (
        <p className="input-group__text-error">{errorText}</p>
        )}
      </>
    );
  },
);

Input.defaultProps = {
  tabIndex: 0,
  showPassword: false,
  type: 'text',
  name: '',
  label: '',
  typeInput: '',
  placeholder: ' ',
  value: '',
  hasError: false,
  errorText: '',
  onChange: () => '',
  onBlur: () => '',
  jumpField: () => '',
  required: false,
  disabled: false,
  isTextError: true,
  mask: '',
  maskPlaceholder: '',
  maskPattern: '',
};

const ShowPassSVG = ({ onClick, show }) => (
  <div onClick={onClick} className="password-view">
    {show ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          // eslint-disable-next-line max-len
          d="M21.2565 10.962C21.7305 11.582 21.7305 12.419 21.2565 13.038C19.7635 14.987 16.1815 19 11.9995 19C7.81752 19 4.23552 14.987 2.74252 13.038C2.51191 12.7411 2.38672 12.3759 2.38672 12C2.38672 11.6241 2.51191 11.2589 2.74252 10.962C4.23552 9.013 7.81752 5 11.9995 5C16.1815 5 19.7635 9.013 21.2565 10.962V10.962Z"
          stroke="#818181"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          // eslint-disable-next-line max-len
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          stroke="#818181"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 10C2 10 5.5 14 12 14C18.5 14 22 10 22 10"
          stroke="#818181"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </div>
);
