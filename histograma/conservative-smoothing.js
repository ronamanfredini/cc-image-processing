function conservativeSmoothing(matrix, width, filterSize) {
  const lineSeparated = separateMatrixIntoLines(matrix, width);
  const lineAndChunkSeparated = separateChunkIntoPixels(lineSeparated);
  const kernelSize = kernelMapping[filterSize.toString()];

  for (let i = 0; i< lineAndChunkSeparated.length; i++) {
    for (let j = 0; j < lineAndChunkSeparated[i].length; j++) {
      let maximumValue = [0, 0, 0, 0];
      let minimumValue = [256, 256, 256, 256];

      for (let l = i - kernelSize; l < i + kernelSize; l++) {
        for (let m = j - kernelSize; m <= j + kernelSize; m++) {
          if (lineAndChunkSeparated[l] && lineAndChunkSeparated[l][m] && !(i === l && j === m)) {
            lineAndChunkSeparated[l][m].forEach((pixelVal, idx) => {
              if (maximumValue[idx] < pixelVal) {
                maximumValue[idx] = pixelVal;
              }

              if (minimumValue[idx] > pixelVal) {
                minimumValue[idx] = pixelVal;
              }
            });
          }
        }
      }

      lineAndChunkSeparated[i][j].forEach((pixelVal, idx) => {
        if (pixelVal > maximumValue[idx]) {
          lineAndChunkSeparated[i][j][idx] = maximumValue[idx];    
        }

        if (pixelVal < minimumValue[idx]) {
          lineAndChunkSeparated[i][j][idx] = minimumValue[idx];    
        }
      });


      //TODO ajustar Blue
      lineAndChunkSeparated[i][j][2] = lineAndChunkSeparated[i][j][1];
      lineAndChunkSeparated[i][j][3] = 255;
    }
  }

  return flattenV2(lineAndChunkSeparated);  
}
