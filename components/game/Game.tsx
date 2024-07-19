import React from 'react'
import { StyleSheet, View } from 'react-native'
import HorizontalBar from '../tools/HorizontalBar'
import ScoreViewer from '../Sections/ScoreViewer'
import LowerScoreBar from '../Sections/LowerScoreBar'
import { COLOR_YELLOW } from '../../utils/constants'

export default function Game() {
  return (
    <View style={{ }}>
      <View style={styles.scoreViewContainer}>
        <ScoreViewer />
        <View style={[styles.horizontalBarContainer]}>
          <View style={{ marginBottom: 15 }}>
            <HorizontalBar
              progress={50}
              width={''}
              label={''}
              barType={''}
              barColor={''}
              textColor={''}
              progressedColor={'#FFD700'}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <HorizontalBar
              progress={24}
              width={''}
              label={''}
              barType={''}
              barColor={''}
              textColor={''}
              progressedColor={'#FFD700'}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <HorizontalBar
              progress={50}
              width={''}
              label={''}
              barType={''}
              barColor={''}
              textColor={''}
              progressedColor={'#FFD700'}
            />
          </View>
        </View>
      </View>
      <View style={{marginTop:10}}>
        <LowerScoreBar />
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  scoreViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  horizontalBarContainer: {

    height: 'auto',
  },
})