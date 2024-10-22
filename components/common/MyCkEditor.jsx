// 'use client';
// import React, { useEffect, useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import { ContentState, EditorState, convertFromHTML } from 'draft-js';

// const MyCKEditor = ({ setDescriptionData, form, wrapperStyle }) => {
//   const [editorData, setEditorData] = useState('<p></p>');
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   useEffect(() => {
//     if (form.description) {
//       setEditorData(form.description);
//       const blocksFromHTML = convertFromHTML(form.description);
//       const contentState = ContentState.createFromBlockArray(
//         blocksFromHTML.contentBlocks,
//         blocksFromHTML.entityMap
//       );
//       setEditorState(EditorState.createWithContent(contentState));
//     }
//   }, [form.description]);

//   const handleChange = (event, editor) => {
//     const data = editor.getData();
//     setEditorData(data);
//     setDescriptionData(data);
//   };

//   const handleFocus = () => {
//     console.log('Editor focused');
//   };

//   const handleBlur = () => {
//     console.log('Editor blurred');
//   };

//   useEffect(() => {
//     console.log('Editor is ready to use!');
//   }, []);

//   return (
//     <div>
//       <CKEditor
//         editor={ClassicEditor}
//         data={editorData}
//         onChange={handleChange}
//         onReady={(editor) => {
//           console.log('Editor is ready to use!', editor);
//         }}
//         config={{
      
//         }}
//         onBlur={handleBlur}
//         // onFocus={handleFocus}
//       />
//     </div>
//   );
// };

// export default MyCKEditor;



import draftToHtml from "draftjs-to-html";
import { useEffect, useState, useCallback } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";

const MyCKEditor = ({ setDescriptionData, form, wrapperStyle, name, height }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Initialize editor content when form.description changes
  useEffect(() => {
    if (form.description && (name === "update" || name === "parse")) {
      const blocksFromHTML = convertFromHTML(form.description);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [form.description, name]);

  // Handle editor state changes
  const onEditorStateChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
  }, []);

  // Handle editor blur and convert content to HTML
  const handleEditorBlur = useCallback(() => {
    const content = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    
    if (content) {
      setDescriptionData(content); // Update the parent component with HTML content
    }
  }, [editorState, setDescriptionData]);

  return (
    <Editor
      wrapperStyle={wrapperStyle}
      editorStyle={{
        padding: "0px 10px",
        background: "white",
        height: height || "400px", // default height
        overflowY: "scroll",
        lineHeight: "0.9",
      }}
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
      onBlur={handleEditorBlur} // Convert to HTML when the editor loses focus
    />
  );
};

export default MyCKEditor;
