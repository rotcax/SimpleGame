import Matter from 'matter-js'

type UpdatePlaneProps = {
  touches: any
  time: any
}

const UpdatePlane = (entities: any, { touches, time }: UpdatePlaneProps) => {
  const engine = entities.physics.engine

  touches
    .filter((t: any) => t.type === 'press')
    .forEach((t: any) => {
      Matter.Body.setVelocity(entities.Plane.body, {
        x: entities.Plane.body.velocity.x,
        y: -3
      })
    })

  Matter.Engine.update(engine, time.delta)
  return entities
}

export default UpdatePlane
