//  ich brauche notizen


let notesTitles = ['Ba', 'Aufgabe'];

let notes = ['banana', 'rasen mähen'];                     // der array ausdem man sich seine Notizen anzeigen lässt

let trashNotesTitles = [];

let trashNotes = [];                                       // der array als Papierkorb

let endNotes = [];

//  -> wann werden sie angezeigt?



function renderNotes() {
    
    let contetnRef = document.getElementById('content');   //  ich muss definieren wo sie anzuzeigen sind
    contetnRef.innerHTML = "";                                       // damit leere ich contentRef (damit man nicht einfach hinzufügt sondern einzelne sachen anzeigen lassen kann)
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {  // eine for Schleife um die Notizen rendern zu lassen
        //const note = notes[indexNote];
        contetnRef.innerHTML += getNoteTemplate(indexNote);                           // wir haben mit contentRef den Ort wo es angezeigt werden soll bestimmt und nun lassen wir es durch innerHTML dort auch anzeigen

    }
}


function getNoteTemplate(indexNote) { // eine Function mit welcher wir beschreiben wie das aussehen soll was wir in contentRef darstellen lassen wollen
    return `<p>+ title: ${notesTitles[indexNote]} -> ${notes[indexNote]}<button onclick="pushToTrash(${indexNote})">X</button></p>`    // wir schreiben also in Java Html code damit wir sagen wir wollen als Wert ein P-tag mit dem einem Inhalt - index (der inhalt aus dem Array welches wir uns über die Schleife ermitteln lassen)      
}


// notizen hinzufügen
// Referenzen zu der Html value und das was damit dann macht (die anderen Variable hier noteInput) am besten trennen 

function addNote() {            // eine Function um eine Notiz hinzuzufügen    wir triggern diese Function über einen Button den wir im HTML hinzufeügt haben und dieser speichert und added dann die neue Notiz
    let noteInputRef = document.getElementById('note_input');  // wir ziehen uns die Information woher wir die Eingabe nehmen // diese Eingabe auslesen
    let noteInput = noteInputRef.value;                        // wir setzten den Wert für unsere Variable gleich mit dem Wert aus der erhalteten Information
    notes.push(noteInput);                                     // um den Array notes also den Wert des Input -  Feldes hinzuzufügen 
    renderNotes();                                             // nach dem hinzufügen in array müssen wir ja natürlich diese Information auch rendern lassen, durch unsere render function
    noteInputRef.value = "";
}


// notizen löschen
// welche Notiz muss gelöscht werden
// wann muss die Notiz gelöscht werden
// anzeige updaten

function pushToTrash(indexNote) {     // eine function um eine Notiz zu entfernen
    let trashNote = notes.splice(indexNote, 1);      // mit splice entfernen wir und mit den parametern also indexNote und 1 sagen wir wo was (den Inhalt im Array) entfernt werden soll 
    trashNotes.push(trashNote[0]);      // wir fügen also dem array trashNotes die aus dem notes array entfernten daten hinzu - - -> damit wechseln die elemente also den array von notes zu trashNotes
    let trashNotesTitle = notesTitles.splice(indexNote, 1);       
    trashNotesTitles.push(trashNotesTitle[0]);
    renderNotes();                   // mit der function lassen wir unser gerendertes quasi wieder neu rendern nachdem wir die Notiz entfernt haben 
    renderTrashNotes();              // mit der function wechseln also die gerenderten notes zu den gelöschten notes 
}


// einen Papierkorb anzeigen

function renderTrashNotes() {
    let trashContetnRef = document.getElementById('trash_content');   //  wo zeigen wir die TrashNotes an
    trashContetnRef.innerHTML = "";                                       // damit leere ich contentRef (damit man nicht einfach hinzufügt sondern einzelne sachen anzeigen lassen kann)
    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {  // eine for Schleife um die Trash - Notizen rendern zu lassen
        trashContetnRef.innerHTML += getTrashNoteTamplate(indexTrashNote);                           // wir haben mit trashcontentRef den Ort wo es angezeigt werden soll bestimmt und nun lassen wir es durch innerHTML dort auch anzeigen

    }
}

function getTrashNoteTamplate(indexTrashNote) {                 // die functio um zu sagen was in den TrashNotes angzeigt werden soll --> ist die selbe function wie oben nur das wir sie für was anderes benutzen
    return `<p>+ title: ${trashNotesTitles[indexTrashNote]} -> ${trashNotes[indexTrashNote]}<button onclick="deleteNote(${indexTrashNote})">X</button></p>`
}

// eine function um den Trash nun engültig zu löschen

function deleteNote(indexTrashNote) {                   // eine function um die Notizen aus dem Trash endgültig zu löschen
    let endNote = trashNotes.splice(indexTrashNote, 1); // ich entferne aus dem trashNotes array die gewünschte position und speicher sie in einer zwischen-variable wie hier zb. endNote
    endNotes.push(endNote);                             // hiermit verschiebe ich dann aus dem array trashNotes in den array endNotes 
    renderTrashNotes();                                 // hiermit render ich dann trashNotes und sehe das dieser array leer , endNote lasse ich nicht rendern da ich diesen nicht angezeigt bekommen will

    
}





// -> notizen archievieren
