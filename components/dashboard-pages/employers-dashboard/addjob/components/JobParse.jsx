import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const JobParse = ({setTab}) => {
  return (
    <div className="p-5">
      <div className="shadow rounded-2" style={{height:'700px'}}>
        <div className="w-100">
          <div className="d-flex justify-content-between p-3">
            <h3>Parse Job Details</h3>
            <div>
            <button className="theme-btn small btn-style-one mx-2">Start Parsing</button>
            <button className="theme-btn small btn-style-one" onClick={() => setTab(null)}>Cancel</button>
            </div>
          </div>
          <Editor
            // editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            // onEditorStateChange={this.onEditorStateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default JobParse;
