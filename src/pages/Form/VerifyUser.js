import api from "../../callapi";
import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router";

function VerifyUser({match}) {
    const [notify, setNotify] = useState('')
    const history = useHistory();
    useEffect(()=>{
         const fetchData = async()=>{
            let res = await api.get("/auth/verify/"+ match.params.id);
            setNotify(res.data.message);
            history.push("/login");
        }
        fetchData();
    }, [])

    return(<h1>{notify}</h1>)
}
export default withRouter(VerifyUser);