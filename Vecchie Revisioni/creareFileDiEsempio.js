const fs = require('fs');
const path = require('path');

function createExampleFiles(directory, numFiles) {
    //creazione file esempio .txt
    for (let i = 1; i <= numFiles; i++) {
        const txtFilename = `example${i}.txt`;//Regole per dare il nome al file
        const txtFilePath = path.join(directory, txtFilename);//concatenare il percorso passato dall'utente insieme al nome del file
        const txtContent = `Contenuto del file di esempio ${i}.`;//contenuto che verrà inserito nel file
        
        fs.writeFileSync(txtFilePath, txtContent, 'utf-8');//funzione che crea il file nel percorso indicato
        console.log(`Creato file: ${txtFilePath}`);
    }

    //creazione file esempio .js
    for (let i = 1; i <= numFiles; i++) {
        const jsFilename = `example${i}.js`;
        const jsFilePath = path.join(directory, jsFilename);
        const jsContent = `Contenuto del file di esempio ${i}.`;
        
        fs.writeFileSync(jsFilePath, jsContent, 'utf-8');
        console.log(`Creato file: ${jsFilePath}`);
    }

}

// Esempio di chiamata alla funzione per creare 5 file di esempio/prova
// Inserire percorso completo di dove si vuole creare i file di esempio/prova
const directoryPath = '/Users/macpro/Documents/ScriptEsercitazione/directory';
createExampleFiles(directoryPath, 5);