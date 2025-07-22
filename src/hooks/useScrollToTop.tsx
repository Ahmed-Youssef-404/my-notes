import { useEffect } from "react"
import { useLoaderData } from "react-router-dom";


const useScrollToTop = () => {

    const path = useLoaderData();

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[path])

    return null
}

export default useScrollToTop
