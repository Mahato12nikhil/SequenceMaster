import React from 'react';
import {StyleSheet, View} from 'react-native';
import HorizontalBar from '../tools/HorizontalBar';
import { COLOR_YELLOW } from '../../utils/constants';

const optionIdToAlpha: {[key: number]: string} = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
  8: 'h',
};

type Props = {
  questionId: number;
  options: {
    optionId: number;
    textValue: string;
  }[];
  onOptionSelected: (optionId: number) => void;
};

function OptionsView(props: Props) {
  return (
    <View style={styles.container}>
      {props.options.map(e => (
        <HorizontalBar
          key={e.optionId}
          questionId={props.questionId}
          optionId={e.optionId}
          progress={30}
          barType={'horizontal'}
          width={100}
          textColor={'white'}
          label={e.textValue}
          progressedColor={COLOR_YELLOW}
          onPress={props.onOptionSelected}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom:15
  },
});

export default OptionsView;
