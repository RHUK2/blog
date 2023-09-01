# Checkbox

```js
// CheckboxGroup.js
import { createContext, useState } from 'react';

export const CheckBoxGroupContext = createContext();

export const CheckBoxGroup = ({ value = [], onChange = () => {}, children, ...inputProps }) => {
  const [group, setGroup] = useState(value);

  return (
    <>
      <CheckBoxGroupContext.Provider value={[group, setGroup, onChange]}>{children}</CheckBoxGroupContext.Provider>
    </>
  );
};

// Checkbox.js
/** @jsxImportSource @emotion/react */
import { $color } from 'emotion';
import { forwardRef, useContext, useState } from 'react';
import { CheckBoxGroupContext } from './CheckBoxGroup';

export const CheckBox = forwardRef(({ checked = false, value = '', onChange = () => {}, ...inputProps }, ref) => {
  const [group, setGroup, onGroupChange] = useContext(CheckBoxGroupContext) ?? [null, null];

  const [_checked, setChecked] = useState(checked);

  function handleChecked(e) {
    const value = e.target.value;

    if (group !== null) {
      const copyGroup = [...group];

      if (!group.includes(value)) {
        const result = copyGroup.includes(value) ? copyGroup : copyGroup.concat(value);
        setGroup(result);
        onGroupChange({
          ...e,
          target: {
            value: result,
          },
        });
      } else {
        const result = copyGroup.filter((item) => item !== value);
        setGroup(result);
        onGroupChange({
          ...e,
          target: {
            value: result,
          },
        });
      }
    }

    setChecked(e.target.checked);
    onChange(e);
  }

  return (
    <input
      ref={ref}
      css={{
        appearance: 'none',
        cursor: 'pointer',
        minWidth: 16,
        maxWidth: 16,
        height: 16,
        padding: 0,
        outline: `1px solid ${$color.grey[6]}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:checked': {
          outline: 'none',
          backgroundColor: $color.primary,
        },
        '&:checked:after': {
          content: '"✓"',
          color: $color.white,
        },
        '&:hover': {
          outline: `3px solid rgba(0, 0, 0, 0.2)`,
        },
        '&:disabled': {
          outline: 'none',
          opacity: 0.5,
        },
      }}
      type='checkbox'
      value={value.toString()}
      checked={group !== null ? group.includes(value.toString()) : _checked}
      onChange={handleChecked}
      {...inputProps}
    />
  );
});
```
