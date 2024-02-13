import React from "react";
import { useState, useEffect } from "react";
const Branch = (props) => {


    const [Show, setShow] = useState(false);
    const [ForUsers, setForUsers] = useState(false);
    const [search, setsearch] = useState("");
    const [branch, setBranch] = useState("");
    const [dispTopics, setDispTopics] = useState([]);
    const [dispTopicsForUsers, setDispTopicsForUsers] = useState([]);

    const postTopic = async () => {
        const username = props.admin_user.username;
        const topic = search;
        const branchSent = branch;
        const response1 = await fetch(`https://newsapi.org/v2/everything?q=${search}&sortBy=relevancy&language=en&apiKey=a466305c62384973907af3f9184c4e75`);
        const data1 = await response1.json();
        console.log(data1);
        const data = data1.articles;
        console.log(data);
        if (data.length === 0) {
            window.alert("This topic is not available. Try another one..");
        }
        else {
            const response = await fetch("/postTopic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, topic, branchSent })
            });
            const data = await response.json();
            console.log(data);
            if (response.status === 422 || !data) {
                window.alert("Topic is already exist in DB. Topic not stored in DB!!");
                console.log("Topic not stored in DB!!");
            } else {
                window.alert("Topic stored in DB successfully");
                console.log("Topic stored in DB successfully");
                window.location = "/set_topic";
            }
        }
    }


    const remove = async (index) => {
        const username = props.admin_user.username;
        const branchSent = branch;
        const topic = dispTopics[index];
        console.log(topic);
        const res = await fetch("/removeTopic", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, branchSent, topic
            })
        });
        const data = await res.json();
        if (!res.status === 200 || !data) {
            window.alert("topic not removed from DB");
        } else {
            window.alert("topic removed from DB!");
            window.location = "/set_topic";
            console.log("topic removed.");
        }
    }

    const removeForUser = async (index) => {
        const username = props.admin_user.username;
        const branchSent = branch;
        const topic = dispTopics[index];
        console.log(topic);
        const res = await fetch("/removeTopicForUsers", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, branchSent, topic
            })
        });
        const data = await res.json();
        if (!res.status === 200 || !data) {
            window.alert("topic not removed for Users");
        } else {
            window.alert("topic removed for Users");
            console.log("topic removed.");
            window.location = "/set_topic";
        }
    }

    const TopicsSet = async (index) => {
        const username = props.admin_user.username;
        const branchSent = branch;
        const topic = dispTopics[index];
        console.log(topic);
        try {
            const res = await fetch("/set_topics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, branchSent, topic
                })
            }).then((res) => res.json());
            if (res.status !== 200) {
                window.alert(res.message);
            }
            else {
                window.alert("Topics Updated successfully!!");
                window.location = "/set_topic";
            }
        } catch (err) {
            console.log(err);
        }
    }


    const showData = async (eve) => {
        const branchSent = eve;
        const response = await fetch("/showTopic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ branchSent })
        });
        const data = await response.json();
        console.log(data);
        setDispTopics(data);
        if (response.status === 422 || !data) {
            console.log("Topic not showed in screen!!");
        } else {
            console.log("Topic showed in screen!!");
        }

    }
    // useEffect(() => {
    //     showData();
    // }, [branch]);

    const DispTopics = async () => {
        const branchSent = branch;
        const response = await fetch("/showTopicForUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ branchSent })
        });
        const data = await response.json();
        console.log(data);
        setDispTopicsForUsers(data);
        if (response.status === 422 || !data) {
            console.log("Topic not showed in screen For Users!!");
        } else {
            console.log("Topic showed in screen For Users!!");
        }
    }



    return (
        <>
            <div>
                {!Show && (
                    <div className="flex background_home h-screen flex-col">
                        <div className="flex justify-end w-full">
                            <div className="flex place-content-end w-1/3 m-3">
                                <a href="/After_login_admin"> <button className="font-semibold 
                             text-xl p-3 mr-5 rounded-xl  bg-yellow-200 h-12
                              hover:rounded-xl hover:bg-white self-center
                              hover:text-black cursor-pointer" >
                                    Back</button> </a>
                            </div>
                        </div>
                        <div className="h-full w-full flex justify-center">
                            <div className=" w-1/2 flex justify-center">
                                <div className="bg-pink-100 h-[670px] -mt-10 rounded-xl shadow-lg shadow-black w-full grid grid-cols-1 place-items-center gap-4 content-center">
                                    <div className="bg-yellow-100 hover:bg-white w-1/3 flex justify-items-center h-14 rounded-md shadow-md shadow-black" >
                                        <button onClick={() => { setShow(!Show); setBranch("technology"); showData("technology"); setForUsers(false) }}
                                            className="w-full font-semibold" >Information Technology</button>
                                    </div>
                                    <div className="bg-yellow-100 hover:bg-white w-1/3 flex justify-items-center h-14 rounded-md shadow-md shadow-black" >
                                        <button onClick={() => { setShow(!Show); setBranch("mechanical"); showData("mechanical"); setForUsers(false) }}
                                            className="w-full font-semibold" >Mechanical</button>
                                    </div>
                                    <div className="bg-yellow-100 hover:bg-white w-1/3 flex justify-items-center h-14 rounded-md shadow-md shadow-black" >
                                        <button onClick={() => { setShow(!Show); setBranch("electronics"); showData("electronics"); setForUsers(false) }}
                                            className="w-full font-semibold">Electronics</button>
                                    </div>
                                    <div className="bg-yellow-100 hover:bg-white w-1/3 flex justify-items-center h-14 rounded-md shadow-md shadow-black" >
                                        <button onClick={() => { setShow(!Show); setBranch("chemical"); showData("chemical"); setForUsers(false) }}
                                            className="w-full font-semibold">Chemical</button>
                                    </div>
                                    <div className="bg-yellow-100 hover:bg-white w-1/3 flex justify-items-center h-14 rounded-md shadow-md shadow-black" >
                                        <button onClick={() => { setShow(!Show); setBranch("civil"); showData("civil"); setForUsers(false) }}
                                            className="w-full font-semibold">Civil</button>
                                    </div>
                                    <div className="bg-yellow-100 hover:bg-white w-1/3 flex justify-items-center h-14 rounded-md shadow-md shadow-black" >
                                        <button onClick={() => { setShow(!Show); setBranch("instrumation"); showData("instrumation"); setForUsers(false) }}
                                            className="w-full font-semibold">Instrumation</button>
                                    </div>
                                    <div className="bg-yellow-100 hover:bg-white w-1/3 flex justify-items-center h-14 rounded-md shadow-md shadow-black" >
                                        <button onClick={() => { setShow(!Show); setBranch("politics"); showData("politics"); setForUsers(false) }}
                                            className="w-full font-semibold">Politics</button>
                                    </div>
                                    <div className="bg-yellow-100 hover:bg-white w-1/3 flex justify-items-center h-14 rounded-md shadow-md shadow-black" >
                                        <button onClick={() => { setShow(!Show); setBranch("health"); showData("health"); setForUsers(false) }}
                                            className="w-full font-semibold">Health</button>
                                    </div>
                                    <div className="bg-yellow-100 hover:bg-white w-1/3 flex justify-items-center h-14 rounded-md shadow-md shadow-black" >
                                        <button onClick={() => { setShow(!Show); setBranch("current"); showData("current"); setForUsers(false) }}
                                            className="w-full font-semibold">Current</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {Show && (
                    <div className="background_home">
                        <div className="flex flex-col">
                            <div className="flex justify-end w-full">
                                <div className="flex place-content-end w-1/3 m-3">
                                    <button onClick={() => { setShow(!Show) }}
                                        className="font-semibold 
                             text-xl p-3 mr-5 rounded-xl  bg-yellow-200 h-12
                              hover:rounded-xl hover:bg-white self-center
                              hover:text-black cursor-pointer" >
                                        Back</button>
                                </div>
                            </div>
                            <div className="flex flex-row w-2/3 rounded-lg ml-20">
                                <div className="w-5/6">
                                    <input type={'search'} value={search} id="search" name="search"
                                        className="h-12 border-2 border-solid w-full p-3 rounded-lg"
                                        onChange={(e) => setsearch(e.target.value)}
                                        placeholder="Search for topics.." />
                                </div>
                                <div className="flex justify-end w-2/3">
                                    <div className="flex place-content-end w-1/3">
                                        <button onClick={() => { postTopic() }}
                                            className="font-semibold 
                                         text-xl p-3 mr-5 rounded-xl  bg-yellow-100 h-12
                                             hover:rounded-xl hover:bg-white self-center
                                             hover:text-black cursor-pointer" >
                                            Post in DB</button>
                                    </div>
                                </div>
                            </div>
                            <div className="h-screen">
                                <div className="mt-10">
                                    {Object.keys(dispTopics).length > 0 ?
                                        dispTopics.map((curelem, index) => {
                                            return (
                                                <div key={index} className="border-2 border-black my-5 
                                                     rounded-lg shadow-md shadow-black mx-5
                                                     flex flex-row w-[1400px]">
                                                    <div className="flex justify-center self-center w-full
                                                    text-xl font-bold">
                                                        {curelem}
                                                    </div>
                                                    <div className="flex justify-end w-3/4">
                                                        <div className="flex place-content-end">
                                                            <button className="font-semibold 
                                                    text-md p-3 mr-5 rounded-xl  bg-yellow-100 h-12
                                                    hover:rounded-xl hover:bg-white self-center
                                                    hover:text-black cursor-pointer"
                                                                onClick={() => remove(index)}>
                                                                Remov from DB</button>
                                                        </div>
                                                        <div className="flex place-content-end m-3">
                                                            <button className="font-semibold 
                                                    text-md p-3 mr-5 rounded-xl  bg-yellow-100 h-12
                                                    hover:rounded-xl hover:bg-white self-center
                                                    hover:text-black cursor-pointer"
                                                                onClick={() => { TopicsSet(index); setForUsers(false) }}>
                                                                Add for users</button>
                                                        </div>
                                                        <div className="flex place-content-end">
                                                            <button className="font-semibold 
                                                    text-md p-3 mr-5 rounded-xl  bg-yellow-100 h-12
                                                    hover:rounded-xl hover:bg-white self-center
                                                    hover:text-black cursor-pointer"
                                                                onClick={() => { removeForUser(index); setForUsers(false) }}>
                                                                remove for users</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }) : <><div>waiting...</div></>
                                    }
                                </div>
                                <div className="mb-7">
                                    {!ForUsers && (
                                        <div>
                                            <div className="flex ml-20 mt-5 w-2/3">
                                                <div className="flex w-1/3">
                                                    <button onClick={() => { DispTopics(); setForUsers(!ForUsers) }}
                                                        className="font-semibold 
                                         text-xl p-3 mr-5 rounded-xl  bg-yellow-200 h-12
                                             hover:rounded-xl hover:bg-white self-center
                                             hover:text-black cursor-pointer" >
                                                        Show topics for Users</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {ForUsers && (
                                        <div>
                                            <div className="w-[1400px] border-2 border-black m-5 rounded-lg">
                                                {Object.keys(dispTopicsForUsers).length > 0 ?
                                                    dispTopicsForUsers.map((curelem, index) => {
                                                        return (
                                                            <div key={index} className=" m-5 h-8">
                                                                <div className="text-xl font-semibold">
                                                                    {curelem}
                                                                </div>

                                                            </div>
                                                        );
                                                    }) : <><div>waiting...</div></>
                                                }
                                            </div>
                                            <div>
                                                <div className="flex m-5 mt-5 w-2/3">
                                                    <div className="flex w-1/3">
                                                        <button onClick={() => { setForUsers(!ForUsers) }}
                                                            className="font-semibold 
                                         text-xl p-3 mr-5 rounded-xl  bg-yellow-200 h-12
                                             hover:rounded-xl hover:bg-white self-center
                                             hover:text-black cursor-pointer" >
                                                            Show less</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Branch;