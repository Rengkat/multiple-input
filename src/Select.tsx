import { useEffect, useState } from "react";
import styles from "./select.module.css";
type SingleSelect = {
  multiple?: false;
  onchange: (value: SelectOptions | undefined) => void;
  value?: SelectOptions;
};
type MultipleSelectProps = {
  multiple: true;
  value?: SelectOptions[];
  onchange: (value: SelectOptions[]) => void;
};
export type SelectOptions = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOptions;
} & (MultipleSelectProps | SingleSelect);
const Select = ({ multiple, value, onchange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlitedInex, setHighlitedIndex] = useState(0);
  const clearOption = () => {
    multiple ? onchange([]) : onchange(undefined);
  };
  const selectedOption = (option: SelectOptions) => {
    if (multiple) {
      if (value?.includes(option)) {
        onchange(value.filter((o) => o !== option));
      } else {
        onchange([...value, option]);
      }
    } else {
      if (option !== value) onchange(option);
    }
  };
  const isSelected = (option: SelectOptions) => {
    return option === value;
  };
  useEffect(() => {
    if (isOpen) setHighlitedIndex(0);
  }, [isOpen]);
  return (
    <>
      <div
        onBlur={() => setIsOpen(false)}
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.container}>
        <span className={styles.value}>
          {multiple
            ? value?.map((v) => {
                return (
                  <button
                    className={styles["option-badge"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectedOption(v);
                    }}
                    key={v.value}>
                    {v.label}
                    <span className={styles["remove-btn"]}></span>
                  </button>
                );
              })
            : value?.label}
        </span>
        <button
          onClick={(e) => {
            clearOption();
            e.stopPropagation();
          }}
          className={styles["close-btn"]}>
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, index) => {
            return (
              <li
                onMouseEnter={() => {
                  setHighlitedIndex(index);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  selectedOption(option);
                }}
                className={`${styles.option} ${
                  isSelected(option) ? styles.selected : ""
                } ${highlitedInex === index ? styles.selected : ""}`}
                key={option.value}>
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Select;
