const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv
const readLine = require('readline')

const newFile = __dirname + `/${argv.dir}`

const readDir = (base) => {
  const files = fs.readdirSync(base)

  files.forEach(item => {
    let localBase = path.join(base, item)
    let state = fs.statSync(localBase)
    if (state.isFile()) {
      if(argv._[0] === 'copy') {
        let firstLet = item[0]
        fs.mkdirSync(path.join(newFile, firstLet), { recursive: true })
        copyFile(localBase, path.join(newFile, firstLet, item), err => {
          console.log('done', err)
        })
      } else {
        fs.unlinkSync(localBase)
      }
    } else {
      readDir(localBase);
    }
  })
  if(argv._[0] === 'delete') {
    fs.rmdirSync(base)
  }
}

function copyFile(source, target, cb) {
  let cbCalled = false

  const rd = fs.createReadStream(source)
  rd.on("error", err => done (err))

  const wr = fs.createWriteStream(target)
  wr.on("error", err => done (err))
    .on("close", () => done (null))

  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

if(argv._[0] === 'copy' && argv.base !== undefined && argv.dir !== undefined) {
  readDir(argv.base, argv.dir)
} else if(argv._[0] === 'delete' && argv.base !== undefined) {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Are you sure you want to delete the file: ' + argv.base + ' ? Y||N: ', ans => {
    if(ans === 'Y' || ans === 'y') {
      readDir(argv.base)
      console.log('File deleted')
      rl.close()
    } else {
      rl.close()
    }
  } )
} else {
  console.log('Incorrect comand')
}
