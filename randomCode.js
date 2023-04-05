function randomCode() {
  // 隨機產生 5 碼英數組合
  const word = 'abcdefghijklmnopqrstuvwxyz'
  const num = '0123456789'
  const wordArr = Array.from(word)
  const numArr = Array.from(num)
  const bigArr = numArr.concat(wordArr)

  let randomArr = []
  let randomIndex = Math.floor(Math.random() * 36)
  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * 36)
    randomArr += bigArr[randomIndex]
  }
  return randomArr
}

module.exports = randomCode