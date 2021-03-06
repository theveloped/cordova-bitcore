module.exports = {
  version: require('./version'),
  verack: require('./verack'),
  ping: require('./ping'),
  pong: require('./pong'),
  block: require('./block'),
  tx: require('./tx'),
  getdata: require('./getdata'),
  headers: require('./headers'),
  notfound: require('./notfound'),
  inv: require('./inv'),
  addr: require('./addr'),
  alert: require('./alert'),
  reject: require('./reject'),
  merkleblock: require('./merkleblock'),
  filterload: require('./filterload'),
  filteradd: require('./filteradd'),
  filterclear: require('./filterclear'),
  getblocks: require('./getblocks'),
  getheaders: require('./getheaders'),
  mempool: require('./mempool'),
  getaddr: require('./getaddr')
};