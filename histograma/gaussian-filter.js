function gaussianFilter(matrix, width, filterSize) {
  const lineSeparated = separateMatrixIntoLines(matrix, width);
  const lineAndChunkSeparated = separateChunkIntoPixels(lineSeparated);
  const kernelSize = kernelMapping[filterSize.toString()];

  for (let i = 0; i< lineAndChunkSeparated.length; i++) {
    for (let j = 0; j < lineAndChunkSeparated[i].length; j++) {
      const bias = 4;

      lineAndChunkSeparated[i][j].forEach((pixelVal, idx) => {
        const newPixelValue = (1 / (2 * Math.PI * (bias * bias))) * Math.exp(-1 * (((i * i) + (j * j)) / (2 * (bias * bias))));
        lineAndChunkSeparated[i][j][idx] = newPixelValue;
      });


      //TODO ajustar Blue
      lineAndChunkSeparated[i][j][3] = 255;
    }
  }

  return flattenV2(lineAndChunkSeparated);  
}
