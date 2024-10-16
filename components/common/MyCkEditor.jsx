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

const MyCKEditor = ({ setDescriptionData, form, wrapperStyle, name }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  useEffect(() => {
    if (form.description && (name == "update")) {
      const blocksFromHTML = convertFromHTML(form.description);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [form.description]);

  const onEditorStateChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
    
    const content = draftToHtml(
      convertToRaw(newEditorState.getCurrentContent())
    );
    
    if (content !== "<p></p>\n") {
      setDescriptionData(content);
    }
  }, [setDescriptionData]);

  const toolbarOptions = {
    fontFamily: {
      options: ["Arial", "Georgia", "Impact", "Tahoma", "Verdana"],
    },
    fontSize: {
      options: [8, 10, 12, 14, 18, 24, 36],
    },
  };

  return (
    <Editor
      wrapperStyle={wrapperStyle}
      editorStyle={{
        padding: "0px 10px",
        background: "white",
        height: "100%",
      }}
      toolbar={toolbarOptions}
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default MyCKEditor;

