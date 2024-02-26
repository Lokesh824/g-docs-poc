import React, { useState } from "react";
import { Menu } from "antd";
const items = [
  {
    label: "File",
    key: "SubMenu",
    children: [
      { label: "New File", key: "newfile" },
      { label: "New Folder", key: "newfolder" },

      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
  {
    label: "Edit",
    key: "alipay",
  },
  {
    label: "Print",
    key: "print",
  },
  {
    label: "Versions",
    key: "version",
  },
];

const DocumentMenuBar = (props) => {
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    console.log("click ", e);
    // setCurrent(e.key);
    if (e.key === "newfolder") {
      props.onNewFolder();
    } else if (e.key === "newfile") {
      props.onNewFile();
    } else if (e.key === "print") {
      props.onPrint();
    }
    props.handleMenu(e);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      theme="dark"
    />
  );
};

export default DocumentMenuBar;
