import React from 'react';
import { isEmpty, has, get } from 'src/lib/lodash';

import 'src/ui/styles/Other/Form/Button.scss';

export const Button = React.memo(({ children, ...rest }) => {
  const nameClasses = ['button-shape'];

  const isVariant = get(rest, 'variant', 'default');
  if (isVariant) {
    nameClasses.push(`${isVariant}-button`);
  }

  if (!isEmpty(rest) && has(rest, 'className')) {
    nameClasses.push(get(rest, 'className', ''));
  }

  const isDisabled = get(rest, 'disabled', false);
  if (isDisabled) {
    nameClasses.push('disabled-button');
  }

  const isSubmit = get(rest, 'type', 'button') === 'submit';
  const props = { ...rest, className: nameClasses.join(' ') };

  return (
    <button {...props} type={isSubmit ? 'submit' : 'button'}>
      {children}
    </button>
  );
});
