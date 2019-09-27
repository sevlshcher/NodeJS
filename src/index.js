const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv
const rimraf = require('rimraf')

const newFile = __dirname + `/${argv.dir}`

const readDir = (base) => {
  const files = fs.readdirSync(base)

  files.forEach(item => {
    let localBase = path.join(base, item)
    let state = fs.statSync(localBase)
    if (state.isFile()) {
      let firstLet = item[0]
      fs.mkdirSync(path.join(newFile, firstLet), { recursive: true })
      copyFile(localBase, path.join(newFile, firstLet, item), () => {
        console.log(`copy file: ${item}`)
      })
    } else {
      readDir(localBase)
    }
  })
  if(argv._[0] === 'delete') {
    rimraf(base, () => {
      console.log(`delete folder: ${base}`)
    })
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

if(argv.base !== undefined && argv.dir !== undefined && (argv._[0] === undefined || argv._[0] === 'delete')) {
  readDir(argv.base, argv.dir)
} else {
  console.log('Incorrect comand')
}
