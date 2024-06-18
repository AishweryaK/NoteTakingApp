import {useState} from 'react';
import {useReduxDispatch, useReduxSelector} from '../../Redux/Store/store';
import auth from '@react-native-firebase/auth';
import {saveName, saveUser} from '../../Redux/Slices/userSlice';
import {ERR_CONSOLE, ERR_MSG, ERR_TITLE} from '../../Constants/strings';
import useAuthentication from './CustomHook';
import { showAlert } from '../../Common/alert';
import { NameChangeFormValues } from '../../Screens/Account';
import { FormikHelpers } from 'formik';

export default function useFirebaseUtils() {
  const dispatch = useReduxDispatch();
  const {uploadImageToFirebase, deletePhoto} = useAuthentication();
  const {displayName, uid, email, theme, provider} = useReduxSelector(
    state => state.user,
  );
  const [isLoading, setIsLoading] = useState(false);

  const updateUserProfile = async (uri: string | null) => {
    try {
      if (uri === '') {
        await deletePhoto();
      } else if (uri) {
        const newPhotoURL = await uploadImageToFirebase({
          imageUri: uri,
          userId: uid,
        });
        await auth().currentUser?.updateProfile({photoURL: newPhotoURL});
        dispatch(
          saveUser({
            displayName,
            uid,
            email,
            photoURL: newPhotoURL,
            provider,
            theme,
          }),
        );
      }
    } catch (error) {
      console.error(ERR_CONSOLE.PROFILE, error);
    }
  };

  const handleNameChange = async (
    values: NameChangeFormValues,
    { resetForm }: FormikHelpers<NameChangeFormValues>,
    displayName: string | null,
    onClose: () => void
  ) => {
    if (values.firstName.trim() === '' || values.lastName.trim() === '') {
      showAlert(ERR_TITLE.ERROR, ERR_MSG.FILL_ALL_FIELDS);
      return;
    } else if (`${values.firstName.trim()} ${values.lastName.trim()}` === displayName) {
      showAlert(ERR_TITLE.ERROR, ERR_MSG.SAME_USERNAME);
      return;
    }
    setIsLoading(true);
    try {
      const user = auth().currentUser;
      await user?.updateProfile({
        displayName: `${values.firstName.trim()} ${values.lastName.trim()}`,
      });

      dispatch(
        saveName({
          displayName: `${values.firstName.trim()} ${values.lastName.trim()}`,
        }),
      );
      showAlert(ERR_TITLE.SUCCESS, ERR_MSG.USERNAME_CHANGED);
      resetForm();
      onClose();
    } catch (error: any) {
      console.error(ERR_CONSOLE.PROFILE, error);
      showAlert(ERR_TITLE.ERROR, error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return {
    isLoading,
    updateUserProfile,
    handleNameChange
  };
}
