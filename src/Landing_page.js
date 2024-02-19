import React from "react";
import Navbar_normal from "./Navbar_normal";
import { useState, useEffect } from "react";

const Landing_page = (props) => {
    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        const response1 = await fetch(`https://newsapi.org/v2/everything?q=${props.topic}&sortBy=relevancy&language=en&apiKey=a466305c62384973907af3f9184c4e75`);
        const data1 = await response1.json();
        setUsers(data1);
        console.log(data1);
    }
    useEffect(() => {
        fetchData();
    }, [props.topic, props.lang]);

    return (
        <>
            <div className="grid grid-cols-6 mt-10">
                {Object.keys(users).length > 0 ?
                    users.articles.map((curelem, index) => {
                        return (
                            <div key={index} className="m-5 hover:shadow-lg hover:shadow-black
                                     rounded-lg shadow-sm shadow-black bg-slate-100">
                                <div className="">
                                    <div className="">
                                        <img src={curelem.urlToImage} alt="Not available"></img>
                                    </div>
                                    <div className="p-3 rounded-md text-xl font-bold">
                                        <a href={curelem.url} className="hover:border-b-2 
                                        border-solid border-gray-500">
                                            {curelem.title}
                                        </a>
                                    </div>
                                    <div className="m-2">
                                    {curelem.content}
                                    </div>
                                </div>
                            </div>

                        );
                    }) : <><div>waiting...</div></>
                }
            </div>
        </>
    )
}

export default Landing_page;