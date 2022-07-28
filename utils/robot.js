
const createDict = (robots) => robots.reduce((dictionary, robot) => {
  dictionary[robot] = {
    deliveries: 0,
    position: [0, 0]
  }
  return dictionary
}, {})

const moveUp = ([x, y]) => [x, y + 1]
const moveDown = ([x, y]) => [x, y - 1]
const moveLeft = ([x, y]) => [x - 1, y]
const moveRight = ([x, y]) => [x + 1, y]

const DIRECTION_LUT = {
  '^': moveUp,
  'V': moveDown,
  '>': moveRight,
  '<': moveLeft
}

const moveRobot = (direction, robot) => {
  let processor = DIRECTION_LUT[direction];
  return ({
    ...robot,
    position: processor(robot.position)
  })
}

module.exports = {createDict, moveRobot}