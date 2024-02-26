import React from "react";
import { useState, useEffect } from "react";

const Disp_save = (props) => {

    const [disp, setdisp] = useState([]);
    const callDisp = async () => {
        const email = props.user.email;
        const topic = props.get_topic;
        console.log(email);
        console.log(topic);
        try {
            const res = await fetch("/disp_save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, topic
                })
            });
            const data = await res.json();
            setdisp(data);
            console.log(disp);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callDisp();
    }, [props.user.email, props.get_topic]);



    const removeArt = async (index) => {
        const email = props.user.email;
        const title = disp[index].title;
        const topic = disp[index].topic;
        const language = disp[index].language;
        const description = disp[index].description;
        const content = disp[index].content;
        const url = disp[index].url;
        const urlToImage = disp[index].urlToImage;
        const publishedAt = disp[index].publishedAt;
        console.log(title);
        console.log(publishedAt);
        const res = await fetch("/removeArt", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, topic, title, language, description, content, url, urlToImage, publishedAt
            })
        });
        const data = await res.json();
        if (!res.status === 200 || !data) {
            window.alert(data.message);
        } else {
            window.alert(data.message);
            // setisFavourite(true);
            window.location = "/folder";
            console.log("Article removed.");
        }
    }

    return (
        <>
            <div className="bg-white">
                <div className="flex flex-col">
                    <div className="flex justify-end w-full">
                        <div className="flex place-content-end w-1/3 m-3">
                            <a href="/folder"> <button className="font-semibold 
                             text-xl p-3 mr-5 rounded-xl  bg-slate-200 h-12
                              hover:rounded-xl hover:bg-white self-center
                              hover:text-black cursor-pointer" >
                                Folders</button> </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mt-10">
                        {Object.keys(disp).length > 0 ?
                            disp.map((curelem, index) => {
                                return (
                                    <div key={index} className="border-2 border-black m-5
                                  rounded-lg shadow-md shadow-black">
                                        <div className="flex flex-col">
                                            <div className=" w-full h-full">
                                                <img className=" w-full"
                                                    src={curelem.urlToImage} alt="Not available"></img>
                                            </div>
                                            <div className="bg-slate-200 my-2 p-3 rounded-md text-xl font-bold">
                                                {curelem.title}
                                            </div>
                                            <div className="m-3 font-semibold">
                                                <h2 className="font-bold">Description : </h2>
                                                {curelem.description}
                                            </div>
                                            <div className="m-3 font-semibold">
                                                <h2 className="font-bold">Content : </h2>
                                                {curelem.content}
                                            </div>
                                            <div className="m-3 flex flex-row">
                                                <h2 className="font-bold">Publishing Date : </h2>
                                                <div className="ml-5 font-semibold">{curelem.publishedAt}</div>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <div className="flex justify-end">
                                                    <div className="ml-5 my-3 font-semibold cursor-pointer">
                                                        <a href={curelem.url}> <button className="text-xl hover:border-b-2 border-solid border-black
                                                 hover:text-black text-slate-500" >
                                                            Read more</button> </a>
                                                    </div>
                                                </div>
                                                <div className="flex place-content-end w-1/3 mx-5">
                                                    <button className="text-xl hover:border-b-2 border-solid border-black
                                                 hover:text-black text-slate-500 font-semibold" onClick={() => removeArt(index)}>
                                                        Remove</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                );
                            }) : <><div className="h-screen flex w-full">
                                <div className=" w-full flex justify-center">
                                    <div className="grid grid-col-1 content-center text-5xl font-bold">
                                        No Article Saved Yet
                                    </div>
                                </div>
                            </div></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Disp_save;