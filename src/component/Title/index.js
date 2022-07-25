import React from "react";

const Title = ( {text} ) => {
    return(
        <h3> {text} </h3>
    )
}

export default React.memo(Title);