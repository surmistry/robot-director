# Robot Director

___

## How to run

This script can be run with its default configuration. Use the input flag `-i` to pass custom inputs in a specific order. Since all defaults are pre-configured it is not necessary to pass all the inputs at a time.

```bash
# Run with the default configuration
node ./director.js

# Use the -i flag to specify custom inputs 
node ./director.js -i <DIRECTIONS String()> <ROBOTS Array(String))> <DELIVERIES Array([x,y])> 
```

The default configuration runs with the following parameters.

```javascript
const DEFAULT_ROBOT_LIST = ['robbie', 'jane', 'bob']
const DEFAULT_DELIVERY_LIST = [[0, -1], [1, 1], [1, 0], [0, 1], [2, 0]];
const DEFAULT_DIRECTIONS_LIST = 'vv>><^';

```

Use the verbose flag `-v` to print every delivery started and finished.


## Notes

Branch `bug/create-modules` is to break down the code into contained modules and organize it better.

`directRobots()` being the driving function is not best practice, there were multiple error and edge cases to handle first. There was not enough time to continue cleaning up the code & breaking it down into smaller modules.

`updateRobotDelivered()` makes a shallow copy and returns a temp variable because of a destructuring error in `Node v11.15.0` (not enough time to test later versions on MacOS 10.12.6)

`checkDelivery()` is a rudimentary check that compares one robot against any deliveries that it matches and doens't account for edge cases including: 

- Multiple robots on one tile, if a robot exits it will set the delivery object to "unoccupied" even with other robots on the tile
- Assuming robots can only complete a delivery as it enters a tile and if there are other robots there it does not complete that delivery
- Delivery targets can have multiple packages delivered to them
- Passing an array from a bash command to a node script is ridiculous, feel free to update parameters from [these lines](./director.js#L6)