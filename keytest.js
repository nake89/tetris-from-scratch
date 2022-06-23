console.log('1')
var stdin = process.stdin
console.log('2')
stdin.setRawMode(true)
console.log('3')
stdin.resume()
console.log('4')
stdin.setEncoding('utf8')
console.log('5')

stdin.on('data', function (key) {
  console.log('6')
  if (key == '\u001B\u005B\u0041') {
    process.stdout.write('up')
  }
  if (key == '\u001B\u005B\u0043') {
    process.stdout.write('right')
  }
  if (key == '\u001B\u005B\u0042') {
    process.stdout.write('down')
  }
  if (key == '\u001B\u005B\u0044') {
    process.stdout.write('left')
  }

  if (key == '\u0003') {
    process.exit()
  } // ctrl-c
})
console.log('7')
