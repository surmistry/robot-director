const directRobots = require('./director')
const [pwd, file, ...inputs] = process.argv;

const VERBOSE = inputs.indexOf('-v')!= -1
const INPUTS = inputs.indexOf('-i') != -1

inputs.splice(inputs.indexOf('-i'), 1)

const [DIRECTIONS, ROBOTS, DELIVERIES,..._] = INPUTS ? inputs : []

/**
 * These defaults and type definitions would be more visible in TypeScript
 */
directRobots(DIRECTIONS, ROBOTS, DELIVERIES, VERBOSE)