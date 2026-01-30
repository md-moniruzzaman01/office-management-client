/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Option {
  label?: string;
  value?: string;
}

export interface SearchSelectProps {
  options?: Option[];
  setOption?: any;
  required?: boolean;
  label?: string;
  defaultValue?: string | number;
}
