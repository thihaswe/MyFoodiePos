import { Box } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";

interface Prop {
  onSelected: (files: File[]) => void;
}

const FileDropZone = ({ onSelected }: Prop) => {
  const onDrop = (acceptedfiles: File[]) => {
    onSelected(acceptedfiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 4,
        border: "3px dotted lightgray",
        textAlign: "center",
        p: 1,
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag drop some files here, or click to select files</p>
      )}
    </Box>
  );
};

export default FileDropZone;
