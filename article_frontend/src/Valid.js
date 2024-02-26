import React from "react";
import { useEffect, useState } from "react";

const Valid = (props) => {
    
    const [verify, setverify] = useState(false);
    const [user, setuser] = useState({});
    const open_about = async () => {
        try {
            const response = await fetch('https://intern-project-qdst.onrender.com/About', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await response.json();
            props.setuser(data);
            console.log(data);
            setverify(true);
            if (!response.status === 200) {
                const err = new Error(response.err);
                throw err;
            }
        }
        catch (error) {
            console.log(error);
            window.location = "/";
        }
    }

    
    useEffect(() => {
        open_about();
    }, []);

    return (
        <>

        </>
    )
}

export default Valid;