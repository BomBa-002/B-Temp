import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

type SmartInputProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  type?: 'text' | 'search';
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
};

export function SmartInput({ id, label, value, placeholder = ' ', disabled, maxLength, type = 'text', onChange, onSubmit, onClear }: SmartInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = value.length > 0;

  useEffect(() => {
    if (focused) inputRef.current?.focus();
  }, [focused]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.ctrlKey && event.key === 'Backspace') {
      event.preventDefault();
      onChange('');
      return;
    }
    if (event.ctrlKey && event.key === 'Enter' && onSubmit) {
      event.preventDefault();
      if (!event.nativeEvent.isComposing && event.keyCode !== 229) onSubmit();
    }
    if (event.key === 'Escape') inputRef.current?.blur();
  }

  return (
    <div className={`input-box${hasValue ? ' has-value' : ''}${focused ? ' is-focused' : ''}`}>
      <div className="input-wrapper">
        <span className="input-prefix" aria-hidden="true">{type === 'search' ? '⌕' : '＋'}</span>
        <input ref={inputRef} id={id} type={type} value={value} placeholder={placeholder} disabled={disabled} maxLength={maxLength} autoComplete="off" autoCorrect="off" spellCheck={false} aria-label={label} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={handleChange} onKeyDown={handleKeyDown} />
        <label htmlFor={id}>{label}</label>
        {hasValue && <button className="input-action" type="button" tabIndex={-1} aria-label={`Clear ${label}`} onMouseDown={(event) => event.preventDefault()} onClick={() => { onClear?.(); onChange(''); inputRef.current?.focus(); }}>×</button>}
      </div>
    </div>
  );
}
