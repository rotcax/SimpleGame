import React, { FC } from 'react'
import { ShapesType } from '../../types'
import FastImage from 'react-native-fast-image'
import Matter from 'matter-js'

const rocket = require('../../assets/rocket.png')

const Obstacle: FC<ShapesType> = ({ size = [], body }) => {
  const width = size[0]
  const height = size[1]

  const x = body.position.x - width / 2
  const y = body.position.y - height / 2

  return (
    <FastImage
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        borderRadius: 20,
        height,
      }}
      source={rocket}
      resizeMode={FastImage.resizeMode.stretch}
    />
  )
}

export default (world: any, type: string, pos: any, size: any) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { isStatic: true, friction: 1 },
  )

  Matter.World.add(world, [initialObstacle])

  return {
    body: initialObstacle,
    size: [size.width, size.height],
    type: type,
    scored: false,
    renderer: <Obstacle />,
  }
}
