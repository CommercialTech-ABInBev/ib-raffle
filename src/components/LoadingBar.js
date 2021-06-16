import React, { useRef, useContext } from 'react';
import LoadingBar from 'react-top-loading-bar'
import { AppContext } from '../Provider';


function LoadingBarHOC() {

    const ref = useRef(null);
    const [state] = useContext(AppContext);
    const loading = state.loading;

    React.useEffect(() => {
        if (loading) {
            ref.current.continuousStart()
        } else {
            ref.current.complete();
        }
    }, [loading])

    return (
        <LoadingBar color="#B11F24" shadow={true} ref={ref} />
    );
}

export default LoadingBarHOC;