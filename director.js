const [pwd, file, ...inputs] = process.argv;

const VERBOSE = inputs.indexOf('-v')!= -1
const INPUTS = inputs.indexOf('-i') != -1

inputs.splice(inputs.indexOf('-i'), 1)

const [DIRECTIONS, ROBOTS, DELIVERIES,..._] = INPUTS ? inputs : []
// console.log(DIRECTIONS, ROBOTS, DELIVERIES)

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

const checkDelivery = (
  {position},
  deliveries
) => {
  let deliveryIndex = -1;
  let occupiedStatus = null;
  for (let [i,{occupied, coord}] of deliveries.entries()) {
    let compare = (coord[0] == position[0]) && (coord[1]== position[1])
    if (compare) {
      deliveryIndex = i;
      occupiedStatus = occupied
      break;
    }
  }
  return {index: deliveryIndex, occupied: occupiedStatus}
}

const updateRobotDelivered = (status, robot, deliveries, index) => {
  let returnRobot = {
    ...robot,
    deliveries: status ? robot.deliveries+1 : robot.deliveries
  }
  let updatedDeliveries = [...deliveries];
  updatedDeliveries[index].occupied = status;
  return[returnRobot, updatedDeliveries]
}


const createDeliveryTracker =(deliveries) => deliveries.map(delivery => ({occupied: false, coord: delivery}))


const DEFAULT_ROBOT_LIST = ['robbie', 'jane', 'bob']

// Represent data just for the spaces that are occupied, not for the space in-between
const DEFAULT_DELIVERY_LIST = [[0, -1], [1, 1], [1, 0], [0, 1], [2, 0]];
const DEFAULT_DIRECTIONS_LIST = 'vv>><^';

const directRobots = (
  directions = DEFAULT_DIRECTIONS_LIST,
  robotList = DEFAULT_ROBOT_LIST,
  deliveryList = DEFAULT_DELIVERY_LIST
) => {
  const directionArr = directions.toUpperCase().split('');
  let robotDict = createDict(robotList);
  let index = 0;
  let deliveryTracker = createDeliveryTracker(deliveryList);
  for (let direct of directionArr) {
    
    // TODO: Cyclic LinkedList instead of modulus
    let robotIndex = index % robotList.length;
    let robotName = robotList[robotIndex];

    // Look to see if current robot is occupying a previously delivered package
    let robot = robotDict[robotName];
    let previousDelivery = checkDelivery(robot, deliveryTracker);
    
    // If the current robot is occupying a delivered coordinate, set it back
    if ((previousDelivery.index !== -1) && (previousDelivery.occupied)){
      if (VERBOSE) console.log(robotName, ' is finishing a delivery')
      let tempParams = updateRobotDelivered(false, robot, deliveryTracker, previousDelivery.index);
      robot = tempParams[0]
      deliveryTracker = tempParams[1]
    }
    let updatedRobot = moveRobot(direct, robot);

    // Deliverable logs
    console.log(robotName, direct)
    let deliveryStatus = checkDelivery(updatedRobot, deliveryTracker);

    // Check if the coordinate a robot has just moved into does not have another robot delivering in it
    // Update the delivery count
    if ((deliveryStatus.index!== -1) && (deliveryStatus.occupied == false)) {
      let tempParams = updateRobotDelivered(true, updatedRobot, deliveryTracker, deliveryStatus.index);
      updatedRobot = tempParams[0]
      if (VERBOSE) console.log(`${robotName} found a package, they have made ${updatedRobot.deliveries} deliveries.`)
      deliveryTracker = tempParams[1]
    }
    robotDict[robotName] = updatedRobot
    index++;
  }
  if(VERBOSE) console.log(robotDict)
}

directRobots(DIRECTIONS, ROBOTS, DELIVERIES)

module.exports = directRobots