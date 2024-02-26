import React from "react";
import Navbar_component from "./Navbar_component";
import { useState } from "react";
import { useEffect, useAlert } from "react";
const Edit = (props) => {

    const user = props.user;
    const [userdata, setuserdata] = useState(props.user);
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setuserdata({ ...userdata, [name]: value });
    }

    const patchData = async (e) => {
        e.preventDefault();
        const oldemail = props.user.email;
        const { fullname, email, username, branch } = userdata;
        try {
            const res = await fetch("/updateUser", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oldemail, fullname, email, username, branch
                })
            })
            const data = await res.json();
            if (!res.status === 200 || !data) {
                window.alert("user not updated");
            }
            else {
                window.alert("user updated successfully.");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="flex flex-col bg-white h-screen">
                <div>
                    <Navbar_component user={user} />
                </div>
                <div className="flex flex-row h-screen">
                    <div className=" w-1/3 flex place-items-center ml-36">
                        <img className="h-2/3 rounded-lg shadow-sm shadow-black"
                            src="../view_profile(3).jpg" alt="loading"></img>
                    </div>
                    <div className=" flex justify-center items-center w-2/3">
                        <div className="ml-28 w-2/3 h-5/6 shadow-lg shadow-black bg-slate-200 rounded-md flex justify-center">
                            <div className="flex flex-col justify-evenly w-full">
                                <form className="flex justify-around flex-col">
                                    {/* <div className="rounded-full bg-slate-400 w-1/4">
                                    <img src={pic} />
                                </div> */}
                                    <div className="flex justify-between  my-3">
                                        <h1 className="text-xl font-bold ml-8 mb-4">Name </h1>
                                        <input type="text" name="fullname"
                                            value={userdata.fullname}
                                            onChange={handleInputs}
                                            id="fullname" className="mx-8 h-10 border-black
                                                 border-2 rounded-lg"></input>
                                    </div>
                                    <div className="flex  justify-between   my-3">
                                        <h1 className="text-xl font-bold mb-4 ml-8">Email </h1>
                                        <input type="email"
                                            name="email"
                                            id="email"
                                            onChange={handleInputs}
                                            value={userdata.email}
                                            className="mx-8 h-10 border-black
                                                 border-2 rounded-lg"></input>
                                    </div>
                                    <div className="flex  justify-between   my-3">
                                        <h1 className="text-xl font-bold ml-8 mb-4">Username </h1>
                                        <input type="text" 
                                            name="username"
                                            id="username"
                                            onChange={handleInputs}
                                            value={userdata.username}
                                            className="mx-8 h-10 border-black
                                                 border-2 rounded-lg"></input>
                                    </div>
                                    <div className="flex flex-row my-3 ">
                                            <div>
                                                <h1 className="text-xl font-bold ml-8 mb-4">Intrested Topic : </h1>
                                            </div>
                                            <div className="ml-56 border-2 border-solid border-black h-fit rounded-sm">
                                                <select onChange={handleInputs} name="branch">
                                                    <option value="health" id="health">
                                                        Health</option>
                                                    <option value="sports" id="sports">
                                                        Sports</option>
                                                    <option value="art" id="art">
                                                        Art</option>
                                                    <option value="education" id="education">
                                                        Education</option>
                                                    <option value="politics" id="politics">
                                                        Politics</option>
                                                    <option value="technology" id="technology">
                                                        Technology</option>
                                                </select>
                                            </div>

                                            {/* <div className="flex flex-col font-semibold text-md">
                                                <div className="flex flex-row mx-8">
                                                    <div className="flex flex-row mr-4">
                                                        <div className="grid grid-cols-1 content-center">
                                                            <label>Technology</label>
                                                        </div>
                                                        <div className="grid grid-cols-1 content-center">
                                                            <input onChange={handleInputs} type="radio"
                                                                name="branch"
                                                                id="technology" value="technology"
                                                                className="ml-2 h-10 border-black
                                                             border-2 rounded-lg"></input>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row mr-4">
                                                        <div className="grid grid-cols-1 content-center">
                                                            <label>Mechanical</label>
                                                        </div>
                                                        <div className="grid grid-cols-1 content-center">
                                                            <input onChange={handleInputs} type="radio"
                                                                name="branch"
                                                                id="mechanical" value="mechanical"
                                                                className="ml-2 h-10 border-black
                                                             border-2 rounded-lg"></input>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row mr-4">
                                                        <div className="grid grid-cols-1 content-center">
                                                            <label>Electronics</label>
                                                        </div>
                                                        <div className="grid grid-cols-1 content-center">
                                                            <input onChange={handleInputs} type="radio"
                                                                name="branch"
                                                                id="electronics" value="electronics"
                                                                className="ml-2 h-10 border-black
                                                             border-2 rounded-lg"></input>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row mr-4">
                                                        <div className="grid grid-cols-1 content-center">
                                                            <label>Chemical</label>
                                                        </div>
                                                        <div className="grid grid-cols-1 content-center">
                                                            <input onChange={handleInputs} type="radio"
                                                                name="branch"
                                                                id="chemical" value="chemical"
                                                                className="ml-2 h-10 border-black
                                                             border-2 rounded-lg"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row mx-8">
                                                    <div className="flex flex-row mr-4">
                                                        <div className="grid grid-cols-1 content-center">
                                                            <label>Civil</label>
                                                        </div>
                                                        <div className="grid grid-cols-1 content-center">
                                                            <input onChange={handleInputs} type="radio"
                                                                name="branch"
                                                                id="civil" value="civil"
                                                                className="ml-2 h-10 border-black
                                                             border-2 rounded-lg"></input>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row mr-4">
                                                        <div className="grid grid-cols-1 content-center">
                                                            <label>Instrumation</label>
                                                        </div>
                                                        <div className="grid grid-cols-1 content-center">
                                                            <input onChange={handleInputs} type="radio"
                                                                name="branch"
                                                                id="instrumation" value="instrumation"
                                                                className="ml-2 h-10 border-black
                                                             border-2 rounded-lg"></input>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row mr-4">
                                                        <div className="grid grid-cols-1 content-center">
                                                            <label>Politics</label>
                                                        </div>
                                                        <div className="grid grid-cols-1 content-center">
                                                            <input onChange={handleInputs} type="radio"
                                                                name="branch"
                                                                id="politics" value="politics"
                                                                className="ml-2 h-10 border-black
                                                             border-2 rounded-lg"></input>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row mr-4">
                                                        <div className="grid grid-cols-1 content-center">
                                                            <label>Health</label>
                                                        </div>
                                                        <div className="grid grid-cols-1 content-center">
                                                            <input onChange={handleInputs} type="radio"
                                                                name="branch"
                                                                id="health" value="health"
                                                                className="ml-2 h-10 border-black
                                                             border-2 rounded-lg"></input>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row mr-4">
                                                        <div className="grid grid-cols-1 content-center">
                                                            <label>Current news</label>
                                                        </div>
                                                        <div className="grid grid-cols-1 content-center">
                                                            <input onChange={handleInputs} type="radio"
                                                                name="branch"
                                                                id="current" value="current"
                                                                className="ml-2 h-10 border-black
                                                             border-2 rounded-lg"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                        </div>
                                    <div className="text-md ml-8 mt-16 flex justify-center">
                                        <button onClick={patchData} className="bg-white hover:bg-slate-100 rounded-md 
                                            cursor-pointer px-4 w-1/5 py-3 border-2 border-black" type="submit"
                                            name="submit" id="submit" value="Edit">Edit </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Edit;