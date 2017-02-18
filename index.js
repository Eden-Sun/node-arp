// module.exports.xxx
const { exec } = require('child_process')

function getInterfaces () {
  let options = []
  let allInterfaces = require('os').networkInterfaces()
  for (let intfName in allInterfaces) {
    options.push(
      ...allInterfaces[intfName]
      .filter(address => address.family === 'IPv4' && !address.internal)
      .map(m => Object.assign(m, { interface: intfName }))
    )
  }
  return options
}

console.log(getInterfaces())
