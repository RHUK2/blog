---
updatedAt: 2024-04-29
directory: react
fileName: component
title: component
description:
---

# Component

- [한 개의 input 요소로 output을 만드는 제어 컴포넌트](#한-개의-input-요소로-output을-만드는-제어-컴포넌트)
- [여러 개의 input 요소로 output을 만드는 제어 컴포넌트](#여러-개의-input-요소로-output을-만드는-제어-컴포넌트)
- [Wrapper로 감싸지면 그룹핑되는 컴포넌트](#wrapper로-감싸지면-그룹핑되는-컴포넌트)
- [empty1](#empty1)
- [empty2](#empty2)
- [값 수정 시](#값-수정-시)
- [다중 요소 참조](#다중-요소-참조)

## 한 개의 input 요소로 output을 만드는 제어 컴포넌트

```js
const Switch = forwardRef(({ checked = false, onChange = () => {}, ...inputProps }, ref) => {
  const [isOn, setIsOn] = useState(checked);
  const [isClickable, setIsClickable] = useState(true);

  const inputRef = useRef(null);

  useImperativeHandle(ref, () => inputRef.current);

  function handleSwitch(e) {
    setIsOn(checked);
    onChange(e);
  }

  useEffect(() => {
    if (isOn !== checked) setIsOn(checked);
  }, [checked, isOn]);

  return (
    <div
      css={{
        transition: isClickable === false ? 'background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0px 5px',
        width: 50,
        height: 25,
        borderRadius: 20,
        backgroundColor: isOn ? $color.primary : $color.grey[5],
        cursor: 'pointer',
        boxShadow: 'inset 2px 2px 2px rgba(0, 0, 0, 0.16)',
      }}
      onClick={() => {
        if (isClickable) {
          inputRef.current.click();
          setIsClickable(false);
          return;
        }
      }}
      onTransitionEnd={() => setIsClickable(true)}>
      <div
        css={{
          transition: isClickable === false ? 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
          width: 15,
          height: 15,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.16)',
          transform: isOn ? 'translateX(25px)' : 'translateX(0px)',
        }}></div>
      <input
        ref={inputRef}
        type='checkbox'
        checked={isOn}
        css={{ display: 'none' }}
        onChange={handleSwitch}
        {...inputProps}
      />
    </div>
  );
});
```

## 여러 개의 input 요소로 output을 만드는 제어 컴포넌트

```js
// ? @param output 'string' or [{ object }, 'object key string']

function TextListInput({ output = 'string', disabled = false, value = [], onChange = () => {}, ...inputProps }) {
  const intl = useIntl();

  const [text, setText] = useState('');

  const [textList, setTextList] = useState(value);

  function handleClick(e) {
    const targetValue = e.target.dataset.value;

    const copyTextList = [...textList];

    if (output === 'string') {
      const value = targetValue;
      const index = copyTextList.findIndex((text) => text === value);

      copyTextList.splice(index, index !== -1 ? 1 : 0);
    } else if (Array.isArray(output) && output.length === 2) {
      const value = {
        ...output[0],
        [output[1]]: targetValue,
      };
      const index = copyTextList.findIndex((object) => object[output[1]] === value[output[1]]);

      copyTextList.splice(index, index !== -1 ? 1 : 0);
    }

    setTextList(copyTextList);
    onChange(copyTextList);
  }

  function handleKeyUp(e) {
    const targetValue = e.target.value.replace(/\s/g, '');

    if (targetValue.length === 0) return;

    if (e.key === 'Enter' || e.key === ' ') {
      const copyTextList = [...textList];
      let updatedValue = [];

      if (output === 'string') {
        const value = targetValue;

        updatedValue = copyTextList.includes(value) ? copyTextList : copyTextList.concat(targetValue);
      } else if (Array.isArray(output) && output.length === 2) {
        const value = {
          ...output[0],
          [output[1]]: targetValue,
        };

        updatedValue = copyTextList.find((object) => object[output[1]] === value[output[1]])
          ? copyTextList
          : copyTextList.concat(value);
      }

      setText('');
      setTextList(updatedValue);
      onChange(updatedValue);
    }
  }

  useEffect(() => {
    setTextList(value);
  }, [value]);

  return (
    <div
      css={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        padding: 8,
        backgroundColor: disabled ? $color.disabled : $color.white,
        color: disabled ? $color.disabledText : 'canvastext',
        border: `1px solid ${$color.divider}`,
        borderRadius: 4,
        minHeight: 40,
        '&:hover': {
          boxShadow: disabled ? 'none' : $boxShadow.shallow,
        },
        '&:focus-within': {
          outline: `${$color.black} solid 1px`,
          boxShadow: $boxShadow.shallow,
        },
      }}>
      {textList.map((text, index) => (
        <span
          key={`${text}${index}`}
          css={{
            borderRadius: 8,
            padding: '0 8px',
            backgroundColor: disabled ? $color.grey[2] : $color.grey[1],
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          data-value={output === 'string' ? text : text[output[1]]}
          onClick={disabled ? () => {} : (e) => handleClick(e, index)}>
          {output === 'string' ? text : text[output[1]]}
        </span>
      ))}
      <input
        css={{
          backgroundColor: 'transparent',
          border: 'none',
          padding: 0,
          flex: '1 0 0',
          minWidth: 40,
          '&:focus': {
            outline: 'none',
          },
        }}
        type='text'
        inputMode='search'
        disabled={disabled}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={intl.formatMessage({
          id: 'placeholder.input',
          defaultMessage: '입력',
        })}
        onKeyUp={handleKeyUp}
        {...inputProps}
      />
    </div>
  );
}
```

## Wrapper로 감싸지면 그룹핑되는 컴포넌트

```js
// CheckboxGroup.js
const CheckBoxGroupContext = createContext();

const CheckBoxGroup = ({ value = [], onChange = () => {}, children, ...inputProps }) => {
  const [group, setGroup] = useState(value);

  return (
    <>
      <CheckBoxGroupContext.Provider value={[group, setGroup, onChange]}>{children}</CheckBoxGroupContext.Provider>
    </>
  );
};

// Checkbox.js
const CheckBox = forwardRef(({ checked = false, value = '', onChange = () => {}, ...inputProps }, ref) => {
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

## empty1

```js
interface RefereeListItemSelectGroup {
  value?: RefereeRelationship[];
  onChange?: (selectGroup: RefereeRelationship[]) => void;
  children?: React.ReactNode;
}

interface ContextType {
  selectGroup?: RefereeRelationship[];
  setSelectGroup?: Dispatch<SetStateAction<RefereeRelationship[]>>;
  onChange?: (selectGroup: RefereeRelationship[]) => void;
}

export const RefereeListItemSelectGroupContext = createContext < ContextType > {};

export function RefereeListItemSelectGroup({ value = [], onChange = () => {}, children }: RefereeListItemSelectGroup) {
  /*********/
  /* Hooks */
  /*********/

  /***********/
  /* useForm */
  /***********/

  /****************************/
  /* state & ref & definition */
  /****************************/

  const [selectGroup, setSelectGroup] = useState(value ?? []);

  /************/
  /* useQuery */
  /************/

  /***************/
  /* useMutation */
  /***************/

  /*********************/
  /* API Call Function */
  /*********************/

  /***********/
  /* handler */
  /***********/

  /*******/
  /* etc */
  /*******/

  /***********/
  /* useMemo */
  /***********/

  /*************/
  /* useEffect */
  /*************/

  useEffect(() => {
    setSelectGroup(value);
  }, [selectGroup, value]);

  /**********/
  /* return */
  /**********/

  return (
    <>
      <RefereeListItemSelectGroupContext.Provider
        value={{
          selectGroup,
          setSelectGroup,
          onChange,
        }}
      >
        {children}
      </RefereeListItemSelectGroupContext.Provider>
    </>
  );
}

interface Props {
  data?: RefereeDetail;
  onChange?: (value: string) => void;
}

export function RefereeListItemSelect({ data, onChange = () => {}, ...listItemProps }: Props & ListItemProps) {
  /*********/
  /* Hooks */
  /*********/

  const { t } = useTranslation('common');

  const theme = useTheme();

  /***********/
  /* useForm */
  /***********/

  /****************************/
  /* state & ref & definition */
  /****************************/

  const { id, name, relationship, relationshipIdentifier, email, phone, profile, updatedAt, status, isSelected } =
    data || {};

  const setAlert = useSetRecoilState(alertState);

  const { selectGroup, setSelectGroup, onChange: onGroupChange } = useContext(RefereeListItemSelectGroupContext);

  const [select, setSelect] = useState(data?.relationship?.key ?? '');

  /************/
  /* useQuery */
  /************/

  const { status: relationshipSelectStatus, data: relationshipSelectData } = useSelectQuery(
    SELECT_REQUEST.RELATIONSHIP,
  );

  /***************/
  /* useMutation */
  /***************/

  /*********************/
  /* API Call Function */
  /*********************/

  /***********/
  /* handler */
  /***********/

  function handleSelect(e: SelectChangeEvent<unknown>) {
    if (id == null || typeof e.target.value !== 'string') {
      setAlert((prev) => ({
        ...prev,
        open: true,
        type: 'error',
        message: '오류가 발생했습니다.',
      }));
      return;
    }

    setSelect(e.target.value);
    onChange(e.target.value);

    if (selectGroup && setSelectGroup && onGroupChange) {
      const copySelectGroup = [...selectGroup];

      const index = copySelectGroup.findIndex((select) => select.id === id);

      if (index !== -1) copySelectGroup.splice(index, 1);

      copySelectGroup.push({ id: id, relationship: e.target.value });

      setSelectGroup(copySelectGroup);
      onGroupChange(copySelectGroup);
    }
  }

  /*******/
  /* etc */
  /*******/

  /***********/
  /* useMemo */
  /***********/

  /*************/
  /* useEffect */
  /*************/

  useEffect(() => {
    if (selectGroup) {
      const select = selectGroup.find((select) => select.id === (id ?? 0));

      if (select) setSelect(select.relationship);
    }
  }, [id, selectGroup]);

  /**********/
  /* return */
  /**********/

  return (
    <ListItem divider sx={{ gap: 2, backgroundColor: isSelected ? 'grey.A100' : 'inherit' }} {...listItemProps}>
      <Avatar
        sx={{ width: 30, height: 30, border: `1px solid ${theme.palette.grey[300]}` }}
        alt='profile'
        src={profile != null ? `data:image;base64,${profile}` : '/images/DEFAULT.png'}
      />

      <Box sx={{ flex: '1 0 0', display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ flex: '30 0 200px', display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <ListItemText
            sx={{ flex: '1 0 150px' }}
            primary={name ?? '-'}
            secondary={`${relationship ? relationship?.value : relationshipIdentifier?.value ?? '-'} • ${
              dayjs(updatedAt).isValid() ? dayjs(updatedAt).fromNow() : '-'
            }`}
          />

          <Box
            sx={{
              flex: '3 0 200px',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>{email ?? '-'}</Typography>
              <CopyIcon text={email} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>{`• ${phone == null ? '-' : computedPhone(phone)}`}</Typography>
              <CopyIcon text={computedPhone(phone)} />
            </Box>
          </Box>
        </Box>

        {(() => {
          switch (relationshipSelectStatus) {
            case 'loading':
              return <Skeleton variant='rounded' sx={{ flex: '1 0 120px' }} height={30} />;
            case 'success':
              return (
                <Select
                  sx={{ flex: '1 0 120px' }}
                  displayEmpty
                  color='secondary'
                  value={select}
                  onChange={handleSelect}
                >
                  <MenuItem value=''>선택하지 않음</MenuItem>
                  {relationshipSelectData?.relationship?.map((relationship: Option) => (
                    <MenuItem key={relationship.key} value={relationship.key}>
                      {relationship.value}
                    </MenuItem>
                  ))}
                </Select>
              );
            case 'error':
            default:
              return <Skeleton variant='rounded' animation={false} sx={{ flex: '1 0 120px' }} height={30} />;
          }
        })()}
      </Box>
    </ListItem>
  );
}
```

## empty2

```js
interface AddEmployerInputProps {
  value?: Employer[];
  onChange?: (value: Employer[]) => void;
  mode?: 'add' | 'edit';
}

interface AddEmployerInputForm {
  employerIdentifier: string;
  employers: Employer[];
}

export function AddEmployerInput({ mode = 'add', value = [], onChange = () => {} }: AddEmployerInputProps) {
  /*********/
  /* Hooks */
  /*********/

  const theme = useTheme();

  /***********/
  /* useForm */
  /***********/

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm <
  AddEmployerInputForm >
  {
    mode: 'onChange',
    defaultValues: {
      employerIdentifier: '',
      employers: [],
    },
  };

  const employers = watch('employers');

  /****************************/
  /* state & ref & definition */
  /****************************/

  const setAlert = useSetRecoilState(alertState);

  /************/
  /* useQuery */
  /************/

  const apiCheckEmployer = useCheckEmployerMutation();

  const { status: employerMeStatus, data: employerMeData } = useEmployerMeQuery();

  /***************/
  /* useMutation */
  /***************/

  /*********************/
  /* API Call Function */
  /*********************/

  function onCheckEmployer(data: AddEmployerInputForm) {
    apiCheckEmployer.mutate(
      { email: data.employerIdentifier },
      {
        onSuccess(response) {
          const {
            data: { id, email, name, profile },
          } = response;

          if (id == null || name == null) {
            setAlert((prev) => ({
              ...prev,
              open: true,
              type: 'error',
              message: '오류가 발생했습니다.',
            }));
            return;
          }

          const copyEmployers = [...data.employers];

          const index = copyEmployers.findIndex((copyEmployer) => copyEmployer.id === id);

          if (index !== -1) copyEmployers.splice(index, 1);

          copyEmployers.push({
            id: id,
            email: email,
            name: name,
            profile: profile,
          });

          setValue('employers', copyEmployers);
          onChange(copyEmployers);
        },
        onError(error) {
          if (!axios.isAxiosError(error)) return; // axios의 에러 처리를 위한 typeguard

          setAlert((prev) => ({
            ...prev,
            open: true,
            type: 'error',
            message: error?.response?.data.message ?? '오류가 발생했습니다.',
          }));
        },
      },
    );
  }

  /***********/
  /* handler */
  /***********/

  function deleteEmployers(id: number | null) {
    if (id == null) {
      setAlert((prev) => ({
        ...prev,
        open: true,
        type: 'error',
        message: '오류가 발생했습니다.',
      }));
      return;
    }

    const employers = getValues('employers');

    const copyEmployers = [...employers];

    const index = copyEmployers.findIndex((copyEmployer) => copyEmployer.id === id);

    if (index !== -1) copyEmployers.splice(index, 1);

    setValue('employers', copyEmployers);
    onChange(copyEmployers);
  }

  /*******/
  /* etc */
  /*******/

  /***********/
  /* useMemo */
  /***********/

  /*************/
  /* useEffect */
  /*************/

  useEffect(() => {
    setValue('employers', value);
  }, [setValue, value]);

  /**********/
  /* return */
  /**********/

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
      }}
    >
      <Box sx={{ flex: '1 0 250px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <InputBase
          placeholder='이메일'
          {...register('employerIdentifier', {
            required: true,
            pattern: {
              value: reg_exp.email,
              message: '유효하지 않은 입력입니다.',
            },
          })}
        />
        <Button variant='outlined' color='secondary' onClick={debounce(handleSubmit(onCheckEmployer))}>
          관리자 추가
        </Button>
        {errors.employerIdentifier?.message && (
          <Typography color='error' variant='body2'>
            {errors.employerIdentifier.message}
          </Typography>
        )}
      </Box>
      <Box sx={{ flex: '1 0 250px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {mode === 'add' && (
          <ListItem sx={{ gap: 1, backgroundColor: 'grey.100', borderRadius: 1 }}>
            <Avatar
              sx={{ width: 30, height: 30, border: `1px solid ${theme.palette.grey[300]}` }}
              alt='profile'
              src={
                employerMeData?.profile != null ? `data:image;base64,${employerMeData?.profile}` : '/images/DEFAULT.png'
              }
            />
            <ListItemText sx={{ flex: '0 1 max-content' }} primary={employerMeData?.name ?? '-'} />
            <ListItemText sx={{ color: 'primary.main' }} primary={'내 계정'} />
          </ListItem>
        )}
        {employers.map((employer) => (
          <Fragment key={employer.id}>
            <ListItem
              sx={{ gap: 1, backgroundColor: 'grey.100', borderRadius: 1 }}
              secondaryAction={
                <IconButton edge='end' onClick={debounce(() => deleteEmployers(employer.id))}>
                  <CloseIcon />
                </IconButton>
              }
            >
              <Avatar
                sx={{ width: 30, height: 30, border: `1px solid ${theme.palette.grey[300]}` }}
                alt='profile'
                src={employer.profile != null ? `data:image;base64,${employer.profile}` : '/images/DEFAULT.png'}
              />
              <ListItemText sx={{ flex: '0 1 max-content' }} primary={employer.name} />
              {employer.email === employerMeData?.email && (
                <ListItemText sx={{ color: 'primary.main' }} primary={'내 계정'} />
              )}
            </ListItem>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}
```

## 값 수정 시

사용자 입력했던 DB 값을 보여주는 디스플레이와 입력이 동시에 되는 인풋

DB 값을 보여주는 디스플레이와 입력이 분리되는 인풋

## 다중 요소 참조

```js
<Popper
  open={menuPopper}
  onClose={() => setMenuPopper(false)}
  ref={menuPopperRef.current[activeMenuPopper.index]} // <<<<-----
>
  <div css={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <Link to={`/admin/job/${activeMenuPopper.id}`}>
      <Button fullWidth>
        {intl.formatMessage({ id: 'text.detail.job.post', defaultMessage: '채용공고 상세보기' })}
      </Button>
    </Link>
    <Link to={`/admin/job/${activeMenuPopper.id}/recruiter`}>
      <Button fullWidth>{intl.formatMessage({ id: 'text.recruiter.manage', defaultMessage: '리크루터 관리' })}</Button>
    </Link>
    <Link to={`/admin/job/${activeMenuPopper.id}/candidate`}>
      <Button fullWidth>{intl.formatMessage({ id: 'text.candidate.manage', defaultMessage: '후보자 관리' })}</Button>
    </Link>
    <Link to={`/admin/job/${activeMenuPopper.id}/qna`}>
      <Button fullWidth>{intl.formatMessage({ id: 'text.qna.manage', defaultMessage: 'Q&A 관리' })}</Button>
    </Link>
  </div>
</Popper>
```
