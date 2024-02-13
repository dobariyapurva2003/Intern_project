import React, { useState } from "react";
import { ImEnter, ImSearch , IoMdPerson } from "react-icons/im";
import Landing_page from "./Landing_page";

const Navbar_normal = () => {

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


    return (
        <>
            <div className="bg-white h-full">
                <div>
                    <div className="bg-white shadow-xl flex flex-row h-20 items-center">
                        <div className="flex flex-col ml-8 justify-items-center">
                            <div className="w-36 overflow-hidden">
                                <img className="h-16" src="../Picture1.png" />
                            </div>
                        </div>

                        <div className="flex place-content-end w-1/3">
                            <div className="border-2 border-solid border-black font-bold text-base flex flex-row p-2 mr-5 rounded-full
                                 bg-white hover:bg-slate-200 self-center  
                                 cursor-pointer w-28 place-content-center">
                                <h2 className=""><a href="/choice">Sign in</a></h2>
                            </div>
                        </div>

                        <div className="w-2/3 flex flex-row ml-10 mr-24">
                            <div className="w-2/3">
                                <div className="flex flex-row bg-white h-12 rounded-full">
                                    <div className="w-4/5">
                                        <input type={'search'} value={search} id="search" name="search"
                                            className="h-12 w-full p-3 rounded-full  relative z-0"
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

export default Navbar_normal;