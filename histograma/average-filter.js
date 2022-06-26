const kernelMapping = {
  '3': 1,
  '5': 2,
  '7': 3
}

function averageFilter(matrix, width, filterSize = 3) {
  const lineSeparated = separateMatrixIntoLines(matrix, width);
  const lineAndChunkSeparated = separateChunkIntoPixels(lineSeparated);
  const kernelSize = kernelMapping[filterSize.toString()];
  // const averageBias = 1 / (filterSize * filterSize);

  for (let i = 0; i< lineAndChunkSeparated.length; i++) {
    for (let j = 0; j < lineAndChunkSeparated[i].length; j++) {
      let totalPixelCount = 0;
      let totalPixelSum = [0, 0, 0, 0];

      for (let l = i - kernelSize; l < i + kernelSize; l++) {
        for (let m = j - kernelSize; m <= j + kernelSize; m++) {
          if (lineAndChunkSeparated[l] && lineAndChunkSeparated[l][m]) {
            totalPixelCount++;
            totalPixelSum[0] += lineAndChunkSeparated[l][m][0];
            totalPixelSum[1] += lineAndChunkSeparated[l][m][1];
            totalPixelSum[2] += lineAndChunkSeparated[l][m][2];
          }
        }
      }

      lineAndChunkSeparated[i][j][0] = totalPixelSum[0] / totalPixelCount;
      lineAndChunkSeparated[i][j][1] = totalPixelSum[1] / totalPixelCount;
      // TODO ajustar Blue
      lineAndChunkSeparated[i][j][2] = lineAndChunkSeparated[i][j][1];
      lineAndChunkSeparated[i][j][3] = 255;
    }
  }

  return flattenV2(lineAndChunkSeparated);
}
