import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FcSearch } from "react-icons/fc";
import { MdFeedback, MdClose, MdDataSaverOn } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
const After_login = (props) => {

    const [users, setUsers] = useState([]);
    const [feed, setfeed] = useState(false);
    const [saveFeed, set_saveFeed] = useState({ feedBack: "" });
    const [Users, setUser] = useState([]);
    let Default = props.Default;
    let topic = [];
    const [disp, setdisp] = useState([]);
    const [activeButton1, setActiveButton1] = useState("");
    const [activeButton2, setActiveButton2] = useState("");

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        set_saveFeed({ ...saveFeed, [name]: value });
    }

    const fetchData = async () => {
        topic = props.topic;

        if (props.topic === "default" || props.topic === "") {
            const response1 = await fetch(`https://newsapi.org/v2/everything?q=${props.u_branch}&sortBy=relevancy&language=en&apiKey=a466305c62384973907af3f9184c4e75`);
            const data1 = await response1.json();
            setUser(data1);
            console.log(data1);
        }
        else {
            const response1 = await fetch(`https://newsapi.org/v2/everything?q=${props.topic}&sortBy=relevancy&language=en&apiKey=a466305c62384973907af3f9184c4e75`);
            const data1 = await response1.json();
            setUser(data1);
            console.log(data1);
        }


        // if (props.topic === "default" || props.topic === "") {
        //     for (let i = 0; i < topic.length; i++) {
        //         const response1 = await fetch(`https://newsapi.org/v2/everything?q=${topic[i]}&sortBy=relevancy&language=${props.lang}&apiKey=a466305c62384973907af3f9184c4e75`);
        //         const data1 = await response1.json();
        //         setdisp(data1);
        //         console.log(data1);
        //         Users.push(data1);
        //     }
        //     console.log(Users);
        //     Default = false;
        // }
        // else {
        //     const response1 = await fetch(`https://newsapi.org/v2/everything?q=${props.topic}&sortBy=relevancy&language=${props.lang}&apiKey=a466305c62384973907af3f9184c4e75`);
        //     const data1 = await response1.json();
        //     setdisp(data1);
        //     console.log(data1);
        //     setUsers(data1);
        //     console.log(data1);

        // }


    }
    useEffect(() => {
        fetchData();
    }, [props.topic, props.lang, props.u_branch]);

    const postData = async (index) => {
        const email = props.user.email;
        var title = Users.articles[index].title;
        var topic = props.topic;

        // if (props.topic === "default") {
        //     topic = props.total_topics[index];
        //     title = Users[index].articles[ind].title;
        // }
        // else {
        //     title = users.articles[index].title;
        //     topic = props.topic;
        // }

        const language = props.lang;
        console.log(title);
        console.log(language);
        const res = await fetch("/favourites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, title, topic, language
            })
        });
        const data = await res.json();
        if (!res.status === 200 || !data) {
            window.alert("title not saved");
        } else {
            window.alert("title added to favourites!");
            // setisFavourite(true);
            console.log("title saved.");
        }
    }


    const saveArticle = async (index) => {
        const email = props.user.email;
        const topic = props.topic;
        const language = props.lang;
        var title = "";
        var description = "";
        var content = "";
        var url = "";
        var urlToImage = "";
        var publishedAt = "";


        title = Users.articles[index].title;
        description = Users.articles[index].description;
        content = Users.articles[index].content;
        url = Users.articles[index].url;
        urlToImage = Users.articles[index].urlToImage;
        publishedAt = Users.articles[index].publishedAt;

        // if (topic === "default") {
        //     title = Users[index].title;
        //     description = Users[index].description;
        //     content = Users[index].content;
        //     url = Users[index].url;
        //     urlToImage = Users[index].urlToImage;
        //     publishedAt = Users[index].publishedAt;
        // }
        // else {
        //     title = users.articles[index].title;
        //     description = users.articles[index].description;
        //     content = users.articles[index].content;
        //     url = users.articles[index].url;
        //     urlToImage = users.articles[index].urlToImage;
        //     publishedAt = users.articles[index].publishedAt;
        // }

        console.log(title);
        const res = await fetch("/saveArticle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, topic, title, language, description, content, url, urlToImage,
                publishedAt
            })
        });
        const data = await res.json();
        if (!res.status === 200 || !data) {
            window.alert(data.message);
        } else {
            window.alert(data.message);
            console.log("article saved.");
        }
    }



    const storeFeedback = async () => {
        const email = props.user.email;
        const { feedBack } = saveFeed;
        const response = await fetch("/storeFeed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ feedBack, email })
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 422 || !data) {
            window.alert("FeedBack not accepted!!");
            console.log("FeedBack not accepted!!");
        } else {
            window.alert("FeedBack accepted successfully");
            console.log("FeedBack accepted successfully");
            window.location = "/After_login";
        }
    }

    return (
        <>
            <div className="">
                <div className="flex flex-col">
                    {/* {Default && (
                        <div className="grid grid-cols-2 mt-10">
                            {Object.keys(users).length > 0 ?
                                users.articles.map((curelem, index) => {
                                    return (
                                        <div key={index} className="border-2 border-black m-5
                                  rounded-lg shadow-md shadow-black">
                                            <div className="m-3">
                                                <div className="bg-yellow-200 w-full flex justify-between p-3 rounded-md text-xl font-bold">
                                                    <div>
                                                        {curelem.title}
                                                    </div>
                                                    <div className="mx-3 grid grid-cols-2 text-2xl">
                                                        <button className="mx-2" onClick={() => { saveArticle(index); setActiveButton1(curelem) }}>
                                                            <div style={{ color: (activeButton1 === curelem ? 'red' : 'black') }}>
                                                                <MdDataSaverOn />
                                                            </div>
                                                        </button>
                                                        <button className="mx-2" onClick={() => { postData(index); setActiveButton2(curelem) }}>
                                                            <div style={{ color: (activeButton2 === curelem ? 'red' : 'black') }}>
                                                                <AiFillLike />
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="m-3 font-semibold">

                                                    {curelem.description}

                                                </div>
                                                <div className="m-3 flex flex-row">
                                                    <h2 className="font-bold">Publishing Date : </h2>
                                                    <div className="ml-5 font-semibold">{curelem.publishedAt}</div>
                                                </div>
                                                <div className="flex flex-row justify-start">
                                                    <div className="ml-5 my-3 font-semibold cursor-pointer">
                                                        <a href={curelem.url}> <button className="font-semibold 
                                                                             text-xl p-3 mr-5 rounded-xl  bg-yellow-200 h-12
                                                                                        hover:rounded-xl hover:bg-white self-center
                                                                                     hover:text-black cursor-pointer" >
                                                            Read more</button> </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                }) : <><div>waiting...</div></>
                            }
                        </div>
                    )} */}

                    {/* {!Default && ( */}

                    <div className="grid grid-cols-3 mt-10">

                        {Object.keys(Users).length > 0 ?
                            Users.articles.map((curelem, index) => {
                                return (


                                    <div key={index} className="border-2 border-black m-5
                                                                 rounded-lg shadow-md shadow-black">
                                        <div className="m-3">
                                            <div>
                                                <img src={curelem.urlToImage} alt="Not available"></img>
                                            </div>
                                            <div className="bg-slate-200 w-full flex justify-between p-3 rounded-md text-xl font-bold">
                                                <div>
                                                    <a href={curelem.url} className="hover:border-b-2 
                                                                                  border-solid border-gray-500">
                                                        {curelem.title}
                                                    </a>
                                                </div>
                                                {/* <div className="mx-3 grid grid-cols-2 text-2xl">
                                                                        <button className="mx-2" onClick={() => { saveArticle(index, ind); setActiveButton1(elem) }}>
                                                                            <div style={{ color: (activeButton1 === elem ? 'red' : 'black') }}>
                                                                                <MdDataSaverOn />
                                                                            </div>
                                                                        </button>
                                                                        <button className="mx-2" onClick={() => { postData(index, ind); setActiveButton2(elem) }}>
                                                                            <div style={{ color: (activeButton2 === elem ? 'red' : 'black') }}>
                                                                                <AiFillLike />
                                                                            </div>
                                                                        </button>
                                                                    </div> */}
                                            </div>
                                            <div className="m-3 font-semibold">
                                                {curelem.description}
                                            </div>
                                            <div className="m-3 flex flex-row">
                                                <h2 className="font-bold">Publishing Date : </h2>
                                                <div className="ml-5 font-semibold">{curelem.publishedAt}</div>
                                            </div>
                                            {/* <div className="flex flex-row justify-start">
                                                                    <div className="ml-5 my-3 font-semibold cursor-pointer">
                                                                        <a href={elem.url}> <button className="font-semibold 
                                                                             text-xl p-3 mr-5 rounded-xl  bg-slate-100 h-12
                                                                                        hover:rounded-xl hover:bg-slate-200 self-center
                                                                                     hover:text-black cursor-pointer" >
                                                                            Read more</button> </a>
                                                                    </div>
                                                                </div> */}
                                            <div className="flex flex-row justify-between">
                                                <div>
                                                    <button className="ml-3  text-xl hover:border-b-2 border-solid border-slate-400"
                                                        onClick={() => { saveArticle(index); setActiveButton1(curelem) }}>
                                                        Save</button>
                                                </div>
                                                <div>
                                                    <button className="ml-3  text-xl hover:border-b-2 border-solid border-slate-400"
                                                        onClick={() => { postData(index); setActiveButton2(curelem) }}>
                                                        Like</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                );
                            }) : <><div>waiting...</div></>
                        }


                        {/* Insert code here */}

                    </div>


                </div>

                {!feed && (
                    <div className="w-44 bg-white shadow-xl shadow-black h-16 feedback flex flex-row justify-evenly
                 self-center rounded-lg">
                        <div className="flex self-center text-3xl">
                            <MdFeedback />
                        </div>
                        <button className="text-xl" onClick={() => { setfeed(!feed) }}>
                            Give Feedback
                        </button>
                    </div>
                )}

                {feed && (
                    <div className="feedback_form">
                        <form>
                            <div className="w-72 h-52 bg-red-200 flex flex-col 
                            rounded-lg shadow-xl shadow-black">
                                <div className="my-3 mr-3 flex self-end place-items-center">
                                    <button onClick={() => { setfeed(!feed) }}>
                                        <MdClose className="bg-red-400" />
                                    </button>
                                </div>
                                <div className="w-full h-3/4 rounded-lg p-3">
                                    <textarea type="text" className="rounded-lg w-full 
                                      h-full p-3" name="feedBack" value={saveFeed.feedBack}
                                        onChange={handleInputs}
                                        placeholder="Enter your feedback.."></textarea>
                                </div>
                                <div className="h-1/4 w-1/3 rounded-xl my-3 mr-3 
                                bg-yellow-100 flex self-end place-items-center">
                                    <button onClick={() => { storeFeedback() }} className="w-full h-full" value="submit">
                                        Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </>
    )
}

export default After_login;
