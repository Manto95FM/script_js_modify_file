const fs = require('fs');
const path = require('path');

//Funzione che genera casualmente un carattere

function getRandomCharacter() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    const randomIndex = Math.floor(Math.random() * characters.length); //Serve per dare un numero casuale intero 
    return characters.charAt(randomIndex); //Restituisce il carattere corrispondente al numero generato in randomIndex
  }

  function getRandomPercentage() {
    return Math.random() * 100;
  }
 
  //?-----------------------------------------------------------------------------------------------------------
  //Funzione che va a processare il file per renderlo modificabile secondo i nostri criteri
  function processFile(filePath, percLines, percChars) {
    const content = fs.readFileSync(filePath, 'utf-8').split('\n'); //Legge il mio file (passato tramite il percorso filePath) analizzandolo come stringa e lo divide in array (tramite .split)
  
    const totalLines = content.length; //Conta il numero di elementi dentro la variabile content
    const linesToDelete = Math.floor((percLines / 100) * totalLines); //Decite quante righe eliminare prendendo la percentuale dividendola per 100 e moltiplicandola per il totale delle linee
  
    //Ciclo for che serve per eliminare in maniera casuale un numero di linee fino a quando non si raggiunge il valore di linesToDelete
    for (let i = 0; i < linesToDelete; i++) {
      const randomIndex = Math.floor(Math.random() * content.length);//Rilascia un numero casuale contenuto nella lunghezza di contenet intero arrotondato
      content.splice(randomIndex, 1);//Tramite il metodo .splice andiamo a cancellare la righa che ci passa randomIndex
    }
  
    const originalContent = content.join('\n');//Prende il contenuto di content e lo riunisce con le linee rimanenti
  
    const characters = originalContent.split('');//Prende il nuovo contenuto del file e splitta ogni singolo carattere in un array
    const charactersToReplace = Math.floor((percChars / 100) * characters.length);//Calcola quanti caratteri andare a sostituire facendo una formula matematica
  
    //Utilizzando il ciclo for andiamo a ciclare tutti i caratteri
    for (let i = 0; i < charactersToReplace; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);//Con randomIndexn troviamo un numero casuale che sarà la posizione del carattere che andiamo a sostituire
      characters[randomIndex] = getRandomCharacter();//Chiamiamo la funzione che da un carattere casuale
    }
  
    const modifiedContent = characters.join('');//Riuniamo il nostro array con i caratteri modificati
    fs.writeFileSync(filePath, modifiedContent, 'utf-8');//Andiamo a scrivere le modifiche sul file
  }
 //?-----------------------------------------------------------------------------------------------------------

 
   //?-----------------------------------------------------------------------------------------------------------

  function processDirectory(directory, exts, percLines, percChars) {
    const files = fs.readdirSync(directory);//Legge dentro il percorso da noi passato e crea un array con dentro il nome di tutti i file presenti
  
    files.forEach(file => {
      const filePath = path.join(directory, file);//Cicla tutti l'array per concatenare il percorso da noi passatp il nome di ogni file 
  
      if (fs.statSync(filePath).isDirectory()) {
        processDirectory(filePath, exts, percLines, percChars);//Durante il ciclo controlla tutti i file e se incorre in una directory allora chiama la funzione per gestire essa
      } else {
        const fileExt = path.extname(file);//Entra in questo ciclo se l'analisi precedente ritorna un file, e tramite path.extname assegna a fileExt solo l'estensione del file analizzato
        if (exts.includes(fileExt)) {//Se in fileExt è incluso una delle due estensioni passate in precedenza allora chiamiamo la funzione per processarlo
          processFile(filePath, percLines, percChars);
        }
      }
    });
  }
   //?-----------------------------------------------------------------------------------------------------------

  
  function cancella_righe(options) {
    const {
      directory,
      estensioni = [],
      perc_lines = 5,
      perc_chars = 5
    } = options;
  
    if (!directory) {
      throw new Error('Devi specificare una directory.');//Serve per dare un errore spefifico se la voce directory non viene specificata
    }
  
    processDirectory(directory, estensioni, perc_lines, perc_chars);
  }

  cancella_righe({ estensioni: ['.js', '.txt'], perc_lines: 4, perc_chars: 6, directory: '' });