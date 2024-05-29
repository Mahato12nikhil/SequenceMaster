import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLOR_YELLOW } from '../../utils/constants'

export default function TopRightSection() {
  return (
    <View style={styles.top_right_back_content}>
    <Image source={require('../../assets/images/Union.png')} resizeMode='stretch' style={styles.top_right_back_content_add}/>
    <View style={styles.top_right_back_content_coin_cont}>
      <View style={styles.top_right_back_content_coin_align}>
        <Image source={require('../../assets/images/bonuscoin.png')} style={styles.coinImg}></Image>
        <Text style={styles.coinTxt}>500.00</Text>
      </View>
      <View style={styles.top_right_back_content_coin_align}>
        <Image source={require('../../assets/images/cashicon.png')} style={styles.coinImg}></Image>
        <Text style={styles.coinTxt}>100.00</Text>
      </View>
    </View>
  </View>
  )
}
const styles=StyleSheet.create({
    top_right_back_content:{
        flex:1,
        flexDirection:'row',
        marginLeft:2
      },
      top_right_back_content_add:{
        height:'100%'
      },
      font:{
        fontWeight:400,
        fontSize:15
      },
     
      top_right_back_content_coin_cont:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginBottom:20
      },
      top_right_back_content_coin_align:{
        flex:1,
        flexDirection:'row'
      },
      coinImg:{
        height:'50%',
        lineHeight:1
      },
      coinTxt:{
        marginLeft:10,
        color:COLOR_YELLOW,
        fontFamily:'JejuGothic',
      }
})
