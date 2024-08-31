import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BONUS_AMOUNT, BONUS_MONEY, COLOR_YELLOW, LIGHT_GREY, REAL_MONEY } from '../../utils/constants';
import CircularFrame from '../tools/CircularFrame';
import { showMessage, showToast } from '../../utils/logger';
import { useAppDispatch, useAppSelector } from '../../state/UseTypedSelector';
import { updateHomeView } from '../../state/reducers/Screen';
import { HomeView } from '../utility/Interfaces';
import { PingWebSocketServer } from '../../services/backend';
import { enterGame } from '../../state/reducers/GameSlice';

export default function Launcher() {
    const [loading, setLoading] = useState(false);
    const playOptionAmounts = [5, 10, 20, 30, 40, 50, 100];
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [gameType, setGameType] = useState<string>('');
    const game = useAppSelector(state => state.game);
    const dispatch=useAppDispatch();
    const { webSocketServerPingUrl} = useAppSelector(state=>state.appConfig)

    const onPlayClick = async (amount:number,gameType:string)=>{
        console.log(webSocketServerPingUrl)
        //showToast(webSocketServerPingUrl+'-url','success')
        if (!webSocketServerPingUrl) {
            showToast('Game server URL not found','error');
            return;
        }
          setLoading(true);
          setSelectedAmount(amount);
          setGameType(gameType);
          try {
            const text = await PingWebSocketServer(webSocketServerPingUrl);
            if (text !== 'pong!') {
              throw new Error('expected text response "pong!"');
            }
            dispatch(enterGame({amount, gameType}));
          } catch (err:any) {
            setLoading(false);
            throw new Error(err);
          }
    }
    useEffect(() => {
        if (!game.loading && game.gameJoinSocketUrl) {
          dispatch(updateHomeView(HomeView.GAME));
        }
      }, [game.gameJoinSocketUrl, game.loading]);
    return (
        <View style={styles.container}>
            <View style={styles.eventContainer} />
            <View style={{marginLeft: '5%'}}>
                <CircularFrame height={150} width={150} amount={BONUS_AMOUNT} fillColor={COLOR_YELLOW} onPlayClick={onPlayClick} gameType={BONUS_MONEY}/>
            </View>
            <View style={styles.playAmountContainer}>
                {playOptionAmounts.slice(1).map((val, index) => {
                    const rowIndex = Math.floor(index / 3);
                    const isFirstInRow = index % 3 === 0;
                    const offset = isFirstInRow ? rowIndex * 30 : 0; 
                    return (
                        <View
                            key={index}
                            style={[
                                styles.circularFrameContainer,
                                { marginLeft: offset }
                            ]}
                        >
                            <CircularFrame height={120} width={120} amount={val} fillColor={LIGHT_GREY} onPlayClick={onPlayClick} gameType={REAL_MONEY}/>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventContainer: {
        width: '15%',
        height: '70%',
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: LIGHT_GREY,
        marginLeft: '5%'
    },
    playAmountContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '50%'
    },
    circularFrameContainer: {
        width: '30%',
        marginVertical: 5,
        alignItems: 'center',
    },
});

