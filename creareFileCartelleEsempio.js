const fs = require('fs');
const path = require('path');

//Funzione che mi genera x numero di cartelle con dentro x numero di file
function createExampleFiles(directory, numFolders, numFilesForFolder) {
  //Prima parte della funzione che gestisce la creazione delle cartelle (eseguo un ciclo for unico che ad ogni giro crea una cartella con dentro i file specifici)
  for (let folderIndex = 1; folderIndex <= numFolders; folderIndex++) {//let è una variabile che può essere chiamata solo dentro al blocco in cui è stata dichiarata
    const folderName = `folder${folderIndex}`;//Attribuisce a folderName in nome della cartella concatenando la parola folder con il valore di folderIndex che aumenta ad ogni cilo
    const folderPath = path.join(directory, folderName);//Per avere il percorso completo della cartella uso path.join per concatenare il percorso passato dal utente presente in directory, con il folderName precedentemente creato

    // Seconda parte del ciclo for dove controlla che la cartella no sia già esistente e se non è presente la crea
    if (!fs.existsSync(folderPath)) { //controlla se la da creare esiste, di norma se il percorso o il file esiste restituisce true e se non esiste false ma aggiungendo lal negazione con ! inverte i risultati, di conseguenza se non trova la cartella specificata rilascia true
      fs.mkdirSync(folderPath);//Se il risultato precedente restituisce true allora con mkdir crea la cartella con il percorso specifico (con Sync specifichiamo che il programma non puo avanzare al blocco successivo fin che non è stato completato il blocco in corso)
      console.log(`Creata cartella: ${folderPath}`);//Conferma della creazione della cartella

      //Terza parte del ciclo for dove va a sua volta a compiere un ciclo di creazione di file fin che non raggiunge il numero di file inserito dall'utente
      for (let fileIndex = 1; fileIndex <= numFilesForFolder; fileIndex++) {
        const txtFilename = `example${fileIndex}.txt`;//Attribuisce a questa variabile il nome del file (file txt sopra e file js sotto) concatenando example con il valore fileIndex che aumenta ad ogni ciclo
        const jsFilename = `example${fileIndex}.js`;

        const txtFilePath = path.join(folderPath, txtFilename);//Attribuisce a questa variabile il percorso del file (file txt sopra e file js sotto) concatenando folder path precedentemente dichiarato con il nome del file dhichiarato dentro txtFilename per i txt e dentro jsFilename per i js
        const jsFilePath = path.join(folderPath, jsFilename);

        //Qui sto dichiarando il contenuto dei file che andrò a creare concatenado il valore del fileIndex incrementale dentro il testo
        const txtContent = `Contenuto del file di esempio ${fileIndex}:\n Nel mezzo del cammin di nostra vita\n mi ritrovai per una selva oscura \n ché la diritta via era smarrita.`;
        const jsContent = `Contenuto del file di esempio ${fileIndex}:\n Nel mezzo del cammin di nostra vita\n mi ritrovai per una selva oscura \n ché la diritta via era smarrita.`;

        //con write sto dicendo che al percorso specificato in txtFilePath (e jsFilePath) deve inserirmi quanto dichiarato in txtContent (e jscontent) seguendo l'encoding utf-8
        fs.writeFileSync(txtFilePath, txtContent, 'utf-8');
        fs.writeFileSync(jsFilePath, jsContent, 'utf-8');

        console.log(`Creato file: ${txtFilePath}`);//Conferma della creazione dei file
        console.log(`Creato file: ${jsFilePath}`);
      }
    } else {
      console.log(`La cartella ${folderPath} esiste già.`);//se alla riga 12 il risultato è false allora esegue questo blocco
    }
  }
}

// Passo il percorso dove al suo interno mi andrà a creare x num di cartelle con dentro x numero di file txt e js
const directoryPath = '/Users/macpro/Documents/ScriptEsercitazione/directory';
createExampleFiles(directoryPath, 5, 10); //Primo paremetro Percorso Secondo parametro numero di Cartelle da creare e Terzo paramentro numero di file da creare dentro ogni cartella