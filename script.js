//  ich brauche notizen


let notesTitles = ['Ba', 'Aufgabe'];

let notes = ['banana', 'rasen mähen'];                     // der array ausdem man sich seine Notizen anzeigen lässt

let archivTitles = [];

let archivNotes = [];

let trashNotesTitles = [];

let trashNotes = [];                                       // der array als Papierkorb

let endNotes = [];

//  -> wann werden sie angezeigt?



function renderNotes() {
    //getFromLocalStorage(); die function um den inhalt im local storage zu speichern
    let contetnRef = document.getElementById('content');   //  ich muss definieren wo sie anzuzeigen sind
    contetnRef.innerHTML = "";                                       // damit leere ich contentRef (damit man nicht einfach hinzufügt sondern einzelne sachen anzeigen lassen kann)
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {  // eine for Schleife um die Notizen rendern zu lassen
        //const note = notes[indexNote];
        contetnRef.innerHTML += getNoteTemplate(indexNote);                           // wir haben mit contentRef den Ort wo es angezeigt werden soll bestimmt und nun lassen wir es durch innerHTML dort auch anzeigen

    }
}


function getNoteTemplate(indexNote) { // eine Function mit welcher wir beschreiben wie das aussehen soll was wir in contentRef darstellen lassen wollen
    return `<p> title: ${notesTitles[indexNote]} </p> <p>  ${notes[indexNote]}<button onclick="pushToTrash(${indexNote})">X</button><button onclick="pushToArchiv(${indexNote})">A</button></p>`    // wir schreiben also in Java Html code damit wir sagen wir wollen als Wert ein P-tag mit dem einem Inhalt - index (der inhalt aus dem Array welches wir uns über die Schleife ermitteln lassen)      
}


// notizen hinzufügen
// Referenzen zu der Html value und das was damit dann macht (die anderen Variable hier noteInput) am besten trennen 

function addNote() {            // eine Function um eine Notiz hinzuzufügen    wir triggern diese Function über einen Button den wir im HTML hinzufeügt haben und dieser speichert und added dann die neue Notiz
    let noteInputRef = document.getElementById('note_input');  // wir ziehen uns die Information woher wir die Eingabe nehmen // diese Eingabe auslesen
    let noteInput = noteInputRef.value;                        // wir setzten den Wert für unsere Variable gleich mit dem Wert aus der erhalteten Information
    notes.push(noteInput);                                     // um den Array notes also den Wert des Input -  Feldes hinzuzufügen 
    //saveToLocalStorage();                                    // die function um es auch dem local storage hinzuzufügen
    addNoteTitle();                                            // wir führen die function addNoteTitle aus um auch den title hinzuzufügen
    renderNotes();                                             // nach dem hinzufügen in array müssen wir ja natürlich diese Information auch rendern lassen, durch unsere render function
    noteInputRef.value = "";
}

// titel hinzufügen

function addNoteTitle() {                                       // eine function um den titel auch hinzuzufügen                              
    let titleInputRef = document.getElementById('title_input'); // ähnlich wie bei note nehmen wir uns auch die information vom inputfeld
    let titleInput = titleInputRef.value;                       // die value wird in einer neuen variable gespeichert
    notesTitles.push(titleInput);                               // wir fügen NotesTitels den werd der Variable zu
    titleInputRef.value = "";                                   // wir leren danach den value also das input feld wird gecleart
}


//notiz in archiv schieben
function pushToArchiv(indexNote) {
    let archivNote = notes.splice(indexNote, 1);
    archivNotes.push(archivNote[0]);
    let archivTitle = notesTitles.splice(indexNote, 1);
    archivTitles.push(archivTitle[0]);
    renderNotes();
    renderArchivNotes();
}
// eine Function bei der ich aus archiv entferne und in trash schieben kann

function archivToTrash(indexNote) {
    let archivTrash = archivNotes.splice(indexNote, 1)
    trashNotes.push(archivTrash[0]);
    let archivTrashTitle = archivTitles.splice(indexNote, 1)
    trashNotesTitles.push(archivTrashTitle[0]);
    renderArchivNotes();
    renderTrashNotes();
    
}
// ein Archiv anzeigen
function renderArchivNotes() {
    let archivContentRef = document.getElementById('archiv');    // wo zeigen wir das Archiv an
    archivContentRef.innerHTML = "";                             // wir leeren wieder den content ref
    for (let ArchivNote = 0; ArchivNote < archivNotes.length; ArchivNote++) {
        archivContentRef.innerHTML += getArchivTemplate(ArchivNote);
        
    }
    
}

function getArchivTemplate(ArchivNote) {
    return `<p> title: ${archivTitles[ArchivNote]} </p> <p>  ${archivNotes[ArchivNote]}<button onclick="archivToTrash(${ArchivNote})">X</button></p>`
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
    return `<p> title: ${trashNotesTitles[indexTrashNote]} </p> <p> ${trashNotes[indexTrashNote]}<button onclick="deleteNote(${indexTrashNote})">X</button></p>`
}

// eine function um den Trash nun engültig zu löschen

function deleteNote(indexTrashNote) {                   // eine function um die Notizen aus dem Trash endgültig zu löschen
    let endNote = trashNotes.splice(indexTrashNote, 1); // ich entferne aus dem trashNotes array die gewünschte position und speicher sie in einer zwischen-variable wie hier zb. endNote
    endNotes.push(endNote);                             // hiermit verschiebe ich dann aus dem array trashNotes in den array endNotes 
    renderTrashNotes();                                 // hiermit render ich dann trashNotes und sehe das dieser array leer , endNote lasse ich nicht rendern da ich diesen nicht angezeigt bekommen will

    
}





// -> notizen archievieren

function saveToLocalStorage() {                                // eine function um den Inhalt den wir über das input-feld hinzufügen auch dem local storage der seite hinzuzufügen, sodass dies gespeichert wird selbst wenn man die Seite neu lädt
    localStorage.setItem("notes", JSON.stringify(notes));      // mit dem befehl setzten wir in den local storage zuerst den key + value ein (um arrays als string einzusetzen benutzen wir wie in dem fall JSON.stringify(name des arrays))
    
}


function getFromLocalStorage() {                               // eine functino um auf den Inhalt im Local Storage zuzugreifen
    let myARR = JSON.parse(localStorage.getItem("notes"));     // wir haben eine zwischen variable die wir hier myArr nennen, mit getItem kriegen wir die info aus dem Local storage, mit JSON.parse wandel wir den string wieder in ein objekt(in dem fall in ein array)
    if (myARR !== null) {                                      // eine abfrage das wenn myARR null ist dann wird notes nicht verändert
        notes = myARR;                                         // wir sagen das notes gleich dem inhalt von der zwischen variable
    }                                             
}

