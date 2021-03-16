import React, { FC, useRef } from 'react'
import { Animated, Image } from 'react-native'
import { ShapesType } from '../../types'
import Matter from 'matter-js'

const airplane = require('../../assets/airplane.png')

const Plane: FC<ShapesType> = ({ size = [], body }) => {
  const animatedValue = useRef(new Animated.Value(body.velocity.y)).current

  const width = size[0]
  const height = size[1]

  const x = body.position.x - width / 2
  const y = body.position.y - height / 2

  animatedValue.setValue(body.velocity.y)

  const rotation = animatedValue.interpolate({
    inputRange: [-10, 0, 10, 20],
    outputRange: ['-30deg', '10deg', '20deg', '45deg'],
    extrapolate: 'clamp'
  })

  return (
    <Animated.Image
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        transform: [{ rotate: rotation }]
      }}
      source={airplane}
      resizeMode="stretch"
    />
  )
}

export default (world: any, color: string, pos: any, size: any) => {
  const initialPlane = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height
  )

  Matter.World.add(world, [initialPlane])

  return {
    body: initialPlane,
    size: [size.width, size.height],
    color,
    renderer: <Plane/>
  }
}
