export interface CollectionProps {
  text: string;
  number: number;
}

export interface CustomDialogInputProps {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  handleInput: Dispatch<SetStateAction<string>>;
  input: string;
}
