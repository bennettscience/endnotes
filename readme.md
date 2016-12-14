Endnote Generator
===
Google documents do not allow you to create linked endnotes in a document.
This Google Apps script looks for existing footnotes in a doc and creates an endnotes section from that content.

Use
===
This is a Google Docs AddOn, so it's easiest to add from the AddOns store in Drive.

If you want to install and test, do the following:

1. Open the document you'd like to create endnotes in.
2. Go to **Tools > Script Editor** and delete the default `function` text in the editor.
3. Copy the `footToEnd.gs` script and paste it into the editor.
4. Create a new HTML file in the editor and title it `index`.
5. Click on **Publish > Test as add on**
6. Change the isntall configuration to **Test with latest version** and **Installed and enabled**. Select a document and click Save.

Known issues
===
- It only loops through `paragraph` elements in the doc, so if you have a footnote on an image, it's going to throw an error.
- Creating endnotes removes all footnotes from the document, meaning if you go back and add a footnote, it starts over with **1**.

License
===
This is provided AS IS under the MIT Open License.

It was a fun little project and not something I plan on really improving a lot more. Feel free to fork and update however you'd like.