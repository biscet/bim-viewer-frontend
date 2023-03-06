/* eslint-disable react/react-in-jsx-scope */
import 'src/ui/styles/Other/Form/Select.scss';

export const getVariantSelect = (variant, hasError) => {
  let selectComponents = Object;
  let selectStyles = Object;
  let nameClassSelect = String;

  switch (variant) {
    case 'modal':
      nameClassSelect = 'select--modal-variant';
      selectComponents = {
        IndicatorSeparator: () => null,
        MultiValue: (props) => {
          const {
            data: {
              label: chipLabel,
            },
            removeProps,
          } = props;

          return (
            <div className="select-chip-default">
              {chipLabel}
              <span className="select-chip-delete" {...removeProps}>
                <DeleteValue />
              </span>
            </div>
          );
        },
      };
      selectStyles = {
        option: (provided, state) => {
          const color = state.isSelected ? 'black' : '#d89216';
          return {
            ...provided,
            color,
            boxShadow: 'none',
            outline: 'none',
            border: 'none',
            background: state.isSelected ? '#d89216' : 'black',
            multiValueLabel: (styles) => ({
              ...styles,
              color: '#d89216',
            }),
            '&:hover': {
              background: '#d89216',
              color: 'black',
              cursor: 'pointer',
            },
          };
        },
        singleValue: (provided) => ({
          ...provided,
          color: '#cce5ff',
        }),
        control: (provided, { selectProps: { propsControl } }) => ({
          ...provided,
          border: hasError ? '1px solid #ad7512' : '1px solid #ad7512',
          borderRadius: 4,
          minHeight: 56,
          fontWeight: 400,
          fontSize: 20,
          background: 'black',
          color: '#d89216',
          paddingLeft: 5,
          cursor: 'pointer',
          boxShadow: '1px solid #ad7512',
          ...propsControl,
          '&:hover': {
            borderColor: '#d89216',
          },
        }),
      };
      break;
    case 'ads':
      nameClassSelect = 'select--default-variant';
      selectComponents = {
        IndicatorSeparator: () => null,
      };
      selectStyles = {
        option: (provided, state) => {
          const color = state.isSelected ? 'red' : 'blue';
          return { ...provided, color };
        },
        control: (provided, { selectProps: { propsControl } }) => ({
          ...provided,
          border: hasError ? '1px solid #ee5a5a' : '1px solid #eeeeee',
          borderRadius: 0,
          width: 200,
          height: 72,
          maxHeight: 72,
          cursor: 'pointer',
          ...propsControl,
          '&:hover': {
            borderColor: '#fff',
          },
        }),
      };
      break;
    default:
      break;
  }

  return { selectComponents, selectStyles, nameClassSelect };
};

// eslint-disable-next-line max-len
const DeleteValue = () => <svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-tj5bde-Svg"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" fill="#007bff" /></svg>;
