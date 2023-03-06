import { get, isEmpty } from 'src/lib/lodash';

export const onSubmit = (submit) => (e) => {
  e.preventDefault();
  submit();
};

// значение из input
export const getTargetValue = (f) => (e) => f(e.target.value);

// значение из checkbox
export const getTargetChecked = (f) => (e) => f(e.target.checked);

// значение из input / select / checkbox
export const getValue = (f) => (e) => f(get(e, 'target.value', get(e, 'target.checked', e)));

export const onChange = (fields, fieldName) => (val) => get(fields, `${fieldName}.onChange`, () => '')(val);

export const onBlur = (fields, fieldName) => () => get(fields, `${fieldName}.onBlur`, () => '')();

export const onChangeField = (field) => (val) => field.onChange(val);

export const onBlurField = (field) => () => field.onBlur();

export const getEventsForm = (fields, fieldName) => ({
  onBlur: onBlur(fields, fieldName),
  onChange: getValue(onChange(fields, fieldName)),
  value: get(fields, `${fieldName}.value`, ''),
});

export const getEventsField = (field) => ({
  onBlur: onBlurField(field),
  onChange: getValue(onChangeField(field)),
  value: get(field, 'value', ''),
});

export const getPropsField = ({
  fieldName, props: { fields, errorText, hasError }, mask,
}) => ({
  errorText: errorText(fieldName),
  hasError: hasError(fieldName),
  ...(isEmpty(mask)
    ? getEventsField(get(fields, fieldName))
    : null),
});

export const getRefField = ({ fieldName, callBack }) => (field) => {
  callBack({ fieldName, field });
  return field;
};

export const jumpFocusField = (props) => (e, maskPattern) => {
  const { fieldName, callBack } = props;
  const { name, data } = get(props, 'trigger', {});
  // определяем по какому тригеру срабатывать
  switch (name) {
    // при максимально допустимой величине / длине
    case 'maxLength':
      const countLetterMax = Number.parseInt(get(data, 'value', 0), 10);
      const value = get(e, 'target.value', '');
      const countLetterValue = value.length;
      if ((countLetterMax === countLetterValue || countLetterMax < countLetterValue)
        && maskPattern.test(value)) {
        callBack(fieldName);
      }
      break;
    default:
      callBack(fieldName);
  }
};
