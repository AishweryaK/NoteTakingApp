export interface Note {
    id: string;
    title: string;
    desc: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
  }

  export interface EditCollProps {
    visible: boolean;
    onClose: () => void;
    label:string;
  }
  