import {
  get, isEmpty, isObject,
} from 'src/lib/lodash';
import {
  isValidBirthDate, isValidDateCard,
  isValidСomparisonDate, isValidBeforeTodayDate,
} from './date';

// /^(\s*)?(\+)?([ ()+:=_-]?\d[ ()+:=_-]?){11,14}(\s*)?$/;
export const phonePattern = /^(\s*)?(\+)?([ ()+:=_-]?\d[ ()+:=_-]?){11,14}(\s*)?$/;
// export const yearPattern = /^(0?[1-9]|[12]\d|3[01]).(0?[1-9]|1[0-2]).((19|20)\d\d)$/;
export const dateYearPattern = /^(0?[1-9]|[12]\d|3[01]).(0?[1-9]|1[0-2]).(\d{4})$/;

export const emailPattern = /\S+@\S+\.\S+/;
export const letterPattern = /^[\s,.ЁА-яё-]+$/;
export const letterPatternRuEn = /^[\sA-Za-zЁА-яё-]+$/;
export const letterNumPattern = /^[\d/ЁА-яё]+$/;
export const letterAddressPattern = /^[\d\s,.а-яё-]+$/;
export const numHousePattern = /^[\d\s#./\\а-яё№-]+$/;
export const numberPattern = /^\d+$/;
// должность в компании
export const positionPattern = /^[\d\s(),.а-я’”-]+$/;

export const passportCodeDepartmentPattern = /^\d{3}-\d{3}$/;
export const passportIdPattern = /^\d{3}\s\d{3}$/;
export const passportSeriesPattern = /^(\d{2})(\s)(\d{2})$/;

// export const numberCardPattern = /^\d{4}\s\d{4}\s\d{4}\s\d{4}|\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{3}$/;
export const numberCardPattern = /^(?:\d{4}\s){3}\d{4}|(?:\d{4}\s){4}\d{3}$/;
export const dateCardPattern = /^(0?[1-9]|1[0-2])\/(\d{2})$/;
export const cvvPattern = /^\d{3}$/;
export const pricePattern = /^(?!0\.00)\d{1,3}(\d{3})*(\.\d\d)?$/;

export const innPattern = /^[\d+]{10,12}$/;

export const firstCarNumber = /^([авекмнорстух])\d{3}([авекмнорстух]){2}\d{2,3}$/gi;
export const secondCarNumber = /^([авекмнорстух]){2}\d{5,7}$/gi;
export const thirdCarNumber = /^\d{4}([авекмнорстух]){2}\d{2,3}$/gi;
export const fourCarNumber = /^([авекмнорстух])\d{3}([авекмнорстух]){2}$/gi;

const getVal = (val) => (isObject(val) ? get(val, 'value', get(val, 'target.value', '')) : val);

export const rules = {
  required: () => ({
    name: 'required',
    validator: (value) => ({
      isValid: !isEmpty(value),
      errorText: 'Данное поле обязательно для заполнения',
    }),
  }),
  requiredCheckbox: () => ({
    name: 'required',
    validator: (value) => ({
      isValid: !isEmpty(value),
      errorText: 'Данное поле обязательно',
    }),
  }),
  requiredAgreementCheckbox: () => ({
    name: 'required',
    validator: (value) => ({
      isValid: !isEmpty(value),
      errorText: 'Необходимо принять условия сервиса',
    }),
  }),
  carNumberChecker: () => ({
    name: 'carNumberChecker',
    validator: (value) => {
      let isValid = false;

      if (
        firstCarNumber.test(value)
        || secondCarNumber.test(value)
        || thirdCarNumber.test(value)
        || fourCarNumber.test(value)
      ) {
        isValid = true;
      }

      return ({
        isValid,
        errorText: 'Данное поле заполненно не по стандарту',
      });
    },
  }),
  email: () => ({
    name: 'email',
    validator: (value) => ({
      isValid: emailPattern.test(value),
      errorText: 'Указан некорректный email-адрес',
    }),
  }),
  phone: () => ({
    name: 'phone',
    validator: (value) => ({
      isValid: phonePattern.test(value),
      errorText: 'Телефонный номер введен в неверном формате',
    }),
  }),
  number: () => ({
    name: 'number',
    validator: (value) => ({
      isValid: numberPattern.test(value),
      errorText: 'Для ввода допустимы только цифры',
    }),
  }),
  numberCard: () => ({
    name: 'numberCard',
    validator: (value) => ({
      isValid: numberCardPattern.test(value)
        && (function validationCardNum(val) {
          const cardNum = val.replaceAll('_', '').replace(/\s+/g, ' ').trim();
          return cardNum.length === 19 || cardNum.length === 23;
        }(value)),
      errorText: 'Номер некорректен',
    }),
  }),
  dateCard: () => ({
    name: 'dateCard',
    validator: (value) => ({
      isValid: (dateCardPattern.test(value)
        && isValidDateCard(value)),
      errorText: 'Дата некорректна',
    }),
  }),
  cvvCard: () => ({
    name: 'cvvCard',
    validator: (value) => ({
      isValid: cvvPattern.test(value),
      errorText: 'Дата некорректна',
    }),
  }),
  dateBirth: () => ({
    name: 'dateBirth',
    validator: (value) => ({
      isValid: isValidBirthDate(value),
      errorText: 'Введенная дата рождения некорректна',
    }),
  }),
  dateYear: () => ({
    name: 'dateYear',
    validator: (value) => ({
      isValid: dateYearPattern.test(value),
      errorText: 'Дата введена в неверном формате',
    }),
  }),
  dateYearIsEmpty: () => ({
    name: 'dateYearIsEmpty',
    validator: (value) => (
      ((!isEmpty(value) && dateYearPattern.test(value)) || isEmpty(value))
    ),
    errorText: 'Дата введена в неверном формате',
  }),
  isValidBeforeTodayDateIsEmpty: (numDay) => ({
    name: 'isValidBeforeTodayDateIsEmpty',
    validator: (value) => (
      (!isEmpty(value)
          && dateYearPattern.test(value)
          && isValidBeforeTodayDate(value, numDay)
      )
      || isEmpty(value)
    ),
    errorText: 'Введенная дата меньше возможной',
  }),
  comparisonDateYearMax: ($minDate) => ({
    name: 'comparisonDateYearMax',
    source: $minDate,
    validator: (value, form, minDate) => (
      (!isEmpty(value)
          && dateYearPattern.test(value)
          && !isEmpty(minDate)
          && dateYearPattern.test(minDate)
          && isValidСomparisonDate(minDate, value)
      )
      || isEmpty(minDate)
    ),
    errorText: 'Данная дата не должна быть раньше даты начала',
  }),

  letter: () => ({
    name: 'letter',
    validator: (value) => ({
      isValid: letterPattern.test(value),
      errorText: 'Введенное значение некорректно',
    }),
  }),
  letterRuEn: () => ({
    name: 'letterRuEn',
    validator: (value) => ({
      isValid: letterPatternRuEn.test(value),
      errorText: 'Введенное значение некорректно',
    }),
  }),
  position: () => ({
    name: 'position',
    validator: (value) => ({
      isValid: positionPattern.test(value),
      errorText: 'Введенное значение некорректно',
    }),
  }),
  letterNum: () => ({
    name: 'apartment',
    validator: (value) => ({
      isValid: letterNumPattern.test(value),
      errorText: 'Введенное значение некорректно',
    }),
  }),
  letterAddress: () => ({
    name: 'letterAddress',
    validator: (value) => ({
      isValid: letterAddressPattern.test(value),
      errorText: 'Введенное значение некорректно',
    }),
  }),
  passportId: () => ({
    name: 'passportId',
    validator: (value) => ({
      isValid: passportIdPattern.test(value),
      errorText: 'Введенное значение некорректно',
    }),
  }),
  passportSeries: () => ({
    name: 'passportSeries',
    validator: (value) => ({
      isValid: passportSeriesPattern.test(value),
      errorText: 'Введенное значение некорректно',
    }),
  }),
  passportCodeDepartment: () => ({
    name: 'passportCodeDepartment',
    validator: (value) => ({
      isValid: passportCodeDepartmentPattern.test(value),
      errorText: 'Введенное значение некорректно',
    }),
  }),
  confirm: () => ({
    name: 'confirm',
    validator: (confirmation, { password }) => ({
      isValid: confirmation === password,
      errorText: 'Пароли не совпадают',
    }),
  }),
  confirmPassChange: () => ({
    name: 'confirmPassChange',
    validator: (confirmation, { password1 }) => ({
      isValid: confirmation === password1,
      errorText: 'Пароли не совпадают',
    }),
  }),
  confirmEmailChange: () => ({
    name: 'confirm',
    validator: (confirmation, { email }) => ({
      isValid: confirmation === email,
      errorText: 'Email-ы не совпадают',
    }),
  }),
  minLength: (min) => ({
    name: 'minLength',
    validator: (value) => ({
      isValid: value.length >= min,
      // errorText: `Минимальная длина ${min} символ(а/ов)`,
      errorText: 'Превышена минимальная длина',
    }),
  }),
  maxLength: (max) => ({
    name: 'maxLength',
    validator: (value) => ({
      isValid: value.length <= max,
      // errorText: `Максимальная длина ${max} символ(а/ов)`,
      errorText: 'Превышена максимальная длина',
    }),
  }),
  keyboardLayoutOther: () => ({
    name: 'keyboardLayoutOther',
    validator: (value) => ({
      isValid: !(/[a-z]/gi.test(value)),
      errorText: 'Пожалуйста, смените раскладку клавиатуры',
    }),
  }),
  positionIsEmptySource: ($isStore) => ({
    name: 'positionIsEmptySource',
    source: $isStore,
    validator: (value, form, isStore) => (
      positionPattern.test(value) || isStore
    ),
    errorText: 'Введенное значение некорректно',
  }),
  phoneIsEmptySource: ($isStore) => ({
    name: 'phoneIsEmptySource',
    source: $isStore,
    validator: (value, form, isStore) => (
      phonePattern.test(value) || isStore
    ),
    errorText: 'Телефонный номер введен в неверном формате',
  }),
  phoneIsEmpty: () => ({
    name: 'phoneIsEmpty',
    validator: (value) => {
      const val = `${value}`.replace(/\D+/g, '');
      return ((!isEmpty(val) && phonePattern.test(value)) || isEmpty(val));
    },
    errorText: 'Телефонный номер введен в неверном формате',
  }),
  numberIsEmpty: () => ({
    name: 'numberIsEmpty',
    validator: (value) => ({
      isValid: ((!isEmpty(value) && numberPattern.test(value)) || isEmpty(value)),
      errorText: 'Для ввода допустимы только цифры',
    }),
  }),
  requiredIsObjSource: ($obj, checkVal) => ({
    name: 'requiredIsObjSource',
    source: $obj,
    validator: (value, form, obj) => (
      (!isEmpty(getVal(value)) && obj.value === checkVal)
          || (isEmpty(getVal(value)) && obj.value !== checkVal)
    ),
    errorText: 'Данное поле обязательно для заполнения',
  }),
  requiredIsNotObjSource: ($obj, checkVal) => ({
    name: 'requiredIsNotObjSource',
    source: $obj,
    validator: (value, form, obj) => (
      (!isEmpty(getVal(value)) && obj.value !== checkVal)
          || (isEmpty(getVal(value)) && obj.value === checkVal)
    ),
    errorText: 'Данное поле обязательно для заполнения',
  }),
  requiredIsValueSource: ($val, checkVal) => ({
    name: 'requiredIsEmptySource',
    source: $val,
    validator: (value, form, val) => (
      (!isEmpty(getVal(value)) && val === checkVal)
          || (isEmpty(getVal(value)) && val !== checkVal)
    ),
    errorText: 'Данное поле обязательно для заполнения',
  }),
  max: (max) => ({
    name: 'max',
    validator: (value) => ({
      isValid: value <= max,
      // errorText: `Максимальное значение ${max}`,
      errorText: 'Превышено максимальное значение',
    }),
  }),
};
