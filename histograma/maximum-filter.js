function maximumFilter(matrix, width, filterSize) {
  const lineSeparated = separateMatrixIntoLines(matrix, width);
  const lineAndChunkSeparated = separateChunkIntoPixels(lineSeparated);
  const kernelSize = kernelMapping[filterSize.toString()];

  for (let i = 0; i< lineAndChunkSeparated.length; i++) {
    for (let j = 0; j < lineAndChunkSeparated[i].length; j++) {
      let maximumValue = [0, 0, 0, 0];

      for (let l = i - kernelSize; l < i + kernelSize; l++) {
        for (let m = j - kernelSize; m <= j + kernelSize; m++) {
          if (lineAndChunkSeparated[l] && lineAndChunkSeparated[l][m]) {
            lineAndChunkSeparated[l][m].forEach((pixelVal, idx) => {
              if (maximumValue[idx] < pixelVal) {
                maximumValue[idx] = pixelVal;
              }
            })
          }
        }
      }

      lineAndChunkSeparated[i][j][0] = maximumValue[0];
      lineAndChunkSeparated[i][j][1] = maximumValue[1];
      //TODO ajustar Blue
      lineAndChunkSeparated[i][j][2] = maximumValue[1];
      lineAndChunkSeparated[i][j][3] = 255;
    }
  }

  return flattenV2(lineAndChunkSeparated);  
}
