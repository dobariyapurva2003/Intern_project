import React from "react";
import Navbar_component from "./Navbar_component";
import pic from "./logo192.png";

const View = (props) => {
    const userdata = props.user;

    return (
        <>
            <div className="flex flex-col bg-white h-screen">
                <div>
                    <Navbar_component user={userdata} />
                </div>
                <div className="flex flex-row h-screen">
                    <div className=" flex justify-center items-center w-2/3">
                        <div className="w-1/2 h-2/3 bg-slate-200 shadow-md shadow-black rounded-md flex justify-center">
                            <div className="flex flex-col justify-evenly w-full">
                                <div className="flex justify-around flex-col">
                                    {/* <div className="rounded-full bg-slate-400 w-1/4">
                                    <img src={pic} />
                                </div> */}
                                    <div className="flex justify-between  my-3">
                                        <h1 className="text-xl font-bold ml-8 mb-4">Name </h1>
                                        <h2 type="text" name="fullname"
                                            id="fullname" className="mx-8 h-10 text-xl
                                        font-semibold rounded-lg"> {userdata.fullname}  </h2>
                                    </div>
                                    <div className="flex  justify-between   my-3">
                                        <h1 className="text-xl font-bold mb-4 ml-8">Email </h1>
                                        <h2 type="email"
                                            name="email"
                                            id="email"
                                            className="mx-8 h-10 text-xl
                                        font-semibold rounded-lg"> {userdata.email} </h2>
                                    </div>
                                    <div className="flex  justify-between   my-3">
                                        <h1 className="text-xl font-bold ml-8 mb-4">Username </h1>
                                        <h2 type="text"
                                            name="username"
                                            id="username"
                                            className="mx-8 h-10 text-xl
                                        font-semibold rounded-lg"> {userdata.username} </h2>
                                    </div>
                                    <div className="flex  justify-between   my-3">
                                        <h1 className="text-xl font-bold ml-8 mb-4">Intrested Topic </h1>
                                        <h2 type="text"
                                            name="username"
                                            id="username"
                                            className="mx-8 h-10 text-xl
                                        font-semibold rounded-lg"> {userdata.branch} </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-1/3 flex place-items-center -ml-20">
                        <img className="h-2/3 rounded-lg shadow-sm shadow-black"
                            src="../view_profile(2).jpg" alt="loading"></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View;