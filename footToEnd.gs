// globals
var doc = DocumentApp.getActiveDocument();
var body = doc.getBody();

// Add the custom menu
function onOpen() {
  DocumentApp.getUi().createMenu("Create Endnotes")
    .addItem('Run', 'newEndnotes').addToUi();
}

// Break a new page at the end of the document
// Add "Endnotes" title section
// Copy footnote contents into the new section as a numbered list
// Add cross reference for each entry
function newEndnotes() {
  var footnotes = doc.getFootnotes();
  body.appendParagraph('Endnotes').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  for(var i=0; i<footnotes.length;i++) {
    replaceNote(footnotes[i], (i+1).toString());
    footnotes[i].removeFromParent();
  }
}

// Create bookmarks for both the endnote and endnote contents, then add mutual links
function replaceNote(footnote, sn) {
    var getNote = footnote.getPreviousSibling();
    if(getNote.getType() == DocumentApp.ElementType.INLINE_IMAGE) {
      var supStart = 0;
      var sup = getNote.getParent().appendText(sn);
    } else {
      var supStart = getNote.getText().length;
      var sup = getNote.appendText(sn);
    }
    var newLength = sup.getText().length;
    sup.editAsText().setTextAlignment(supStart, newLength-1, DocumentApp.TextAlignment.SUPERSCRIPT);
    var bookmark = doc.addBookmark(doc.newPosition(sup, 0));

    var note = footnote.getFootnoteContents();
    var text = note.getChild(0).copy();
    var paragraph = body.appendParagraph(text);
    paragraph.insertText(0, sn + ". ")
      .setBold(false).setItalic(false).setUnderline(false)
      .setLinkUrl(0, sn.length-1, "#bookmark="+bookmark.getId());
    var endnoteBookmark = doc.addBookmark(doc.newPosition(paragraph, 0));
    sup.editAsText().setLinkUrl(supStart, newLength-1, "#bookmark="+endnoteBookmark.getId());
}
