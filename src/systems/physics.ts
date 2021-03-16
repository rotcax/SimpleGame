import Matter from 'matter-js'

type PhysicsProps = {
  time: any
  dispatch: any
}

const Physics = (entities: any, { time, dispatch }: PhysicsProps) => {
  let engine = entities.physics.engine
  Matter.Engine.update(engine, time.delta)

  Matter.Events.on(engine, 'collisionStart', event => {
    dispatch({ type: 'gameOver' })
  })

  return entities
}

export default Physics
