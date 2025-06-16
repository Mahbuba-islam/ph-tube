function getTime(time){
  const hour = parseInt(time/3600)
  let remainingSecond = parseInt(time%3600)
  const minute = parseInt(remainingSecond/60)
  remainingSecond = parseInt(remainingSecond%60)
  return `${hour} hour ${minute} minute ${remainingSecond } second`
}

console.log(getTime(7889))

// get time
function getTimeString(time){
const day = parseInt(time/86400)
let remainingSecond = parseInt(time%86400)
const hour = parseInt(remainingSecond/3600)
remainingSecond = parseInt(remainingSecond%3600)
const minute = parseInt(remainingSecond/60)
remainingSecond = parseInt(remainingSecond%60)
return `${day} day ${hour} hour ${minute} minute ${remainingSecond} second ago`
}
console.log(getTimeString(89900))
