cordova-bitcore
=======

### This repo is still under heavy development and not yet ready for implementation

This fork of `bitcore-p2p` is build to be browserfiable and usable in cordova mobile applications. The changes allow for the replacement of node's `Net` with the cordova plugins: `cordova-plugin-chrome-apps-sockets-tcp` and `cordova-plugin-chrome-apps-sockets-tcpserver`.

For more information check out the main repos:
[bitcore-lib](https://github.com/bitpay/bitcore-lib),
[bitcore-p2p](https://github.com/bitpay/bitcore-p2p),
[bitcore-mnemonic](https://github.com/bitpay/bitcore-mnemonic)

## Build
Below we will describe the different steps to clone and broserify the repository to your own version of of `cordova-bitcore.js`. First one should clone the repository using:

```sh
git clone https://github.com/theveloped/cordova-bitcore.git
```

One can now cd into the newly created repository and install the different node dependencies that are required. You may need sudo privelidges to install the dependencies.

```sh
cd cordova-bitcore
npm install bitcore-lib
npm install bitcore-mnemonic
npm install bloom-filter
npm install cordova-chrome-net
npm install buffers
```
Now all the different dependencies are installed we install and use `browserify` to output our `cordova-bitcore.js` file in the root directory. Adding this file to your HTML will make the global `bitcore` class available.

```sh
npm install -g browserify
browserify index.js -s bitcore > cordova-bitcore.js
```

## Getting Started

Add the `cordova-bitcore.js` file that was build above to your cordova/ionic `www/js` folder and include it into your app by including the following line to your html header. This will make the global `bitcore` class available to you.

```sh
<script src="js/cordova-bitcore.js"></script>
```

### Peer

In order to connect to the Bitcoin network, you'll need to know the IP address of at least one node of the network. One can find some of teh active peers using [a DNS lookup of seed.bitcoin.sipa.be](http://network-tools.com/nslook/Default.asp?domain=seed.bitcoin.sipa.be&type=1&server=67.222.132.213&class=1&port=53&timeout=5000&go.x=15&go.y=14).

```javascript
var peer = new bitcore.P2P.Peer({host: '212.47.228.216'});

peer.on('connect', function() {
  // socket connected to peer
  console.log('connection connected');
});
peer.on('ready', function() {
  // version and verack exchange complete
  console.log(peer.version, peer.subversion, peer.bestHeight);
});
peer.on('disconnect', function() {
  // socket closed
  console.log('connection closed');
});
peer.connect();
```

Then, you can get information from other peers by using:

```javascript
// handle events
peer.on('inv', function(message) {
  // message.inventory[]
});
peer.on('tx', function(message) {
  // message.transaction
});
```

Take a look at the [bitcore guide](https://bitcore.io/api/p2p/peer) on the usage of the `Peer` class.

### Pool

One can also connect to several peers using the `pool` module. This is a collection of peers and can be initiated below using a set of long standing trusted peers to start with.

```javascript
var pool = new bitcore.P2P.Pool({
  network: bitcore.Networks.livenet,  // the network object
  dnsSeed: false,                     // allow descovering peers from seed - NOT YET IMPLEMENTED ON CORDOVA
  listenAddr: true,                   // allow connection of new advertized peers
  maxSize: 32,                        // max number of connected peers
  addrs: [                            // initial trusted peers
    { ip: { v4: '212.47.228.216' } },
    { ip: { v4: '66.228.49.201' } },
    { ip: { v4: '137.116.225.142' } },
    { ip: { v4: '85.214.251.25' } }
  ]
});

pool.connect();
```

One can now handle the messages of all underlying peers as can be seen in the snippet below. The messages have the `peer` prefix connected to it. This means `inv` becomes `peerinv`.

```javascript
pool.on('peerinv', function(peer, message) {
  // message.inventory[]
});

pool.on('peertx', function(peer, message) {
  // message.transaction
});
```

Take a look at the [bitcore guide](https://bitcore.io/api/p2p/pool) on the usage of the `Pool` class.


## License

Code released under [the MIT license](https://github.com/bitpay/bitcore/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
