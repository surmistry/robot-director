DEFAULT_ROBOT_LIST = ['robbie', 'jane', 'bob']

// Represent data just for the spaces that are occupied, not for the space in-between
DEFAULT_DELIVERY_LIST = [[0, -1], [1, 1], [1, 0], [0, 1], [2, 0]];

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
    deliveries: robot.deliveries+1
  }
  let updatedDeliveries = [...deliveries];
  updatedDeliveries[index].occupied = status;
  return[returnRobot, updatedDeliveries]
}


const createDeliveryTracker =(deliveries) => deliveries.map(delivery => ({occupied: false, coord: delivery}))

const directRobots = (
  directions,
  robotList = DEFAULT_ROBOT_LIST,
  deliveryList = DEFAULT_DELIVERY_LIST
) => {
  const directionArr = directions.toUpperCase().split('');
  let robotDict = createDict(robotList);
  let index = 0;
  let deliveryTracker = createDeliveryTracker(deliveryList);
  for (let direct of directionArr) {
    
    // Plenty of room for improvement here, cyclic LinkedList for example
    let robotIndex = index % robotList.length;
    let robotName = robotList[robotIndex];

    // Look to see if robot is occupying a previously delivered package
    let robot = robotDict[robotName];
    let previousDelivery = checkDelivery(robot, deliveryTracker);
    if ((previousDelivery.index !== -1) && (previousDelivery.occupied)){
      console.log(robotName, ' is finishing a delivery')
      let tempParams = updateRobotDelivered(false, robot, deliveryTracker, previousDelivery.index);
      robot = tempParams[0]
      // console.log(`${robotName} found a package, they have made ${updatedRobot.deliveries} deliveries.`)
      deliveryTracker = tempParams[1]
    }
    let updatedRobot = moveRobot(direct, robot);
    console.log(robotName, direct)
    let deliveryStatus = checkDelivery(updatedRobot, deliveryTracker);
    if ((deliveryStatus.index!== -1) && (deliveryStatus.occupied == false)) {
      let tempParams = updateRobotDelivered(true, updatedRobot, deliveryTracker, deliveryStatus.index);
      updatedRobot = tempParams[0]
      console.log(`${robotName} found a package, they have made ${updatedRobot.deliveries} deliveries.`)
      deliveryTracker = tempParams[1]
    }
    robotDict[robotName] = updatedRobot
    index++;
  }
  console.log(robotDict)
}

directRobots('vv>><^')