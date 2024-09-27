

const Paper = ({children, height}) => {

    return(
        <div className="shadow p-3 my-2 bg-white rounded-1 " style={{height:`${height ? height : 'fit-content'}`}}>
            {children}
        </div>
    )
}

export default Paper;