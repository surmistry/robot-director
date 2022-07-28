const {Robot, Delivery} = require('./utils')

const DEFAULT_ROBOT_LIST = ['robbie', 'jane', 'bob']

// Represent data just for the spaces that are occupied, not for the space in-between
const DEFAULT_DELIVERY_LIST = [[0, -1], [1, 1], [1, 0], [0, 1], [2, 0]];
const DEFAULT_DIRECTIONS_LIST = 'vv>><^';

const directRobots = (
  directions = DEFAULT_DIRECTIONS_LIST,
  robotList = DEFAULT_ROBOT_LIST,
  deliveryList = DEFAULT_DELIVERY_LIST, VERBOSE
) => {
  const directionArr = directions.toUpperCase().split('');
  let robotDict = Robot.createDict(robotList);
  let index = 0;
  let deliveryTracker = Delivery.createDeliveryTracker(deliveryList);
  for (let direct of directionArr) {
    
    // TODO: Cyclic LinkedList instead of modulus
    let robotIndex = index % robotList.length;
    let robotName = robotList[robotIndex];

    // Look to see if current robot is occupying a previously delivered package
    let robot = robotDict[robotName];
    let previousDelivery = Delivery.checkDelivery(robot, deliveryTracker);
    
    // If the current robot is occupying a delivered coordinate, set it back
    if ((previousDelivery.index !== -1) && (previousDelivery.occupied)){
      if (VERBOSE) console.log(robotName, ' is finishing a delivery')
      let tempParams = Delivery.updateRobotDelivered(false, robot, deliveryTracker, previousDelivery.index);
      robot = tempParams[0]
      deliveryTracker = tempParams[1]
    }
    let updatedRobot = Robot.moveRobot(direct, robot);

    // Deliverable logs
    console.log(robotName, direct)
    let deliveryStatus = Delivery.checkDelivery(updatedRobot, deliveryTracker);

    // Check if the coordinate a robot has just moved into does not have another robot delivering in it
    // Update the delivery count
    if ((deliveryStatus.index!== -1) && (deliveryStatus.occupied == false)) {
      let tempParams = Delivery.updateRobotDelivered(true, updatedRobot, deliveryTracker, deliveryStatus.index);
      updatedRobot = tempParams[0]
      if (VERBOSE) console.log(`${robotName} found a package, they have made ${updatedRobot.deliveries} deliveries.`)
      deliveryTracker = tempParams[1]
    }
    robotDict[robotName] = updatedRobot
    index++;
  }
  if(VERBOSE) console.log(robotDict)
}

module.exports = directRobots