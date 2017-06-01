import _ from 'lodash'

export const convertIntegerToBinary = (number) => {
  const result = []
  console.log(`\nConverting Integer ${number} to binary`)
  while (number !== 0) {
    console.log(`\n${number} % 2 = ${number % 2}`)
    console.log(`${number} / 2 = ${number / 2 | 0}`)
    result.push(number % 2)
    number = number / 2 | 0
  }
  const answer = _.reverse(result).join('')
  console.log(`\n[Answer = ${answer}]`)
  return  answer;
}
export const convertIntegerToBinarySteps = (number) => {
  const steps = []
  while (number !== 0) {
    steps.push(`\n${number} % 2 = ${number % 2} \n${number} / 2 = ${number / 2 | 0}`)
    number = number / 2 | 0
  }
  return  steps;
}

export const convertFloatToBinary = (number) => {
  const result = []
  console.log(`\nConverting Float ${number} to binary`)
  while (!_.has(result, number) && number % 1 !== parseFloat(0)) {
    console.log(`\n${number} * 2 = ${number * 2}`)
    number *= 2
    console.log(`${number | 0}`)
    result.push(number | 0 === 1 ? 1 : 0)
    number %= 1
    if (result.length > 10) break
  }
  const answer = `0.${result.join('')}`
  console.log(`\n[Answer = ${answer}]`)
  return answer
}

export const converter = (number) => {
  const intPart = number | 0
  const floatPart = number % 1
  const resultIntPart = convertIntegerToBinary(intPart)
  const resultFloatPart = convertFloatToBinary(floatPart).split('.').pop()
  const result = `${resultIntPart}.${resultFloatPart}`
  console.log(`======== binary of ${number} is ${result} ========`)
  return result
}