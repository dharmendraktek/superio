import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";

const HtmlEditor = ({ setDescriptionData, form, wrapperStyle }) => {
  const blocksFromHTML = convertFromHTML(form.description);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const initialEditorState = EditorState.createWithContent(contentState);
  const [intState, setIntState] = useState(
    "<p>New job description of the Python developer</p>"
  );
  const [editorState, setEditorState] = useState(initialEditorState);

  useEffect(() => {
    if (form.description) {
      setIntState(form.description);
    }
  }, [form.description]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  useEffect(() => {
    if (content !== "<p></p>\n") {
      setDescriptionData(content);
    }
  }, [content]);

  const toolbarOptions = {
    // options: ['fontFamily', 'fontSize'], // Add font name and font size options
    fontFamily: {
      options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Verdana'],
    },
    fontSize: {
      options: [8, 10, 12, 14, 18, 24, 36],
    },
  };


  return (
    <>
      <Editor
        wrapperStyle={wrapperStyle}
        // initialContentState={'<p>hiii this is job description</p>'}
        editorStyle={{
          padding:'0px 10px',
          background:'white',
          height:'100%'
        }}
        toolbar={toolbarOptions}
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </>
  );
};

export default HtmlEditor;
