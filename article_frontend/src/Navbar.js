import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImEnter, ImSearch } from "react-icons/im";
import { FcHome, FcAbout, FcTodoList, FcBusinessman, FcEditImage, FcUndo } from "react-icons/fc";
import After_login from "./After_login";
const Navbar = (props) => {

    const [topic, setTopic] = useState("default");
    const [lang, setLang] = useState("en");
    const [search, setsearch] = useState("");
    const [search_lang, setsearch_lang] = useState("en");
    const [total_topics, set_total_topics] = useState([]);
    const [Default, setDefault] = useState(false);


    const handleinp = (eve) => {
        eve.preventDefault();
        console.log(search);
        console.log(search_lang);
        setTopic(search);
        setLang(search_lang);
        setDefault(true);
    }





    

    const dispTopics = async () => {
        const branch = props.user.branch;
        console.log(branch);
        try {
            const res = await fetch("https://intern-project-qdst.onrender.com/disp_topics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    branch
                })
            }).then((res) => res.json());
            set_total_topics(res);
            console.log(total_topics);
        } catch (err) {
            console.log(err);
        }
    }





    useEffect(() => {
        dispTopics();
    }, [props.user.branch]);


    // This page is for doing validation and then allows user to proceed further

    const logout = async () => {
        try {
            const res = await fetch("https://intern-project-qdst.onrender.com/Logout", {
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
                    <div className="shadow-xl bg-white flex flex-row h-20 items-center">
                    
                        <div className="flex flex-col ml-8 justify-items-center">
                            <div className=" w-36 overflow-hidden">
                                <img className="h-16" src="../Picture1.png" />
                            </div>
                        </div>

                        <div className="w-48 ml-20">
                            <div className=" flex flex-row items-center justify-center border-2 border-solid border-black rounded-full">
                                <div className="h-12 w-12 rounded-full overflow-hidden mx-2">
                                    <img className="h-12" src="../user.jpg" />
                                </div>
                                <li className="dropdown mr-8">
                                    <div className="hover:cursor-pointer">
                                        <h1 className="font-medium text-md">
                                            {props.user.fullname}
                                        </h1>
                                        <h3 className="font-medium text-slate-600 text-sm">
                                            {props.user.email}
                                        </h3>
                                    </div>

                                    {/* drop down items */}

                                    <div class="dropdown-content">
                                        <a href="/view_profile">View Profile</a>
                                        <a href="/edit_profile">Edit Profile</a>
                                        <a href="/display">Wishlist</a>
                                        <a href="/folder">Folders</a>
                                        <a><button onClick={() => { logout() }}>Logout</button></a>
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
                                            <div className="text-2xl self-center bg-blue-300 p-3 rounded-full">
                                                <ImSearch />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="font-bold text-xl flex flex-row p-3 mr-5 rounded-xl h-12
                                             hover:rounded-xl bg-white hover:bg-yellow-50 self-center 
                                               cursor-pointer">
                                <div className="mr-2 my-1 text-2xl place-content-center">
                                    <div><ImSearch /></div>
                                </div>
                                <button onClick={handleinp} type="submit" value="submit">
                                    Search</button>
                            </div> */}

                        </div>
                    </div>
                </div>
                <div>
                    <After_login topic={topic} lang={lang} u_branch={props.user.branch} user={props.user} total_topics={total_topics} Default={Default} />
                </div>
            </div>
        </>
    )
}

export default Navbar;