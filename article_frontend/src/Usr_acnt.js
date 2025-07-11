import React from "react";
import { useState, useEffect } from "react";
const address = process.env.REACT_APP_BACKEND_URL;

const Usr_acnt = (props) => {


    const [disp, setdisp] = useState([]);
    const callDisp = async () => {
        const username = props.admin_user.username;
        //const username = "admin1";
        console.log(username);
        try {
            const res = await fetch(`${address}/disp_usr_acnt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username
                })
            }).then((res) => res.json());
            setdisp(res);
            console.log(disp);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        callDisp();
    }, [props.admin_user.username]);



    const remove = async (index) => {
        const feedBack = disp[index].username;
        console.log(feedBack);
        const res = await fetch(`${address}/rm_usr_acnt`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                feedBack
            })
        });
        const data = await res.json();
        if (!res.status === 200 || !data) {
            window.alert("User account not removed");
        } else {
            window.alert("User account removed from DB!");
            // setisFavourite(true);
            window.location = "/usr_acnt";
            console.log("feedBack removed.");
        }
    }



    return (
        <>
            <div>
                <div className="bg-white h-screen">
                    <div className="flex justify-end w-full">
                        <div className="flex place-content-end w-1/3 m-3">
                            <a href="/After_login_admin"> <button className="font-semibold 
                             text-xl p-3 mr-5 rounded-xl  bg-slate-200 h-12
                              hover:rounded-xl hover:bg-white self-center
                              hover:text-black cursor-pointer" >
                                Back</button> </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 mt-10">
                        {Object.keys(disp).length > 0 ?
                            disp.map((curelem, index) => {
                                return (
                                    <div>
                                        <div key={index} className="border-2 border-black 
                                    m-5 flex flex-col rounded-lg shadow-md shadow-black">
                                            <div className="flex flex-col m-3">
                                                <div>
                                                    <h1 className="w-2/3 text-xl font-semibold flex self-center mx-3 ">
                                                        Full name : {curelem.fullname}.
                                                    </h1>
                                                </div>
                                                <div>
                                                    <h1 className="w-2/3 text-xl font-semibold flex self-center mx-3 ">
                                                        Email : {curelem.email}.
                                                    </h1>
                                                </div>
                                                <div>
                                                    <h1 className="w-2/3 text-xl font-semibold flex self-center mx-3 ">
                                                        User name : {curelem.username}.
                                                    </h1>
                                                </div>
                                                <div className="flex flex-row justify-between">
                                                    <div>
                                                        <h1 className="w-full text-xl font-semibold flex self-center mx-3 ">
                                                            Intrested Topic : {curelem.branch}.
                                                        </h1>
                                                    </div>
                                                    <div>
                                                        <button className="font-semibold 
                                                    text-xl rounded-xl  bg-white h-12
                                                    hover:rounded-xl mr-5
                                                  hover:text-black text-slate-400 cursor-pointer"
                                                            onClick={() => remove(index)}>
                                                            Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                );
                            }) : <><div>waiting...</div></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usr_acnt;