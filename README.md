Bitcore P2P
=======

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
In order to connect to the Bitcoin network, you'll need to know the IP address of at least one node of the network. One can find some of teh active peers using [a DNS lookup of seed.bitcoin.sipa.be](http://network-tools.com/nslook/Default.asp?domain=seed.bitcoin.sipa.be&type=1&server=67.222.132.213&class=1&port=53&timeout=5000&go.x=15&go.y=14).

```javascript
var peer = new bitcore.P2P.Peer({host: '127.0.0.1'});

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

## License

Code released under [the MIT license](https://github.com/bitpay/bitcore/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
