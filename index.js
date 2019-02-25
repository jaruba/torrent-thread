var path = require('path')
var fs = require('fs')
var child = require('child_process')

var back = '../..';
var binDir = path.resolve(__dirname, back, 'bin');

// in case of asar, go one level down
while (binDir.includes('/app.asar/') || binDir.includes('\\app.asar\\')) {
    back += '/..'
    binDir = path.resolve(__dirname, back, 'bin');
}

// for safety
if (!fs.existsSync(binDir)) {
  back += '/..'
  binDir = path.resolve(__dirname, back, 'bin');
}

var torrentThread = path.join(binDir, 'torrent-thread')

var fileName = 'torrent-thread' + (process.platform == 'win32' ? '.exe' : '')

if (fs.existsSync(path.join(torrentThread, fileName)))
  torrentThread = path.join(torrentThread, fileName)

module.exports = function(port) {
  return child.exec('"' + torrentThread + '" --powPort=' + port)
}
