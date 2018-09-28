

function firstCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function humanReadable(s) {
  const words = s.split(/-|_/g);
  const readable = words.map(word => {
    return firstCap(word);
  })
  return readable.join(' ');
}

export default humanReadable;
