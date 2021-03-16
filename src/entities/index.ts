import Matter from 'matter-js'
import { Ceiling, Plane, Floor, Obstacle } from '../components'
import {
  Constants,
  width,
  height,
  heightRatio,
  widthRatio,
  getRandom,
  topObstacleHeight,
  bottomObstacleHeight
} from '../utils'

Matter.Common.isElement = () => false

export default (restart?: any) => {
  if(restart) Matter.Engine.clear(restart.physics.engine)

  let engine = Matter.Engine.create({ enableEleeping: false })
  let world = engine.world
  world.gravity.y = 0.25

  return {
    physics: { engine, world },
    Plane: Plane(
      world,
      'pink',
      { x: width / 2, y: height / 2 },
      { height: heightRatio * 50, width: widthRatio * 70 }
    ),
    Floor: Floor(
      world,
      'white',
      { x: width / 2, y: height - heightRatio * 40 },
      { height: heightRatio * 90, width }
    ),
    Ceiling: Ceiling(
      world,
      'white',
      { x: width / 2, y: -heightRatio * 120 },
      { height: heightRatio * 120, width }
    ),
    Obstacle1: Obstacle(
      world,
      'top',
      {
        x: width * 2 - Constants.TOP_PIPE_WIDTH / 2,
        y: getRandom(heightRatio * 100, heightRatio * 300)
      },
      { height: topObstacleHeight, width: Constants.TOP_PIPE_WIDTH }
    ),
    Obstacle2: Obstacle(
      world,
      'bottom',
      {
        x: width * 3 - Constants.BOTTOM_PIPE_WIDTH / 2,
        y: getRandom(heightRatio * 300, heightRatio * 500)
      },
      { height: bottomObstacleHeight, width: Constants.BOTTOM_PIPE_WIDTH }
    )
  }
}
