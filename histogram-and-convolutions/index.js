var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var imageData1;
var imageData2;
var result;

document.getElementById('arquivo1').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = () => showImage1(fr);
        fr.readAsDataURL(files[0]);
    }
}

document.getElementById('arquivo2').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = () => showImage2(fr);
        fr.readAsDataURL(files[0]);
    }
}

function showImage1(fileReader) {
    var img = document.getElementById("myImage1");
    img.src = fileReader.result;
}

function showImage2(fileReader) {
    var img = document.getElementById("myImage2");
    img.src = fileReader.result;
}

const adjustOverFlow = img => img.map(pixel => pixel > 255? pixel % 255: pixel);

function showImageResult(img) {
    const wrapper = document.createElement('div');
    const label = document.createElement('p');

    wrapper.appendChild(label);
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    const typedArray = new Uint8ClampedArray(img.length);

    for (let i = 0; i < img.length - 4; i+= 4) {
      typedArray[i] = img[i];
      typedArray[i+ 1] = img[i + 1];
      typedArray[i + 2] = img[i + 2];
      typedArray[i+ 3] = 255;
    }

    const imgData = new ImageData(typedArray, 512, 512);
    context.putImageData(imgData, 0, 0);

    wrapper.appendChild(canvas);
    document.getElementById('canvas-wrapper').appendChild(wrapper);
}

const adjustUnderFlow = img => img.map(pixel => pixel < 0? 0: pixel);

const operations = {
  add: sum,
  subt: subtract,
  mult: multiply,
  div: divide,
  media: mediaa,
  blend: blending,
  andd: and,
  orr: or,
  xorr: xor,
  nott1: not,
  nott2: not2,
  calcHistImg1Gray: calculateHistImg1Gray,
  calcHistImg1RGB: calculateHistImg1RGB,
  realImg1Min: (img1, img2) => realceImg1(img1, img2, 'min'),
  realImg1Max: (img1, img2) => realceImg1(img1, img2, 'max'),
  realImg1Media: (img1, img2) => realceImg1(img1, img2, 'media'),
  realImg1Mediana: (img1, img2) => realceImg1(img1, img2, 'max'),
}

async function sendImage(op) {
  const [archive1, archive2] = await Promise.all([
    getImageData('arquivo1', 'myImage1'),
    getImageData('arquivo2', 'myImage2')
  ]);

  const result = operations[op](archive1, archive2);
  showImageResult(result);
}

function getImageData(inputId, imgId) {
    return new Promise((resolve, reject) => {
      const input = document.getElementById(inputId);
      const img = document.getElementById(imgId)

      img.src = URL.createObjectURL(input.files[0]);
      console.log(input.files[0])
      const imgObj = new Image();

      setTimeout(() => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        const data = context.getImageData(0, 0, 512, 512)

        return resolve(data.data);
      }, 200);
    });
}

function multiply(firstMatriz, secondMatriz) {
    const result = [];
    for (let i = 0; i < firstMatriz.length; i++) {
      result[i] = firstMatriz[i] * secondMatriz[i];
    }

    var num = $("#mult").val();
    for (let j = 0; j < result.length; j++) {
        result[j] = result[j] * parseFloat(num);
    }

    return adjustOverFlow(result);
}

function blending(firstMatriz, secondMatriz) {
    const result = [];
    var num = $("#blend").val();
    for (let i = 0; i < firstMatriz.length; i++) {
      result[i] = parseFloat(num) * firstMatriz[i] + (1 - parseFloat(num)) * secondMatriz[i];
    }

    return adjustOverFlow(result);
}

function sum(firstMatriz, secondMatriz) {
    const result = [];
    for (let i = 0; i < firstMatriz.length; i++) {
      result[i] = firstMatriz[i] + secondMatriz[i];
    }

    return adjustOverFlow(result);
}

function subtract(firstMatriz, secondMatriz) {
    const result = [];
    for (let i = 0; i < firstMatriz.length; i++) {
      result[i] = firstMatriz[i] - secondMatriz[i];
    }

    return adjustUnderFlow(result);
}

function divide(firstMatriz, secondMatriz) {
    const result = [];
    for (let i = 0; i < firstMatriz.length; i++) {
      result[i] = firstMatriz[i] / secondMatriz[i];
    }

    var num = $("#div").val();

    for (let j = 0; j < result.length; j++) {
        result[j] = result[j] * parseFloat(num);
    }

    return adjustUnderFlow(result);
}

function mediaa(firstMatriz, secondMatriz) {
    const result = [];
    for (let i = 0; i < firstMatriz.length; i++) {
      result[i] = (firstMatriz[i] + secondMatriz[i]) / 2;
    }

    return adjustOverFlow(result);
}

function or(firstMatriz, secondMatriz) {
    const result = [];
    for (let i = 0; i < firstMatriz.length; i++) {
        result[i] = (firstMatriz[i] | secondMatriz[i]);
    }

    return adjustOverFlow(result);
}

function and(firstMatriz, secondMatriz) {
    const result = [];
    for (let i = 0; i < firstMatriz.length; i++) {
        result[i] = (firstMatriz[i] & secondMatriz[i]);
    }

    return adjustOverFlow(result);
}

function xor(firstMatriz, secondMatriz) {
    const result = [];
    for (let i = 0; i < firstMatriz.length; i++) {
        result[i] = (firstMatriz[i] ^ secondMatriz[i]);
    }

    return adjustOverFlow(result);
}

// realiza o NOT Img 1
function not(firstMatriz, secondMatriz) {
    const result = [];
    for (let i = 0; i < firstMatriz.length; i++) {
      result[i] = firstMatriz[i] != secondMatriz[i];
      result[i] = 255 - firstMatriz[i];
    }

    return adjustOverFlow(result);
}

function not2(firstMatriz, secondMatriz) {
    const result = [];
    for (let i = 0; i < firstMatriz.length; i++) {
      result[i] = firstMatriz[i] != secondMatriz[i];
      result[i] = 255 - secondMatriz[i];
    }

    return adjustOverFlow(result);
}

function calculateHistImg1RGB(firstMatriz, secondMatriz) {
    const resultR = [];
    const resultG = [];
    const resultB = [];

    var valueR = 0;
    var valueG = 0;
    var valueB = 0;

    const textsImageR = [];
    const textsImageG = [];
    const textsImageB = [];

    for (let i = 0; i < 256; i++) {
        resultR.push(0);
        textsImageR.push(i.toString());
    }

    for (let i = 0; i < 256; i++) {
        resultG.push(0);
        textsImageG.push(i.toString());
    }

    for (let i = 0; i < 256; i++) {
        resultB.push(0);
        textsImageB.push(i.toString());
    }

    for (let j = 0; j < firstMatriz.length; j += 4) {
        valueR = firstMatriz[j];
        resultR[valueR]++;
    }

    for (let j = 1; j < firstMatriz.length; j += 4) {
        valueG = firstMatriz[j];
        resultG[valueG]++;
    }

    for (let j = 2; j < firstMatriz.length; j += 4) {
        valueB = firstMatriz[j];
        resultB[valueB]++;
    }

    makeGraphic1RGB(resultR, textsImageR, resultG, textsImageG, resultB, textsImageB);

    const resultEqualizationRGB = equalization1RGB(firstMatriz, resultR, resultG, resultB);
    return resultEqualizationRGB;
}

function calculateHistImg1Gray(firstMatriz, secondMatriz) {
    const result1 = [];
    var value = 0;
    const textsImage1 = [];

    for (let i = 0; i < 256; i++) {
        result1.push(0);
        textsImage1.push(i.toString());
    }

    for (let j = 0; j < firstMatriz.length; j += 4) {
        value = firstMatriz[j];
        result1[value]++;
    }
    
    console.log(result1);

    makeGraphic1EscalaCinza(result1, textsImage1);

    const resultEqualization = equalization1EscalaCinza(firstMatriz, result1);
    return resultEqualization;
}

function equalization1RGB(firstMatriz, resultR, resultG, resultB) {
    let CFDR = [];
    let array_contadorR = resultR;
    CFDR[0] = array_contadorR[0];

    for (let i = 1; i < 256; i++) {
        CFDR.push(CFDR[i - 1] + array_contadorR[i]);
    }
  
    Array.min = function(array) {
        return Math.min.apply(Math, array);
    };
    let hr = [];
   
    for (let i = 0; i < CFDR.length; i++) {
        let ar = CFDR[i] - Array.min(CFDR);
        let br = (firstMatriz.length / 4) - Array.min(CFDR);
        let cr = 256 - 1;

        hr.push(Math.floor(ar / br * cr))
    }
 
    for (let i = 0; i < firstMatriz.length; i += 4) {
        firstMatriz[i] = hr[firstMatriz[i]];
        firstMatriz[i + 1] = firstMatriz[i];
        firstMatriz[i + 2] = firstMatriz[i];
    }

    let CFDG = [];
    let array_contadorG = resultG;
    CFDG[0] = array_contadorG[0];

    for (let i = 1; i < 256; i++) {
        CFDG.push(CFDG[i - 1] + array_contadorG[i]);
    }
  
    Array.min = function(array) {
        return Math.min.apply(Math, array);
    };
    let hg = [];
   
    for (let i = 1; i < CFDG.length; i++) {
        let ag = CFDG[i] - Array.min(CFDG);
        let bg = (firstMatriz.length / 4) - Array.min(CFDG);
        let cg = 256 - 1;

        hg.push(Math.floor(ag / bg * cg))
    }
 
    for (let i = 1; i < firstMatriz.length; i += 4) {
        firstMatriz[i] = hg[firstMatriz[i]];
        firstMatriz[i + 1] = firstMatriz[i];
        firstMatriz[i + 2] = firstMatriz[i];
    }

    let CFDB = [];
    let array_contadorB = resultB;
    CFDB[0] = array_contadorB[0];

    for (let i = 1; i < 256; i++) {
        CFDB.push(CFDB[i - 1] + array_contadorB[i]);
    }
  
    Array.min = function(array) {
        return Math.min.apply(Math, array);
    };
    let hb = [];
   
    for (let i = 2; i < CFDB.length; i++) {
        let ab = CFDB[i] - Array.min(CFDB);
        let bb = (firstMatriz.length / 4) - Array.min(CFDB);
        let cb = 256 - 1;

        hb.push(Math.floor(ab / bb * cb))
    }
 
    for (let i = 2; i < firstMatriz.length; i += 4) {
        firstMatriz[i] = hb[firstMatriz[i]];
        firstMatriz[i + 1] = firstMatriz[i];
        firstMatriz[i + 2] = firstMatriz[i];
    }
    
    return firstMatriz;
}

function equalization1EscalaCinza(firstMatriz, result1) {
    let CFD = [];

    let array_contador = result1;

    CFD[0] = array_contador[0];

    for (let i = 1; i < 256; i++) {
        CFD.push(CFD[i - 1] + array_contador[i]);
    }

    Array.min = function(array) {
        return Math.min.apply(Math, array);
    };

    let h = [];

    for (let i = 0; i < CFD.length; i++) {
        let a = CFD[i] - Array.min(CFD);
        let b = (firstMatriz.length / 4) - Array.min(CFD);
        let c = 256 - 1;

        h.push(Math.floor(a / b * c))
    }

    for (let i = 0; i < firstMatriz.length; i += 4) {
        firstMatriz[i] = h[firstMatriz[i]];

        firstMatriz[i + 1] = firstMatriz[i];
        firstMatriz[i + 2] = firstMatriz[i];
    }

    makeGraphic1EscalaCinzaEqualizated(firstMatriz)

    return firstMatriz;
}

function makeGraphic1EscalaCinzaEqualizated(firstMatriz) {
    const result1 = [];
    var value = 0;
    const textsImage1 = [];

    for (let i = 0; i < 256; i++) {
        result1.push(0);
        textsImage1.push(i.toString());
    }

    for (let j = 0; j < firstMatriz.length; j += 4) {
        value = firstMatriz[j];

        result1[value]++;
    }

    const config = {
        type: 'bar',
        data: data = {
            labels: textsImage1,
            datasets: [{
              label: 'Quantidade de pixeis',
              data: result1,
              backgroundColor: [
                'rgb(156, 70, 71)',
              ],
              borderColor: [
                'rgb(156, 70, 71)',
              ],
              borderWidth: 1
            }]
          },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        },
      };
    image1 = new Chart(
        document.getElementById('grafico-histogramaEq'),
        config
    );
    $(".title-hist1Eq").text('Histograma Imagem 1 - Escala de Cinza Equalizado');
}

function makeGraphic1EscalaCinza(result, labels) {
    console.log(labels);
    console.log(result);

    const config = {
        type: 'bar',
        data: data = {
            labels: labels,
            datasets: [{
              label: 'Quantidade de pixeis',
              data: result,
              backgroundColor: [
                'rgb(156, 70, 71)',
              ],
              borderColor: [
                'rgb(156, 70, 71)',
              ],
              borderWidth: 1
            }]
          },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        },
      };
    image1 = new Chart(
        document.getElementById('grafico-histograma1'),
        config
    );
    $(".title-hist1").text('Histograma Imagem 1 - Escala de Cinza');
}

function makeGraphic1RGB(resultR, textsImageR, resultG, textsImageG, resultB, textsImageB) {
    const configR = {
        type: 'bar',
        data: data = {
            labels: textsImageR,
            datasets: [{
              label: 'Quantidade de pixeis',
              data: resultR,
              backgroundColor: [
                'rgb(156, 70, 71)',
              ],
              borderColor: [
                'rgb(156, 70, 71)',
              ],
              borderWidth: 1
            }]
          },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        },
      };
    image1 = new Chart(
        document.getElementById('grafico-histogramaR'),
        configR
    );
    $(".title-hist1R").text('Histograma Imagem 1 - R');

    const configG = {
        type: 'bar',
        data: data = {
            labels: textsImageG,
            datasets: [{
              label: 'Quantidade de pixeis',
              data: resultG,
              backgroundColor: [
                'rgb(156, 70, 71)',
              ],
              borderColor: [
                'rgb(156, 70, 71)',
              ],
              borderWidth: 1
            }]
          },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        },
      };
    image1 = new Chart(
        document.getElementById('grafico-histogramaG'),
        configG
    );
    $(".title-hist1G").text('Histograma Imagem 1 - G');

    const configB = {
        type: 'bar',
        data: data = {
            labels: textsImageB,
            datasets: [{
              label: 'Quantidade de pixeis',
              data: resultB,
              backgroundColor: [
                'rgb(156, 70, 71)',
              ],
              borderColor: [
                'rgb(156, 70, 71)',
              ],
              borderWidth: 1
            }]
          },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        },
      };
    image1 = new Chart(
        document.getElementById('grafico-histogramaB'),
        configB
    );
    $(".title-hist1B").text('Histograma Imagem 1 - B');
}


function realceImg1(firstMatriz, secondMatriz, realceOperation) {
    console.log(firstMatriz.length);

    var pixels = firstMatriz.length / 4;
    var coluna = Math.sqrt(pixels, 2) * 4;
    var qtdLinhas = Math.sqrt(pixels, 2);

    var arrayFora = [];
    var linhas = [];

    for (let i = 0; i < firstMatriz.length; i++) {
        linhas.push(firstMatriz[i]);
        if(linhas.length == coluna) {
            arrayFora.push(linhas);
            linhas = [];
        }
    }

    var k = coluna + 4;

    for(let x = 1; x < qtdLinhas - 1; x++) {
        for(let y = 4; y < arrayFora[0].length - 4; y += 4) {
            let noroeste_x = x - 1;
            let noroeste_y = y - 4;

            let norte_x = x;
            let norte_y = y - 4;

            let nordeste_x = x + 1;
            let nordeste_y = y - 4;

            let oeste_x = x - 1;
            let oeste_y = y;

            let sudoeste_x = x - 1;
            let sudoeste_y = y + 4;

            let sul_x = x;
            let sul_y = y + 4;

            let sudeste_x = x + 1;
            let sudeste_y = y + 4;

            let leste_x = x + 1;
            let leste_y = y;

            var noroeste = arrayFora[noroeste_x][noroeste_y];
            var norte = arrayFora[norte_x][norte_y];
            var nordeste = arrayFora[nordeste_x][nordeste_y];
            var oeste = arrayFora[oeste_x][oeste_y];
            var sudoeste = arrayFora[sudoeste_x][sudoeste_y];
            var sul = arrayFora[sul_x][sul_y];
            var sudeste = arrayFora[sudeste_x][sudeste_y];
            var leste = arrayFora[leste_x][leste_y];
            var centro = arrayFora[x][y];

            var coordenadas = [noroeste * 1, norte * 1, nordeste * 1, oeste * 1, sudoeste * 1, sul * 1, sudeste * 1, leste * 1, centro * 1];

            // Se for 'MIN', realiza o mínimo
            if (realceOperation == 'min') {
                var convolucao = Math.min(...coordenadas);
            }

            // Se for 'MAX', realiza o máximo
            if(realceOperation == 'max') {
                var convolucao = Math.max(...coordenadas);
            }

            // Se for 'Media', realiza a media
            if (realceOperation == 'media') {
                let unitMax = 0;

                for (let index = 0; index < coordenadas.length; index++) {
                    unitMax += coordenadas[index];
                }

                unitMax = unitMax / coordenadas.length;
                var convolucao = unitMax;
            }

            // Se for 'Mediana', realiza a mediana
            if (realceOperation == 'mediana') {
                coordenadas.sort((a, b) => b - a);
                var convolucao = coordenadas[4];
            }

            // Preenche a matriz principal com os valores R
            firstMatriz[k] = convolucao;

            // Se estiver na última coluna, igona a última coluna e primeira linha
            if (y == arrayFora[0].length - 8) {
                k  += 12;
            } else {
                k += 4;
            }
        }
    }

    k = coluna + 5;

    // G
    for(let x = 1; x < qtdLinhas - 1; x++) {
        for(let y = 5; y < arrayFora[0].length - 4; y += 4) {
            // x sempre + 1 e - 1 e y sempre + 4 e - 4
            let noroeste_x = x - 1;
            let noroeste_y = y - 4;

            let norte_x = x;
            let norte_y = y - 4;

            let nordeste_x = x + 1;
            let nordeste_y = y - 4;

            let oeste_x = x - 1;
            let oeste_y = y;

            let sudoeste_x = x - 1;
            let sudoeste_y = y + 4;

            let sul_x = x;
            let sul_y = y + 4;

            let sudeste_x = x + 1;
            let sudeste_y = y + 4;

            let leste_x = x + 1;
            let leste_y = y;

            // Pega coordenadas dos pontos ao redor do pixel alvo
            var noroeste = arrayFora[noroeste_x][noroeste_y];
            var norte = arrayFora[norte_x][norte_y];
            var nordeste = arrayFora[nordeste_x][nordeste_y];
            var oeste = arrayFora[oeste_x][oeste_y];
            var sudoeste = arrayFora[sudoeste_x][sudoeste_y];
            var sul = arrayFora[sul_x][sul_y];
            var sudeste = arrayFora[sudeste_x][sudeste_y];
            var leste = arrayFora[leste_x][leste_y];
            var centro = arrayFora[x][y];

            // A FAZER - CRIAR ARRAY DE 9 POSIÇÕES COM OS VALORES A SEREM MULTIPLICADOS NO ARRAY 'coordenadas'
            var coordenadas = [noroeste * 1, norte * 1, nordeste * 1, oeste * 1, sudoeste * 1, sul * 1, sudeste * 1, leste * 1, centro * 1];
            
            if (realceOperation == 'min') {
                var convolucao = Math.min(...coordenadas);
            } 

            if(realceOperation == 'max') {
                var convolucao = Math.max(...coordenadas);
            }
            
            if (realceOperation == 'media') {
                let unitMax = 0;

                for (let index = 0; index < coordenadas.length; index++) {
                    unitMax += coordenadas[index];
                }

                unitMax = unitMax / coordenadas.length;
                var convolucao = unitMax;
            }

            // Se for 'Mediana', realiza a mediana
            if (realceOperation == 'mediana') {
                coordenadas.sort((a, b) => b - a);
                var convolucao = coordenadas[5];
            }

            // Preenche a matriz principal com os valores G
            firstMatriz[k] = convolucao;

            // Se estiver na última coluna, igona a última coluna e primeira linha
            if (y == arrayFora[0].length - 7) {
                k  += 12;
            } else {
                k += 4;
            }

        }
    }

    k = coluna + 6

    // B
    for(let x = 1; x < qtdLinhas - 1; x++) {
        for(let y = 6; y < arrayFora[0].length - 4; y += 4) {
            // x sempre + 1 e - 1 e y sempre + 4 e - 4
            let noroeste_x = x - 1;
            let noroeste_y = y - 4;

            let norte_x = x;
            let norte_y = y - 4;

            let nordeste_x = x + 1;
            let nordeste_y = y - 4;

            let oeste_x = x - 1;
            let oeste_y = y;

            let sudoeste_x = x - 1;
            let sudoeste_y = y + 4;

            let sul_x = x;
            let sul_y = y + 4;

            let sudeste_x = x + 1;
            let sudeste_y = y + 4;

            let leste_x = x + 1;
            let leste_y = y;

            // Pega coordenadas dos pontos ao redor do pixel alvo
            var noroeste = arrayFora[noroeste_x][noroeste_y];
            var norte = arrayFora[norte_x][norte_y];
            var nordeste = arrayFora[nordeste_x][nordeste_y];
            var oeste = arrayFora[oeste_x][oeste_y];
            var sudoeste = arrayFora[sudoeste_x][sudoeste_y];
            var sul = arrayFora[sul_x][sul_y];
            var sudeste = arrayFora[sudeste_x][sudeste_y];
            var leste = arrayFora[leste_x][leste_y];
            var centro = arrayFora[x][y];

            // A FAZER - CRIAR ARRAY DE 9 POSIÇÕES COM OS VALORES A SEREM MULTIPLICADOS NO ARRAY 'coordenadas'
            var coordenadas = [noroeste * 1, norte * 1, nordeste * 1, oeste * 1, sudoeste * 1, sul * 1, sudeste * 1, leste * 1, centro * 1];
            
            if (realceOperation == 'min') {
                var convolucao = Math.min(...coordenadas);
            } 
            
            if(realceOperation == 'max') {
                var convolucao = Math.max(...coordenadas);
            }
            
            if (realceOperation == 'media') {
                let unitMax = 0;

                for (let index = 0; index < coordenadas.length; index++) {
                    unitMax += coordenadas[index];
                }

                unitMax = unitMax / coordenadas.length;
                var convolucao = unitMax;
            }

            // Se for 'Mediana', realiza a mediana
            if (realceOperation == 'mediana') {
                coordenadas.sort((a, b) => b - a);
                var convolucao = coordenadas[5];
            }

            // Preenche a matriz principal com os valores B
            firstMatriz[k] = convolucao;

            // Se estiver na última coluna, igona a última coluna e primeira linha
            if (y == arrayFora[0].length - 6) {
                k  += 12;
            } else {
                k += 4;
            }
        }
    }

    return firstMatriz
}