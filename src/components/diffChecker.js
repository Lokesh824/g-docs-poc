import React from "react";
import ReactDiffViewer from "react-diff-viewer";
import { Select, Space } from "antd";
const oldCode = `
const a = 10
const b = 10
const c = () => console.log('foo')
 
if(a > 10) {
  console.log('bar')
}
 
console.log('done')
`;
const newCode = `
const a = 10
const boo = 10
 
if(a === 10) {
  console.log('bar12')
}
`;
const MyDiffComponent = () => {
  const oldData = "Your old content here";
  const newData = "Your new content here";
  const DiffMethod = {
    CHARS: "diffChars",
    WORDS: "diffWords",
    WORDS_WITH_SPACE: "diffWordsWithSpace",
    LINES: "diffLines",
    TRIMMED_LINES: "diffTrimmedLines",
    SENTENCES: "diffSentences",
    CSS: "diffCss",
  };
  return (
    <div style={{ marginTop: "5vh" }}>
      Select a version to compare the current data :{" "}
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        //   onChange={handleChange}
        options={[
          { value: "jack", label: "V2" },
          { value: "lucy", label: "V3" },
          { value: "Yiminghe", label: "V4" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
      <ReactDiffViewer
        leftTitle="Current Version"
        rightTitle="Changes made in V3"
        oldValue={oldCode}
        newValue={newCode}
        splitView={true}
        hideLineNumbers={true}
        compareMethod={DiffMethod.WORDS}
      />
    </div>
  );
};

export default MyDiffComponent;
