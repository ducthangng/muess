import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "SVG"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    setFileName(file.name);
  };
  return (
    <div className="fileContainer">
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <p>{file ? `File name: ${fileName}` : "no files uploaded yet"}</p>
    </div>

  );
}

export default DragDrop;