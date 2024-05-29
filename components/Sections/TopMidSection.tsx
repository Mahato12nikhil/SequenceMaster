import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function TopMidSection() {
  return (
    <View style={styles.top_mid_icon_container}>
        <Image source={require('../../assets/images/Account.png')} resizeMode='contain' style={styles.top_mid_icons}></Image>
        <Image source={require('../../assets/images/withdraw.png')} resizeMode='contain' style={styles.top_mid_icons}></Image>
        <Image source={require('../../assets/images/mail.png')} resizeMode='contain' style={styles.top_mid_icons}></Image>
        <Image source={require('../../assets/images/settings.png')} resizeMode='contain' style={styles.top_mid_icons}></Image>
     </View>   
  )
}
const styles=StyleSheet.create({
    top_mid_icon_container:{
        flex:1,
        marginLeft:'10%',
        marginRight:'10%',
        marginBottom:'3%',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
        flexDirection:'row'

      },
      top_mid_icons:{
        height:'100%',
      }
})
