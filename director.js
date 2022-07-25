DEFAULT_ROBOT_LIST = ['robbie', 'jane', 'bob']

// Represent data just for the spaces that are occupied, not for the space in-between
DEFAULT_DELIVERY_LIST = [[0, 1], [2, 0]]

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
  console.log(processor, direction)
  return ({
    ...robot,
    position: processor(robot.position)
  })
}

const directRobots = (directions, robotList = DEFAULT_ROBOT_LIST, deliveryList = DEFAULT_DELIVERY_LIST) => {
  const directionArr = directions.toUpperCase().split('');
  let robotDict = createDict(robotList);
  const moduloFactor = robotList.length
  let index = 0;
  for (let direct of directionArr) {
    let robotIndex = index % robotList.length;
    // Plenty of room for improvement here, cyclic LinkedList for example
    let robot = robotDict[robotList[robotIndex]];

    robotDict[robotList[robotIndex]] = moveRobot(direct, robot);
    index++;
    console.log(robotDict)
  }
}

directRobots('vv>><^')