import React, { FC } from 'react'
import Matter from 'matter-js'
import { View, Image } from 'react-native'
import { ShapesType } from '../../types'

const water = require('../../assets/water.png')

const Floor: FC<ShapesType> = ({ size = [], body, color }) => {
  const width = size[0]
  const height = size[1]

  const x = body.position.x - width / 2
  const y = body.position.y - height / 2

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color || 'pink'
      }}
    >
      <Image
        style={{ width, height }}
        source={water}
        resizeMode="stretch"
      />
    </View>
  )
}

export default (world: any, color: string, pos: any, size: any) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { isStatic: true, friction: 1 }
  )

  Matter.World.add(world, [initialFloor])

  return {
    body: initialFloor,
    size: [size.width, size.height],
    color,
    renderer: <Floor/>
  }
}
