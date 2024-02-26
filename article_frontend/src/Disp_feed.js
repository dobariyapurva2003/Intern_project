import React from "react";
import { useState, useEffect } from "react";

const Disp_feed = (props) => {

    const [disp, setdisp] = useState([]);
    const callDisp = async () => {
        const username = props.admin_user.username;
        //const username = "admin1";
        console.log(username);
        try {
            const res = await fetch("https://intern-project-qdst.onrender.com/disp_feed", {
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
        const feedBack = disp[index];
        console.log(feedBack);
        const res = await fetch("https://intern-project-qdst.onrender.com/rmfeed", {
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
            window.alert("feedBack not removed");
        } else {
            window.alert("feedBack removed from DB!");
            // setisFavourite(true);
            window.location = "/displayFeedback";
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
                    <div className="grid grid-cols-2 mt-10">
                        {Object.keys(disp).length > 0 ?
                            disp.map((curelem, index) => {
                                return (
                                    <div>
                                        <div key={index} className="border-2 border-black 
                                    m-5 flex flex-row rounded-lg shadow-md shadow-black">
                                            <h1 className="w-2/3 text-xl font-bold flex self-center mx-3 ">
                                                {curelem}.
                                            </h1>
                                            <div className="flex place-content-end w-1/3 m-3">
                                                <button className="font-semibold 
                                                    text-xl p-3 mr-5 rounded-xl  bg-white h-12
                                                    hover:rounded-xl self-center
                                                  hover:text-black text-slate-400 cursor-pointer"
                                                    onClick={() => remove(index)}>
                                                    Remove</button>
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

export default Disp_feed;