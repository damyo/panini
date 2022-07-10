module.exports = function (text) {
  return text.toString()
  .replace(/[\u1100-\u11ff\u3130-\u318f\u3200-\u321e\u3260-\u327f\uffa0-\uffdc\uffe6]+/g, substr => substr.normalize('NFKC'))
  .toLowerCase()
  .trim()
  .replace(/\s+/g, '-')
  .replace(/[^\w\-가-힣]+/g, '')
  .replace(/\-\-+/g, '-')
}
