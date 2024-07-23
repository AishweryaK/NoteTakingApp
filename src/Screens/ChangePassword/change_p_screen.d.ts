export interface PasswordProps {
    visible: boolean;
    onClose: () => void;
  }

  export interface FormValues {
    currentPassword:string,
    password: string;
    confirmPassword: string;
  }