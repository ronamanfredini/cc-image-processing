const flatten = arr => Array.isArray(arr[0]) ? flatten(arr.reduce((acc, curr) => acc = [...acc, ...curr], [])) : arr;
const flattenV2 = arr => {
  const result = [];
  arr.forEach(line => line.forEach(pixelChunk => pixelChunk.forEach(pixelVal => result.push(pixelVal))));

  return result;
}

function separateMatrixIntoLines(matrix, imgWidth) {
  const result = [];
  for (let i = 0; i < matrix.length; i += imgWidth * 4) {
    result.push(matrix.slice(i, i + imgWidth * 4));
  }

  return result;
}

function separateChunkIntoPixels(matrix) {
  return matrix.map(line => {
    const newLine = [];
    for (let i = 0; i < line.length; i += 4) {
      const pixelChunk = [line[i], line[i + 1], line[1 + 2], line[i + 3]];
      newLine.push(pixelChunk);
    }

    return newLine;
  });
}

function prepareForConvolution(matrix) {
  
}
