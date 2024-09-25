import { BeatLoader } from "react-spinners"
import Robot from "./Robot";



const Loader = ({text}) => {
    return(
        <div class="loading-backdrop" id="loadingBackdrop">
        {text ?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Robot />
      </div>
        :
        <BeatLoader 
         color={"#ffffff"}  size={18}
        />
        }
      </div>
    )
}

export default Loader;