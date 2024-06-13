import React, {useEffect, useState} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {homeStyles} from './homeStyle';
import {useReduxSelector} from '../../Redux/Store/store';
import DeviceInfo from 'react-native-device-info';

interface StorageState {
  totalStorage: string | null;
  usedStorage: string | null;
}

const AvailSpace: React.FC = () => {
  const theme = useReduxSelector(state => state.user.theme);
  const [storage, setStorage] = useState<StorageState>({
    totalStorage: null,
    usedStorage: null,
  });

  useEffect(() => {
    const getStorageInfo = async () => {
      try {
        const totalBytes = await DeviceInfo.getTotalDiskCapacity();
        const freeBytes = await DeviceInfo.getFreeDiskStorage();

        const totalGB = (totalBytes / 1073741824).toFixed(1);
        const usedGB = ((totalBytes - freeBytes) / 1073741824).toFixed(1);

        setStorage({
          totalStorage: totalGB,
          usedStorage: usedGB,
        });
      } catch (error) {
        console.error('Error fetching storage information:', error);
      }
    };

    getStorageInfo();
  }, []);

  return (
    <View style={{alignItems: 'center'}}>
      <View style={homeStyles.imgView}>
        <ImageBackground
          source={
            theme === 'LIGHT'
              ? require('../../Assets/Images/AvailableSpace.png')
              : require('../../Assets/Images/Home_dark.png')
          }
          resizeMode="stretch"
          style={homeStyles.img}>
          <View style={homeStyles.textStyle}>
            <View style={homeStyles.availsp}>
              <Text style={homeStyles.availText}>Available Space</Text>
              <Text style={homeStyles.availTextTwo}>
                {storage.usedStorage} GB of {storage.totalStorage} GB Used
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default AvailSpace;
