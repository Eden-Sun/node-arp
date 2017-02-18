This repo in inspired by [node-arp](https://github.com/nekuz0r/node-arp)

Function set static MAC address of arp table which wrapped in Promise

```js

import arp from 'node-static-arp'

arp.setMac('192.168.1.1', '11:22:33:44:55:66')

.then(success => {
  ...
}).catch(error => {
  ...
})
```
