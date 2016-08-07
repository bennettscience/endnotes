// Get the document and body
var doc = DocumentApp.getActiveDocument();
var body = DocumentApp.getActiveDocument().getBody();

// Add the custom menu
function onOpen() {
  var ui = DocumentApp.getUi();
  
  ui.createMenu("Create Endnotes")
    .addItem('Run', 'newEnd')
    .addToUi();
}

// Break a new page at the end of the document 
// Add "Endnotes" title section
// Copy footnote contents into the new section as a numbered list
function newEnd() {
  
  body.appendPageBreak();
  body.appendParagraph('Endnotes').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  
  var footnote = doc.getFootnotes();
  
  for(var i in footnote){
    doc.getBody().appendListItem(footnote[i].getFootnoteContents().copy().getText());
  }
  replaceNotes();
}

// Clears footnotes from the document.
function deleteNotes(){  
  var body = DocumentApp.getActiveDocument().getBody();
  var footnote = DocumentApp.getActiveDocument().getFootnotes();
  
  for(var i in footnote){
    footnote[i].removeFromParent();
  }
}

// Replaces note superscript where the old footnote was located.
function replaceNotes() {
  var par = body.getParagraphs();
  var notes = DocumentApp.getActiveDocument().getFootnotes();
  var note = 1;
  for(var i = 0; i < notes.length; i++){
    var getNote = notes[i].getPreviousSibling().editAsText();
    var length = notes[i].getPreviousSibling().editAsText().getText().length;
    var sup = getNote.insertText(length, (note++).toString());
    
    // Check that the footnote isn't double-digit. If it is, reset the index used to set the formatting
    if(note >= 11) {
      var newLength = sup.getText().length;
      Logger.log("length = " + length + ", newLength = " + newLength);
      sup.editAsText().setTextAlignment(length, newLength-1, DocumentApp.TextAlignment.SUPERSCRIPT);
    } 
      else {
      sup.editAsText().setTextAlignment(length, length, DocumentApp.TextAlignment.SUPERSCRIPT);
    }
  }
  deleteNotes();
}
