import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useAppDispatch } from '../../state/UseTypedSelector'
import { updateHomeView } from '../../state/reducers/Screen';
import { HomeView } from '../utility/Interfaces';

export default function TopMidSection() {
  const dispatch=useAppDispatch();
  const onClick = () => {
    dispatch(updateHomeView(HomeView.LOGIN))
  }
  return (
    <View style={styles.top_mid_icon_container}>
      <Pressable style={styles.top_mid_icons} onPress={onClick}>
        <Image source={require('../../assets/images/Account.png')} resizeMode='contain' ></Image>
      </Pressable>
      <Pressable style={styles.top_mid_icons}>
        <Image source={require('../../assets/images/withdraw.png')} resizeMode='contain' ></Image>
      </Pressable>
      <Pressable style={styles.top_mid_icons}>
        <Image source={require('../../assets/images/mail.png')} resizeMode='contain' ></Image>
      </Pressable>
      <Pressable style={styles.top_mid_icons}>
        <Image source={require('../../assets/images/settings.png')} resizeMode='contain' ></Image>
      </Pressable>

    </View>
  )
}
const styles = StyleSheet.create({
  top_mid_icon_container: {
    flex: 1,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '3%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row'

  },
  top_mid_icons: {
    height: '100%',
  }
})
