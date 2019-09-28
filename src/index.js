const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv

const newFile = __dirname + `/${argv.dir}`

const readDir = (base) => {
  const files = fs.readdirSync(base)
  files.forEach(item => {
    let localBase = path.join(base, item)
    let firstLet = item[0]
    let state = fs.statSync(localBase)
    state.isFile() ? (
      fs.mkdirSync(path.join(newFile, firstLet), { recursive: true }),
      fs.copyFileSync(localBase, path.join(newFile, firstLet, item)),
      argv._[0] === 'delete' ? fs.unlinkSync(localBase) : null
    ) : readDir(localBase)
  })
  argv._[0] === 'delete' ? fs.rmdirSync(base) : null
}

if(argv.base !== undefined && argv.dir !== undefined && (argv._[0] === undefined || argv._[0] === 'delete')) {
  readDir(argv.base, argv.dir)
} else {
  console.log('Incorrect comand')
}
