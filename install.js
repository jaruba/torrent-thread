var request = require('request')
var fs = require('fs')
var path = require('path');

var user = 'jaruba'
var tag = '0.0.1'
var repoName = 'torrent-thread'

let platform

if (process.platform == 'darwin')
  platform = 'macos'
else if (process.platform == 'win32')
  platform = 'win'
else
  platform = 'linux'

let arch

if (['ia32', 'x86'].indexOf(process.arch) > -1)
  arch = 'x86'
else
  arch = 'x64'

var pkg = 'torrent-thread-' + platform + '-' + arch + (platform == 'win' ? '.exe' : '')
var url = 'https://github.com/' + user + '/' + repoName + '/releases/download/' + tag + '/' + pkg
var binDir = path.resolve(__dirname, '../..', 'bin');

if (!fs.existsSync(binDir))
  fs.mkdirSync(binDir);

request
  .get(url)
  .on('error', function (err) {
    throw err
  })
  .pipe(fs.createWriteStream(pkg))
  .on('close', function () {

    if (!fs.existsSync(path.join(binDir, 'torrent-thread')))
      fs.mkdirSync(path.join(binDir, 'torrent-thread'));

    var newPath = path.join(binDir, 'torrent-thread', 'torrent-thread' + (platform == 'win' ? '.exe' : ''))

    fs.rename(pkg, newPath, function() {
      if (process.platform != 'win32')
        fs.chmod(newPath, '755')
    })
  })
