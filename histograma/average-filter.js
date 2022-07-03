const kernelMapping = {
  '3': 1,
  '5': 2,
  '7': 3
}

function averageFilter(matrix, width, filterSize = 3) {
  const lineSeparated = separateMatrixIntoLines(matrix, width);
  const lineAndChunkSeparated = separateChunkIntoPixels(lineSeparated);
  const kernelSize = (filterSize - 1) / 2;
  const totalPixelCount = filterSize * filterSize;

  for (let i = kernelSize; i < lineAndChunkSeparated.length - kernelSize; i++) {
    for (let j = kernelSize; j < lineAndChunkSeparated[i].length - kernelSize; j++) {
      let totalPixelSum = [0, 0, 0, 0];

      for (let l = i - kernelSize; l <= i + kernelSize; l++) {
        for (let m = j - kernelSize; m <= j + kernelSize; m++) {
          totalPixelSum[0] += lineAndChunkSeparated[l][m][0];
          totalPixelSum[1] += lineAndChunkSeparated[l][m][1];
          totalPixelSum[2] += lineAndChunkSeparated[l][m][2];
        }
      }

      lineAndChunkSeparated[i][j][0] = totalPixelSum[0] / totalPixelCount;
      lineAndChunkSeparated[i][j][1] = totalPixelSum[1] / totalPixelCount;
      lineAndChunkSeparated[i][j][2] = totalPixelSum[2] / totalPixelCount;
      lineAndChunkSeparated[i][j][3] = 255;
    }
  }

  return flattenV2(lineAndChunkSeparated);
}
