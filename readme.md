Endnote Generator
===
Google documents do not allow you to create linked endnotes in a document.
This Google Apps script looks for existing footnotes in a doc and creates an endnotes section from that content.

Use
===
This is a Google Docs AddOn, so it's easiest to [add from the AddOns store in Drive](https://chrome.google.com/webstore/detail/endnote-generator/nmhebcalinkmgflgcfapknjhbliebooc).

Current Version
===
**Current** - v0.5 - Footnotes on images are now preserved when converted.

v0.4.7 - Endnotes now retain formatting.

AddOn v0.4 - bug fix to repair the "Run" menu not appearing.

v0.1 - AddOn published

Other Uses
===

If you want to install and run **on a single document**, do the following:

1. Open the document you'd like to create endnotes in.
2. Go to **Tools > Script Editor** and delete the default `function` text in the editor.
3. Copy the `footToEnd.gs` script and paste it into the editor.
4. Name the script "Endnotes", save the file, and close the tab.
5. Reload your document.
6. There is a new menu item called "Create Endnotes." Use it to run the script.

You can still grab the `footToEnd.gs` file and run it on a single document using the Script Editor.

You can still grab the `footToEnd.gs` file and run it on a single document using the Script Editor.

Known issues
===
- It only loops through `paragraph` elements in the doc, so if you have a footnote on an image, it's going to throw an error.
- Creating endnotes removes all footnotes from the document, meaning if you go back and add a footnote, it starts over with **1**.

License
===
This is provided AS IS under the MIT Open License.

It was a fun little project and not something I plan on really improving a lot more. Feel free to fork and update however you'd like.
