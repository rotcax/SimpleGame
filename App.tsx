import React, { useState, useRef } from 'react'
import { Alert, StatusBar, StyleSheet, View, Text } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { width, height } from './src/utils/styleSheet'
import Entities from './src/entities'
import Systems from './src/systems'
import FastImage from 'react-native-fast-image'

const backgroundImage = require('./src/assets/nature.jpeg')

const App = () => {
  const [running, setRunnig] = useState(true)
  const [score, setScore] = useState(0)

  let gameEngine: any = useRef(null).current

  const onEvent = (e: any) => {
    if(e.type === 'gameOver') {
      // Alert.alert('Game Over');
      // setRunnig(false)
    } else if(e.type === 'score') {
      setScore(prev => prev + 1)
    }
  }

  const restart = () => {
    setRunnig(true)
    setScore(0)

    gameEngine.swap(Entities())
  }

  return (
   <View style={styles.container}>
    <FastImage style={styles.imageBackground} source={backgroundImage} />
    <GameEngine
    ref={ref => gameEngine = ref}
    style={styles.gameContainer}
    systems={Systems}
    onEvent={onEvent}
    entities={Entities()}
    running={running}
    >
      <StatusBar hidden={true} />
    </GameEngine>
     {/* {
       running ? (
         <Text style={styles.score}></Text>
       ) : (

       )
     } */}
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  score: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 100,
    fontFamily: 'crackman-regular'
  },
  imageBackground: {
    width,
    height,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default App
