export default function randomNumberBetween(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
}

