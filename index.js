const { spawn } = require('child_process')
const arp = require('node-arp')
function getInterfaces () {
  let options = []
  let allInterfaces = require('os').networkInterfaces()
  for (let intfName in allInterfaces) {
    options.push(
      ...allInterfaces[intfName]
      .filter(address => address.family === 'IPv4' && !address.internal)
      .map(m => intfName)
    )
  }
  return options
}

function setMacWin (ip, mac, interfaceName) {
  return new Promise((resolve, reject) => {
    let arp = spawn('netsh', ['-c', 'interface', 'ipv4', 'set', 'neighbors', interfaceName, ip, mac])
    let errstream = ''
    // let buffer = ''
    // arp.stdout.on('data', function (data) {
    //   buffer += data
    // })
    arp.stderr.on('data', function (data) {
      errstream += data
    })
    arp.on('close', function (code) {
      if (code !== 0) reject(errstream)
      resolve()
    })
  })
}

module.exports = arp
arp.setMac = function (ip, mac) {
  if (process.platform.indexOf('win') === 0) {
    mac = mac.replace(/:/g, '-')
    let interfaces = getInterfaces()
    let promises = interfaces.map(intf => setMacWin(ip, mac, intf))
    return Promise.all(promises)
  }
  return new Promise((resolve, reject) => {
    let arp = spawn('arp', [ '-s', ip, mac ])
    let errstream = ''
    // let buffer = ''
    // arp.stdout.on('data', function (data) {
    //   buffer += data;
    // })
    arp.stderr.on('data', function (data) {
      errstream += data
    })

    arp.on('close', function (code) {
      if (code !== 0) reject(errstream)
      resolve()
    })
  })
}
