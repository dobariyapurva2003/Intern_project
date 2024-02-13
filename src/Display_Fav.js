import React from "react";
import { useState, useEffect } from "react";
import Navbar_component from "./Navbar_component";

const Display_Fav = (props) => {

    const [disp, setdisp] = useState([]);
    const [show, setshow] = useState([]);
    const [result, setresult] = useState([]);
    const [less_show, set_less_show] = useState(true);

    const callDisp = async () => {
        const email = props.user.email;
        console.log(email);
        try {
            const res = await fetch("/disp_fev", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
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
    }, [props.user.email]);



    const remove = async (index) => {
        const email = props.user.email;
        const title = disp[index].title;
        const topic = disp[index].topic;
        const language = disp[index].language;
        console.log(title);
        const res = await fetch("/favourites", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, title, topic, language
            })
        });
        const data = await res.json();
        if (!res.status === 200 || !data) {
            window.alert("title not removed");
        } else {
            window.alert("title removed from favourites!");
            // setisFavourite(true);
            window.location = "/display";
            console.log("title removed.");
        }
    }


    const getMore = async (index) => {
        //window.alert(disp[index].topic);
        const topic = disp[index].topic;
        const lan = disp[index].language;
        const wanted_title = disp[index].title;
        console.log(topic);
        console.log(lan);
        console.log(wanted_title);
        const response1 = await fetch(`https://newsapi.org/v2/everything?q=${topic}&sortBy=relevancy&language=${lan}&apiKey=a466305c62384973907af3f9184c4e75`);
        const data1 = await response1.json();
        setshow(data1);
        console.log(show);
        
        data1.articles.forEach((elem) => {
            if (wanted_title === elem.title) {
                console.log(elem);
                setresult(elem);
                console.log(result);
                window.alert("founded");
                set_less_show(false);
            }
        })

        console.log("finished");


    }






    return (
        <>
            {less_show && (
                <div className="bg-white h-screen" >
                    <div>
                        <Navbar_component user={props.user} />
                    </div>
                    <div className="grid grid-cols-6 mt-10">
                        {Object.keys(disp).length > 0 ?
                            disp.map((curelem, index) => {
                                return (

                                    <div>
                                        <div key={index} className="border-2 border-black 
                                            m-5 flex flex-col rounded-lg shadow-md shadow-black">

                                            <h1 className="w-2/3 text-xl font-bold flex self-center mx-3 ">
                                                {curelem.title}.

                                            </h1>
                                            <div className="flex flex-row justify-between mb-3 mt-6">
                                                <div>
                                                    <button onClick={() => getMore(index)} className="text-base hover:text-black text-slate-500 ml-3">
                                                        View more...</button>
                                                </div>
                                                <div className="">
                                                    <button className="font-semibold 
                                                        text-base mr-2 hover:text-black text-slate-500
                                                        cursor-pointer" onClick={() => remove(index)}>
                                                        Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : <><div className="h-screen flex w-full">
                                <div className=" w-full flex justify-center">
                                    <div className="grid grid-col-1 content-center text-5xl font-bold">
                                        No Article Liked Yet
                                    </div>
                                </div>
                            </div></>
                        }
                    </div>
                </div>
            )}


            {!less_show && (
                <div>
                    {/* from more showing */}
                    <div>
                        <div className="bg-white h-screen">
                            <div className="border-2 border-black m-5
                                  rounded-lg shadow-md shadow-black flex flex-row">
                                <div className="m-3">
                                    <div className="bg-slate-200 p-3 rounded-md text-xl font-bold">
                                        {result.title}
                                    </div>
                                    <div className="m-3 font-semibold">
                                        <h2 className="font-bold">Description : </h2>
                                        {result.description}
                                    </div>
                                    <div className="m-3 font-semibold">
                                        <h2 className="font-bold">Content : </h2>
                                        {result.content}
                                    </div>
                                    <div className="m-3 flex flex-row">
                                        <h2 className="font-bold">Publishing Date : </h2>
                                        <div className="ml-5 font-semibold">{result.publishedAt}</div>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex justify-end">
                                            <div className=" ml-3 my-3 font-semibold cursor-pointer">
                                                <a href={result.url}> <button className="text-xl hover:border-b-2 border-solid border-black
                                                 hover:text-black text-slate-500" >
                                                    Read more</button> </a>

                                            </div>
                                        </div>
                                        <div className="">
                                            <button className="text-xl hover:border-b-2 border-solid border-black
                                                 hover:text-black text-slate-500 font-semibold"
                                                onClick={() => { set_less_show(!less_show) }}>
                                                View less...</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-3 flex w-1/2">
                                    <img className="rounded-xl w-full"
                                        src={result.urlToImage} alt="Not available"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Display_Fav;