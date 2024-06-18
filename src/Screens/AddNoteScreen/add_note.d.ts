export interface CollectionProps {
  text: string;
  number: number;
}

export interface CustomDialogInputProps {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: (value: string) => void;
}
