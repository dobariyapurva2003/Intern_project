import React from "react";

const Navbar_component = (props) => {

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
            <div className="bg-white shadow-xl flex flex-row h-20 items-center">
                <div className="flex flex-col ml-8 justify-items-center">
                    <div className=" w-36 overflow-hidden">
                        <img className="h-16" src="../Picture1.png" />
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div className="flex flex-row w-full items-center ">
                        <div className="ml-20 border-2 border-solid border-black rounded-full flex flex-row items-center justify-center">
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
                                    <a href="/After_login">Home</a>
                                    <a href="/display">Wishlist</a>
                                    <a href="/folder">Folders</a>
                                    {/* <a href="/time">Time spent</a> */}
                                    <a><button onClick={() => { logout() }}>Logout</button></a>
                                </div>
                            </li>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar_component;