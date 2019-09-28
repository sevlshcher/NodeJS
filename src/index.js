const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv
const {promisify} = require('util')
const readdir = promisify(fs.readdir)
const lstat =promisify(fs.lstat)
const mkdir = promisify(fs.mkdir)
const copyFile = promisify(fs.copyFile)
const unlink = promisify(fs.unlink)
const rmdir = promisify(fs.rmdir)

const newFile = __dirname + `/${argv.dir}`

const readDir = async function readDir(base) {
  try {
    const files = await readdir(base, {withFileTypes: true})
    await Promise.all(files.map( async item => {
      try {
        let localBase = path.join(base, item.name)
        let firstLet = item.name[0]
        let stat = await lstat(localBase)
        stat.isFile() ? (
          await mkdir(path.join(newFile, firstLet), { recursive: true }),
          await copyFile(localBase, path.join(newFile, firstLet, item.name)),
          argv._[0] === 'delete' ? await unlink(localBase) : null
          ) : await readDir(localBase)
      } catch(err) {
        console.error(err)
      }
    }))
    argv._[0] === 'delete' ? await rmdir(base) : null
  } catch(err) {
    console.error(err)
  }
}

if(argv.base !== undefined && argv.dir !== undefined && (argv._[0] === undefined || argv._[0] === 'delete')) {
  readDir(argv.base, argv.dir)
} else {
  console.log('Incorrect comand')
}