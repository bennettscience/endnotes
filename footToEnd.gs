// Get the document and body
var doc = DocumentApp.getActiveDocument();
var body = DocumentApp.getActiveDocument().getBody();

// Add the custom menu
function onOpen() {
  var ui = DocumentApp.getUi();

  ui.createMenu("Create Endnotes")
    .addItem('Run', 'newEndnotes')
    .addToUi();
}

// Break a new page at the end of the document
// Add "Endnotes" title section
// Copy footnote contents into the new section as a numbered list
function newEndnotes() {

  // Get the document and body
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var props = PropertiesService.getDocumentProperties();

  // Check for stored endnotes existing in the doc. If false, start a new section
      var footnotes = doc.getFootnotes();
      body.appendPageBreak();
      body.appendParagraph('Endnotes').setHeading(DocumentApp.ParagraphHeading.HEADING1);
      for(var i=0; i<footnotes.length;i++) {
        var note = footnotes[i].getFootnoteContents();
        var text = note.getChild(0).copy();
        var par = body.appendParagraph(text);
        par.insertText(0, (i+1) + ". ").setBold(false).setItalic(false).setUnderline(false);
      }
  replaceNotes();
}

// Replaces note superscript where the old footnote was located.
function replaceNotes(hasNotes) {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var pars = body.getParagraphs();
  var footnotes = doc.getFootnotes();
  var note = 1;

  for(var i = 0; i < footnotes.length; i++){
    var count = footnotes[i];
    Logger.log(count);
    var getNote = footnotes[i].getPreviousSibling();
    Logger.log(getNote);
    if(getNote.getType() == DocumentApp.ElementType.INLINE_IMAGE) {
      footnotes[i].getParent().insertText(footnotes[i].getParent().asParagraph().getNumChildren(), (note++).toString()).setTextAlignment(DocumentApp.TextAlignment.SUPERSCRIPT);
    } else {
      getNote = footnotes[i].getPreviousSibling().editAsText();
      var length = footnotes[i].getPreviousSibling().editAsText().getText().length;
      var sup = getNote.insertText(length, (note++).toString());
    }
    // Check that the footnote isn't double-digit. If it is, reset the index used to set the formatting
    if(note >= 11) {
      var newLength = sup.getText().length;
      sup.editAsText().setTextAlignment(length, newLength-1, DocumentApp.TextAlignment.SUPERSCRIPT);
    }
    else {
      sup.editAsText().setTextAlignment(length, length, DocumentApp.TextAlignment.SUPERSCRIPT);
    }
    footnotes[i].removeFromParent();
  }
}
