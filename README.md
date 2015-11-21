Bitcore P2P
=======

This fork of `bitcore-p2p` is build to be browserfiable and usable in cordova mobile applications. The changes allow for the replacement of node's `Net` with the cordova plugins: `cordova-plugin-chrome-apps-sockets-tcp` and `cordova-plugin-chrome-apps-sockets-tcpserver`.

For more information check out the main repos:
[bitcore-lib](https://github.com/bitpay/bitcore-lib)
[bitcore-p2p](https://github.com/bitpay/bitcore-p2p)
[bitcore-mnemonic](https://github.com/bitpay/bitcore-mnemonic)

## Build
Below we will describe the different steps to clone and broserify the repository to your own version of of `bitcore-p2p.js`. First one should clone the repository using:

```sh
git clone https://github.com/theveloped/bitcore-p2p.git
```

One can now cd into the newly created repository and install the different node dependencies that are required. You may need sudo privelidges to install the dependencies.

```sh
cd bitcore-p2p
npm install bitcore-lib
npm install bloom-filter
npm install socks5-client
npm install buffers
```
Now all the different dependencies are installed we install and use `browserify` to output our `bitcore-p2p.js` file in the root directory. Adding this file to your HTML will make the global `bitcore.P2P` class available. Notice one will need `bitcor-lib.js` for the other bitcore classes.

```sh
npm install -g browserify
browserify index.js -s bitcore.P2P > bitcore-p2p.js
```

## Getting Started

```sh
npm install bitcore-p2p
```
In order to connect to the Bitcoin network, you'll need to know the IP address of at least one node of the network, or use [Pool](/docs/pool.md) to discover peers using a DNS seed.

```javascript
var Peer = require('bitcore-p2p').Peer;

var peer = new Peer({host: '127.0.0.1'});

peer.on('ready', function() {
  // peer info
  console.log(peer.version, peer.subversion, peer.bestHeight);
});
peer.on('disconnect', function() {
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

Take a look at the [bitcore guide](http://bitcore.io/guide/peer.html) on the usage of the `Peer` class.

## Contributing

See [CONTRIBUTING.md](https://github.com/bitpay/bitcore/blob/master/CONTRIBUTING.md) on the main bitcore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/bitpay/bitcore/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
