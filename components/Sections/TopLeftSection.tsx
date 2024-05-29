import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLOR_WHITE, COLOR_YELLOW } from '../../utils/constants';

export default function TopLeftSection() {
  return (
    <View style={styles.top_left_back_content}>
      <Image
        source={require('../../assets/images/user-img.png')}
        style={{height: '50%'}}
        resizeMode="contain"></Image>
      <View style={{}}>
        <Text style={[styles.font, {color: COLOR_YELLOW}]}>
          Guest1234765756
        </Text>
        <Text style={[styles.font, {color: COLOR_WHITE}]}>289920928320384</Text>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
    font:{
        fontWeight:400,
        fontSize:15
      },
      top_left_back_content:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        marginRight:'15%',
        alignItems:'center',
      },
})
