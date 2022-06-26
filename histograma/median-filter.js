function medianFilter(matrix, width, filterSize=3) {
  const lineSeparated = separateMatrixIntoLines(matrix, width);
  const lineAndChunkSeparated = separateChunkIntoPixels(lineSeparated);
  const kernelSize = kernelMapping[filterSize.toString()];

  for (let i = 0; i< lineAndChunkSeparated.length; i++) {
    for (let j = 0; j < lineAndChunkSeparated[i].length; j++) {
      let median = [[], [], [], []];

      for (let l = i - kernelSize; l < i + kernelSize; l++) {
        for (let m = j - kernelSize; m <= j + kernelSize; m++) {
          if (lineAndChunkSeparated[l] && lineAndChunkSeparated[l][m]) {
            lineAndChunkSeparated[l][m].forEach((pixelVal, idx) => {
              median[idx].push(pixelVal);
            });
          }
        }
      }

      median.forEach(arr => arr.sort());
      lineAndChunkSeparated[i][j][0] = median[0][Math.floor(median[0].length / 2)];
      lineAndChunkSeparated[i][j][1] = median[1][Math.floor(median[1].length / 2)];
      //TODO ajustar Blue
      lineAndChunkSeparated[i][j][2] = lineAndChunkSeparated[i][j][1];
      lineAndChunkSeparated[i][j][3] = 255;
    }
  }

  return flattenV2(lineAndChunkSeparated);  
}

