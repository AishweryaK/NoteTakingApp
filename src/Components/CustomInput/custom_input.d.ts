// export interface CustomInputProps {
//   placeHolder: string;
//   value: string;
//   handleChange: () => void;
//   handleBlur: () => void;
// }

export interface CustomInputProps {
  placeHolder: string;
  value: string;
  handleChange: (text: string) => void;
  handleBlur: () => void;
}
