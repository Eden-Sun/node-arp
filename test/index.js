require('should')

var lib = require('../index.js')

const testIP = '192.168.16.1'
const testMac = '5c:3d:33:af:6b:5' + Math.floor(Math.random() * 10)
// const testMac = '5c:3d:33:af:6b:56'
console.log('testing Mac = ', testMac)
describe('api spec test', () => {
  it('set arp', () =>
    lib.setMac(testIP, testMac)
  )

  it('read result', function (done) {
    this.timeout(20000)
    lib.getMAC(testIP, (err, mac) => {
      mac.should.equal(testMac)
      done()
    })
  })
})
