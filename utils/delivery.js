
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

module.exports  = { checkDelivery, updateRobotDelivered, createDeliveryTracker }