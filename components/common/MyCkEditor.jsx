'use client'
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MyCKEditor = () => {
  const [editorData, setEditorData] = useState('<p>Start typing...</p>');

  return (
    <div className="">
      <h4>Editor</h4>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          console.log({ event, editor, data });
        }}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
      {/* <h3>Editor Content:</h3>
      <div dangerouslySetInnerHTML={{ __html: editorData }} /> */}
    </div>
  );
};

export default MyCKEditor;
