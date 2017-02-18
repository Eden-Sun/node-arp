const { spawn } = require('child_process')
const arp = require('node-arp')
// function getInterfaces () {
//   let options = []
//   let allInterfaces = require('os').networkInterfaces()
//   for (let intfName in allInterfaces) {
//     options.push(
//       ...allInterfaces[intfName]
//       .filter(address => address.family === 'IPv4' && !address.internal)
//       .map(m => Object.assign(m, { interface: intfName }))
//     )
//   }
//   return options
// }
//
// console.log(getInterfaces())

module.exports = arp
arp.setMac = function (ip, mac) {
  return new Promise((resolve, reject) => {
    var arp = spawn("arp", [ "-S", ip, mac ])
    var buffer = '';
    var errstream = '';
    arp.stdout.on('data', function (data) {
      buffer += data;
    })
    arp.stderr.on('data', function (data) {
      errstream += data;
    })

    arp.on('close', function (code) {
      if (code !== 0) reject(errstream)
      resolve()
    })
  })
}
