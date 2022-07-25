DEFAULT_ROBOT_LIST = ['robbie', 'jane', 'bob']

// Represent data just for the spaces that are occupied, not for the space in-between
DEFAULT_DELIVERY_LIST = [[0, 1], [2, 0]]

const createDict = (robots) => {
  let dictionary = robots.reduce((dictionary, robot) => {
    dictionary[robot] = {
      deliveries: 0,
      position: []
    }
    return dictionary
  }, {})
}

const handleDirections = (inputs) => {
  let directionArr = inputs.split('')
  console.log(directionArr)
}

const directRobots = (directions, robotList = DEFAULT_ROBOT_LIST, deliveryList= DEFAULT_DELIVERY_LIST) => {
  handleDirections(directions)
  createDict(robotList)

}

directRobots('vv>><^')