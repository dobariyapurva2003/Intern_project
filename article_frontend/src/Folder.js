import React, { useState, useEffect } from "react";
import Navbar_component from "./Navbar_component";
import { ImFolder } from "react-icons/im";
import { Navigate } from "react-router-dom";
import Disp_save from "./Disp_save";
const address = process.env.REACT_APP_BACKEND_URL;


const Folder = (props) => {

    const [get_topic, set_get_topic] = useState("");
    const [get_save_topic, set_get_save_topic] = useState([]);
    const [visible, set_visible] = useState(false);

    const call = (eve) => {
        console.log(eve);
        set_get_topic(eve);
        // window.alert(get_topic);
        set_visible(!visible);
    }


    const callDisp = async () => {
        const email = props.user.email;
        console.log(email);
        try {
            const res = await fetch(`${address}/get_save_topics`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });
            const data = await res.json();
            set_get_save_topic(data);
            console.log(get_save_topic);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callDisp();
    }, [props.user.email]);

    return (
        <>
            {!visible && (
                <div className="bg-white pb-16 flex flex-col">
                    <div className="">
                        <Navbar_component user={props.user} />
                    </div>
                    <div className="grid grid-cols-3 justify-items-center mt-16 px-36 h-screen">
                        {Object.keys(get_save_topic).length > 0 ?
                            get_save_topic.map((curelem, index) => {
                                return (
                                    <div key={index} className="flex flex-col w-36 h-36">
                                        <div className="h-full w-full flex -mb-3">
                                            <button onClick={() => { call(`${curelem}`) }} className="h-full w-full">
                                                <ImFolder className="h-full w-full" />
                                            </button>
                                        </div>
                                        <div className="flex justify-center mt-3 text-xl font-semibold">
                                            {curelem}
                                        </div>
                                    </div>
                                );
                            }) : <>
                            <div className="h-screen flex w-full">
                                <div className=" w-full flex justify-center">
                                    <div className="grid grid-col-1 content-center text-5xl font-bold">
                                        No Article Saved Yet
                                    </div>
                                </div>
                            </div></>
                        }
                    </div>
                </div>
            )}

            {visible && (
                <div className="bg-white">
                    <div className="mb-10">
                        <Disp_save user={props.user} get_topic={get_topic} />
                    </div>
                </div>
            )}

        </>
    )
}

export default Folder;