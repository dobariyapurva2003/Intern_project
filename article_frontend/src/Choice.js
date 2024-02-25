import React from "react";

const Choice = () => {
    return (
        <>

            <div className="bg-white">

                <div className="flex flex-row">
                    <div className="w-1/2 ml-16 h-screen flex items-center justify-center">
                        <div className="shadow-black rounded-full shadow-2xl w-3/4 h-3/4">
                            <img className="h-full w-full rounded-full" src="../bg3.jpg"></img>
                        </div>
                    </div>
                    <div className=" w-1/2 h-screen flex justify-center items-center">
                        <div className="w-2/3 h-2/3 bg-slate-200 rounded-md flex justify-center">
                            <div className="flex flex-col justify-evenly w-full">
                                <form>
                                    <div className="flex justify-center place-items-center h-12 flex-col my-16">
                                        <a className="text-xl flex place-content-around py-2
                                             rounded-lg hover:bg-slate-100 h-full shadow-md shadow-black bg-white w-1/3" href="/first">User</a>
                                    </div>
                                    <div className="flex justify-center place-items-center h-12 flex-col my-16">
                                        {/* <a className="text-xl flex place-content-around py-2
                                             rounded-lg hover:bg-slate-100 shadow-md shadow-black
                                              h-full bg-white w-1/3" href="/admin">Admin</a> */}
                                              <a className="text-xl flex place-content-around py-2
                                             rounded-lg hover:bg-slate-100 shadow-md shadow-black
                                              h-full bg-white w-1/3" href="">Admin</a>
                                    </div>
                                    {/* <div className="text-md mt-16 flex justify-center">
                                        <button className=" bg-yellow-100 rounded-md 
                                            cursor-pointer px-4 w-1/5 py-3 border-2 border-black">
                                            <a href="/landing_page">Back</a></button>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Choice;