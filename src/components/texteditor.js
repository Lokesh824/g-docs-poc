import React, { useEffect, useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
// Import katex
import katex from "katex";
import "katex/dist/katex.min.css";
const htmlTemplate = `<html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>Preview</title>
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/logo192.png">
<link rel="manifest" href="/manifest.json">
<style>
    /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxTQUFTO0VBQ1Q7O2NBRVk7RUFDWixtQ0FBbUM7RUFDbkMsa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0U7YUFDVztBQUNiIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgJ1JvYm90bycsICdPeHlnZW4nLFxuICAgICdVYnVudHUnLCAnQ2FudGFyZWxsJywgJ0ZpcmEgU2FucycsICdEcm9pZCBTYW5zJywgJ0hlbHZldGljYSBOZXVlJyxcbiAgICBzYW5zLXNlcmlmO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbn1cblxuY29kZSB7XG4gIGZvbnQtZmFtaWx5OiBzb3VyY2UtY29kZS1wcm8sIE1lbmxvLCBNb25hY28sIENvbnNvbGFzLCAnQ291cmllciBOZXcnLFxuICAgIG1vbm9zcGFjZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */
</style>

</head>

<body class="sun-editor-editable" style="margin:10px auto !important; height:auto !important;"
    data-new-gr-c-s-check-loaded="14.1054.0" data-gr-ext-installed="">

</body>

</html>`;
const editorOptions = {
  katex: katex,
  ltr: true,
  buttonList: [
    ["undo", "redo"],
    ["removeFormat"],
    ["bold", "underline", "italic", "fontSize", "font"],
    // ["tag_blockquote"],
    // ["mention"],
    // ["heading"],
    ["fontColor", "hiliteColor", "formatBlock", "paragraphStyle", "blockquote"],
    ["strike", "subscript", "superscript"],
    ["indent", "outdent"],
    ["align"],
    ["list"],
    ["horizontalRule"],
    ["table", "link", "image", "imageGallery"],
    ["showBlocks", "codeView"],
    ["math"],
    ["preview", "print", "save", "template"],
  ],
  font: [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
  ],
  imageRotation: false,
  fontSize: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 42, 55, 60],
  colorList: [
    [
      "#828282",
      "#FF5400",
      "#676464",
      "#F1F2F4",
      "#FF9B00",
      "#F00",
      "#fa6e30",
      "#000",
      "rgba(255, 153, 0, 0.1)",
      "#FF6600",
      "#0099FF",
      "#74CC6D",
      "#FF9900",
      "#CCCCCC",
    ],
  ],
  imageUploadUrl: "http://localhost:8080/chazki-gateway/orders/upload",
  imageGalleryUrl: "http://localhost:8080/chazki-gateway/orders/gallery",
};

export const TextEditor = () => {
  const editorRef = useRef();
  const contentRef = useRef();
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(editorRef.current.editor);
  }, []);

  // const onImageUploadError = (errorMessage, result, core) => {
  //   alert(errorMessage);
  // core.noticeOpen(errorMessage);
  // return false;
  // console.log('error!')
  // return true;
  // }

  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.innerHTML = value;
  }, [value]);
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editorRef.current = sunEditor;
  };
  const onChangeHandler = (content) => {
    console.log(content);
    setValue(content);
  };
  const onsave = (dta) => {
    console.log("asdasd", dta);
  };
  const handlePrint = () => {
    const parser = new DOMParser();
    const document = parser.parseFromString(htmlTemplate, "text/html");
    document.body.append(value);
    console.log(document.body);
    var printWindow = window.open("", "", "height=400,width=800");
    printWindow.document.write(document);
    printWindow.document.close();
    printWindow.print();
  };
  // const onClickHandler = () => {
  //   if(!contentRef.current) return;
  //   contentRef.current.innerHTML = valueRef.current;
  // }
  return (
    <div>
      <input
        onClick={handlePrint}
        type="button"
        value="Print Div Contents"
        id="btnPrint"
      />
      <SunEditor
        getSunEditorInstance={getSunEditorInstance}
        setOptions={editorOptions}
        placeholder="Please type here..."
        autoFocus={true}
        lang="en"
        name="pd-editor"
        onSave={onsave}
        // onImageUploadError={onImageUploadError}
        onChange={onChangeHandler}
      />
      {/* <button onClick={onClickHandler} type="button">parsear</button> */}
      {/* <div ref={contentRef}></div> */}
    </div>
  );
};
