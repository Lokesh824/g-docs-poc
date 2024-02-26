import React, { useEffect, useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Button, Modal, Input, Select, Col, Row } from "antd";
// Import katex
import "katex/dist/katex.min.css";
import axios from "axios";
import DocumentMenuBar from "./Menubar/doc-menubar";
import MyDiffComponent from "./diffChecker";
import katex from 'katex';
import 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
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
  ltr: true,
  katex,
  toolbarContainer: "#menubar",
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
      "#ff0000",
      "#ff5e00",
      "#ffe400",
      "#abf200",
      "#00d8ff",
      "#0055ff",
      "#6600ff",
      "#ff00dd",
      "#000000",
      "#ffd8d8",
      "#fae0d4",
      "#faf4c0",
      "#e4f7ba",
      "#d4f4fa",
      "#d9e5ff",
      "#e8d9ff",
      "#ffd9fa",
      "#f1f1f1",
      "#ffa7a7",
      "#ffc19e",
      "#faed7d",
      "#cef279",
      "#b2ebf4",
      "#b2ccff",
      "#d1b2ff",
      "#ffb2f5",
      "#bdbdbd",
      "#f15f5f",
      "#f29661",
      "#e5d85c",
      "#bce55c",
      "#5cd1e5",
      "#6699ff",
      "#a366ff",
      "#f261df",
      "#8c8c8c",
      "#980000",
      "#993800",
      "#998a00",
      "#6b9900",
      "#008299",
      "#003399",
      "#3d0099",
      "#990085",
      "#353535",
      "#670000",
      "#662500",
      "#665c00",
      "#476600",
      "#005766",
      "#002266",
      "#290066",
      "#660058",
      "#222222",
    ],
  ],
  imageUploadUrl: "http://localhost:8080/chazki-gateway/orders/upload",
  imageGalleryUrl: "http://localhost:8080/chazki-gateway/orders/gallery",
};

export const TextEditor = () => {
  const editorRef = useRef();
  const contentRef = useRef();
  const [value, setValue] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [showVersion, setShowVersion] = useState(false);
  useEffect(() => {
    console.log(editorRef.current.editor);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const showFileModal = () => {
    setIsFileModalOpen(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (e) => {
    setIsModalOpen(false);
    createNewFolder(e);
  };

  const handleFileOk = (e) => {
    setIsFileModalOpen(false);
    createNewFile(e);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleFileCancel = () => {
    setIsFileModalOpen(false);
  };

  // const onImageUploadError = (errorMessage, result, core) => {
  //   alert(errorMessage);
  // core.noticeOpen(errorMessage);
  // return false;
  // console.log('error!')
  // return true;
  // }
  useEffect(() => {
    // Update math equations when the editor content changes
    const editor = document.getElementById("pd-editor"); // Replace with your editor ID
    if (editor) {
      editor.addEventListener("input", () => {
        window.renderMathInElement(editor, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\[", right: "\\]", display: true },
            { left: "\\(", right: "\\)", display: false },
          ],
        });
      });
    }
  }, []);
  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.innerHTML = value;
  }, [value]);
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editorRef.current = sunEditor;
  };
  const onChangeHandler = (content) => {
    // console.log(content);
    setValue(content);
    console.log("the conenct s", content);
  };
  const onsave = (dta) => {
    console.log("asdasd", dta);
  };
  const handlePrint = () => {
    const parser = new DOMParser();
    const document = parser.parseFromString(htmlTemplate, "text/html");
    console.log("testing...", document.body);
    var printWindow = window.open("", "", "height=400,width=800");
    printWindow.document.write(document.body.innerHTML.toString());
    printWindow.document.close();
    printWindow.print();
  };
  const createNewFolder = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/create_folder`, { name: newFolderName })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(`Folder created successfully with id -> ${res.data.folder_id}`);
      })
      .catch((e) => {
        console.log(e);
        alert("error -", e);
      });
    console.log("Creating new folder");
  };
  const createNewFile = (e) => {
    e.preventDefault();
    console.log("the dagta is now......", selectedFolder, newFileName);
    axios
      .post(`http://localhost:5000/create_doc`, {
        folder_id: selectedFolder,
        name: newFileName,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(`New File created successfully with id -> ${res.data.doc_id}`);
        window.location.href = "/doc/" + res.data.doc_id;
      })
      .catch((e) => {
        console.log(e);
        alert("error -", e);
      });
  };
  const handleFolderChange = (val) => {
    console.log("test");
    setSelectedFolder(val);
  };
  const handleMenu = (event) => {
    console.log(event);
    if (event.key === "version") {
      setShowVersion(!showVersion);
    }
  };
  return (
    <div>
      <DocumentMenuBar
        handleMenu={handleMenu}
        onNewFolder={showModal}
        onNewFile={showFileModal}
        onPrint={handlePrint}
      />

      {showVersion === true ? (
        <MyDiffComponent />
      ) : (
        <>
          <div
            className="sun-editor"
            id="menubar"
            style={{ background: "red", width: "100%" }}
          ></div>

          <Modal
            title="Create New Folder"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name..."
            />
            ;
          </Modal>

          <Modal
            title="Create New File"
            open={isFileModalOpen}
            onOk={handleFileOk}
            onCancel={handleFileCancel}
          >
            <Select
              value={selectedFolder}
              style={{ width: "100%" }}
              onChange={handleFolderChange}
              options={[
                {
                  value: "1NmcGu3XVYLHwNl6rRUDGqfma_8lqG7Kf",
                  label: "1NmcGu3XVYLHwNl6rRUDGqfma_8lqG7Kf",
                },
              ]}
            />
            <br />
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter file name..."
            />
            ;
          </Modal>
          <Row>
            <Col span={6}>col</Col>
            <Col span={12}>
              <SunEditor
                getSunEditorInstance={getSunEditorInstance}
                setOptions={editorOptions}
                placeholder="Please type here..."
                autoFocus={true}
                lang="en"
                name="pd-editor"
                onSave={onsave}
                width="100%"
                height="85vh"
                id="pd-editor"
                // onImageUploadError={onImageUploadError}
                onChange={onChangeHandler}
              />
            </Col>
            <Col span={6}>col</Col>
          </Row>
        </>
      )}
    </div>
  );
};
