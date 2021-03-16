import React, { FC } from 'react'
import { ShapesType } from '../../types'
import Matter from 'matter-js'
import FastImage from 'react-native-fast-image'

const clouds = require('../../assets/clouds.png')

const Ceiling: FC<ShapesType> = ({ size = [], body, color }) => {
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
        height,
        backgroundColor: color || 'pink',
      }}
      source={clouds}
      resizeMode={FastImage.resizeMode.stretch}
    />
  )
}

export default (world: any, color: string, pos: any, size: any) => {
  const initialCeiling = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { isStatic: true, friction: 1 },
  )

  Matter.World.add(world, [initialCeiling])

  return {
    body: initialCeiling,
    size: [size.width, size.height],
    color: color,
    renderer: <Ceiling />,
  }
}
