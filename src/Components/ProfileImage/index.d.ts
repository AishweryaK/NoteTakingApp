export interface ProfileImageProps {
  onImageChange: (imageUri: string) => void;
}

export interface ImageProps {
  imageUri?: string;
  photoURL?: string | null;
}
