import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';


const HtmlEditor = ({setDescriptionData, form}) => {
  const [intState, setIntState] = useState();
  useEffect(() => {
     if(form.description){
      setIntState(form.description);
     }
  }, [form.description])

  const blocksFromHTML = convertFromHTML(form.description);
  const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
  const initialEditorState = EditorState.createWithContent(contentState);
  const [editorState, setEditorState] = useState(initialEditorState);


  const onEditorStateChange = (newEditorState) => {
          setEditorState(newEditorState);
  };
  
  const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  useEffect(() => {
    if(content !== '<p></p>'){
      // setDescriptionData(content)
    }
  }, [content])


  return (
    <>
      <Editor
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
