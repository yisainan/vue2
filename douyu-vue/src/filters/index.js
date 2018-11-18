export function fixed(value) {
  if (value < 1) {
    return 0
  } else if (value >= 1e6) {
    return (value / 1e4).toFixed(0) + '万'
  } else if (value >= 1e4) {
    return ((value / 1e4).toFixed(1) + '万').replace('.0', '')
  } else {
    return value
  }
}
