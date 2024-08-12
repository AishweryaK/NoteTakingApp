export interface ProfileImageProps {
  onImageChange: (imageUri: string) => void;
}

export interface ImageProps {
  imageUri?: string;
  photoURL?: string | null;
}

interface ImageModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onImageChange: (uri: string) => void;
}
