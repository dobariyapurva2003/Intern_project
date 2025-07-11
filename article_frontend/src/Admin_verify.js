import React from "react";
import { useState } from "react";
const address = process.env.REACT_APP_BACKEND_URL;

const Admin_verify =() => {

    const [username, setusername] = useState('');
    const [user_password, set_user_password] = useState('');
    const loginUser = async (ev) => {
        ev.preventDefault();
        const respon = await fetch(`${address}/loginForAdmin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                user_password
            })
        });
        const data = respon.json();
        if (respon.status === 400 || respon.status === 400 || !data) {
            window.alert("Invalid Details");
        } else {
            window.alert("Login successful");
            window.location = "/After_login_admin";
        }
    }


    return (
        <>
            <div className="bg-white"> 
                
                    <div className="flex flex-row">
                        <div className=" w-1/2 h-screen flex justify-center items-center">
                            <div className="w-2/3 h-2/3 shadow-lg shadow-black bg-slate-200 rounded-md flex justify-center">
                                <div className="flex flex-col justify-evenly w-full">
                                    <form>
                                        <div className="flex justify-center flex-col my-8">
                                            <h1 className="text-md ml-8 mb-4">Username : </h1>
                                            <input type="text"
                                                onChange={(e) => setusername(e.target.value)}
                                                name="username"
                                                id="username"
                                                value={username} className="mx-8 h-10 border-black
                                             border-2 rounded-lg"></input>
                                        </div>
                                        <div className="flex justify-center flex-col my-8">
                                            <h1 className="text-md ml-8 mb-4">Password : </h1>
                                            <input onChange={(e) => set_user_password(e.target.value)}
                                                name="user_password"
                                                id="user_password"
                                                value={user_password}
                                                type="password" className="mx-8 h-10 border-black
                                                 border-2 rounded-lg"></input>
                                        </div>
                                        <div className="text-md ml-8 mt-16 flex justify-center">
                                            <input className="bg-white hover:bg-slate-100 rounded-md 
                                            cursor-pointer px-4 w-1/5 py-3 border-2 border-black" type="submit"
                                                name="submit" id="submit" value="Log in" onClick={loginUser} />
                                            <button className="ml-20 bg-white hover:bg-slate-100 rounded-md 
                                            cursor-pointer px-4 w-1/5 py-3 border-2 border-black">
                                                <a href="/">Back</a></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 ml-16 h-screen flex items-center justify-center">
                            <div className="shadow-black rounded-3xl shadow-md w-3/4 h-3/4">
                                <img className="h-full w-full rounded-3xl" src="../bg4.jpg"></img>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Admin_verify;