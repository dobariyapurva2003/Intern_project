import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImEnter, ImSearch } from "react-icons/im";
import { FcHome, FcAbout, FcTodoList, FcBusinessman, FcEditImage, FcUndo } from "react-icons/fc";
import After_login from "./After_login";
import Landing_page from "./Landing_page";
const Navbar_admin = (props) => {

    const [topic, setTopic] = useState("food");
    const [lang, setLang] = useState("en");
    const [search, setsearch] = useState("");
    const [search_lang, setsearch_lang] = useState("en");

    const handleinp = (eve) => {
        eve.preventDefault();
        console.log(search);
        console.log(search_lang);
        setTopic(search);
        setLang(search_lang);
    }

    // This page is for doing validation and then allows user to proceed further

    const logout = async () => {
        try {
            const res = await fetch("/Logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                credentials: "include"
            })
            if (res.status === 200) {
                window.alert("Logout");
                window.location = "/";
            } else {
                window.alert("logout failed");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="bg-white h-full">
                <div>
                    <div className="shadow-xl bg-white  flex flex-row h-20 items-center">

                        <div className="flex flex-col ml-8 justify-items-center ">
                            <div className=" w-36 overflow-hidden">
                                <img className="h-16" src="../Picture1.png" />
                            </div>
                        </div>

                        <div className="ml-20">
                            <div className="flex flex-row items-center justify-center border-2 border-solid border-black rounded-full">
                                <div className="h-12 w-12 rounded-full overflow-hidden mx-2">
                                    <img className="h-12" src="../user.jpg" />
                                </div>
                                <li className="dropdown mr-8">
                                    <div className="hover:cursor-pointer">
                                        <h1 className="font-medium text-md">
                                            {props.admin_user.username}
                                        </h1>
                                    </div>

                                    {/* drop down items */}

                                    <div class="dropdown-content">
                                        <a href="/displayFeedback">FeedBacks</a>
                                        {/* <a href="/set_topic">Set topics</a> */}
                                        <a href="/usr_acnt">User accounts</a>
                                        <a>
                                            <button onClick={() => { logout() }}>Logout</button></a>
                                    </div>
                                </li>
                            </div>
                        </div>

                        <div className="w-2/3 flex flex-row ml-36 mr-24">
                            <div className="w-3/4">
                                <div className="flex flex-row bg-white h-12 rounded-full">
                                    <div className="w-2/3">
                                        <input type={'search'} value={search} id="search" name="search"
                                            className="h-12 w-full p-3 rounded-full relative z-0"
                                            onChange={(e) => setsearch(e.target.value)}
                                            placeholder="Search for news.." />
                                    </div>
                                    <div className="absolute z-10 ml-96">
                                        <button onClick={handleinp} type="submit" value="submit">
                                            <div className="text-2xl self-center bg-blue-300 rounded-full p-3">
                                                <div><ImSearch /></div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
                <div>
                    <Landing_page topic={topic} lang={lang} />
                </div>
            </div>
        </>
    )
}

export default Navbar_admin;