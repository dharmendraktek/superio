import { BeatLoader } from "react-spinners"



const Loader = () => {
    return(
        <div class="loading-backdrop" id="loadingBackdrop">
        <BeatLoader 
         color={"#ffffff"}  size={18}
        />
      </div>
    )
}

export default Loader;