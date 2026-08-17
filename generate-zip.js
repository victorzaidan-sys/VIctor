import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const zip = new JSZip();
const sourceDir = './ControleUniversalTV';
const outputZipPath = './ControleUniversalTV-release.zip';

function addFolderToZip(zipInstance, localFolderPath, zipFolderPath) {
  const files = fs.readdirSync(localFolderPath);

  for (const file of files) {
    const fullPath = path.join(localFolderPath, file);
    const zipPath = path.join(zipFolderPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const folderZip = zipInstance.folder(file);
      addFolderToZip(folderZip, fullPath, '');
    } else {
      const fileData = fs.readFileSync(fullPath);
      zipInstance.file(file, fileData);
    }
  }
}

console.log('Criando pacote ZIP ControleUniversalTV-release.zip...');
const rootFolder = zip.folder('ControleUniversalTV-release');
addFolderToZip(rootFolder, sourceDir, '');

zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
  .pipe(fs.createWriteStream(outputZipPath))
  .on('finish', () => {
    console.log('Sucesso! Arquivo ControleUniversalTV-release.zip gerado com sucesso.');
    const stats = fs.statSync(outputZipPath);
    console.log(`Tamanho do arquivo: ${(stats.size / 1024).toFixed(2)} KB`);
  });
