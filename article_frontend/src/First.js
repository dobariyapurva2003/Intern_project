import React, { useEffect, useState } from "react";

const First = (props) => {

    // for display content

    const [disp, setdisp] = useState(false);
    const [disp1, setdisp1] = useState(false);
    const [Choice, setChoice] = useState(false);

    // for signup

    const [user, setuser] = useState({
        fullname: "", email: "", username: "", user_password: "", branch: ""
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setuser({ ...user, [name]: value });
    }

    const postdata = async (ev) => {
        ev.preventDefault();
        const { fullname, email, username, user_password, branch } = user;
        const response = await fetch("https://intern-project-qdst.onrender.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullname, email, username, user_password, branch
            })
        });
        const data = await response.json();
        if (response.status === 422 || !data) {
            window.alert("Invalid data or Email already exist");
            console.log("Invalid data or Email already exist");
        } else {
            window.alert("data stored successfully");
            console.log("data stored successfully");
            window.location = "/After_login";
            // window.location = "/choice2";
        }
    }

    // for login

    const [username, setusername] = useState('');
    const [user_password, set_user_password] = useState('');
    const loginUser = async (ev) => {
        ev.preventDefault();
        const respon = await fetch('https://intern-project-qdst.onrender.com/login', {
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
            window.location = "/After_login";
        }
    }

    return (
        <>

            {/* {!Choice && ( */}
            <div className="bg-white">
                {!disp && (
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
                                        <div className="ml-8">
                                            <a href="/email" className="
                                        text-blue-500 border-b-2 border-blue-500">
                                                Forgot password?</a>
                                        </div>
                                        <div className="ml-8 my-3">
                                            <h3>Create an account : <button className="
                                            text-blue-500  border-b-2 
                                             border-blue-500" onClick={() => { setdisp(!disp); setdisp1(!disp1) }}>
                                                Sign up</button></h3>

                                        </div>
                                        <div className="text-md ml-8 mt-16 flex justify-center">
                                            <input className="bg-white hover:bg-slate-100 rounded-md 
                                            cursor-pointer px-4 w-1/5 py-3 border-2 border-black" type="submit"
                                                // name="submit" id="submit" value="Log in" onClick={()=>{loginUser(); setChoice(!Choice)}} />
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
                                <img className="h-full w-full rounded-3xl" src="../bg2.jpg"></img>
                            </div>
                        </div>
                    </div>
                )}



                {/* This is for signup page */}

                {disp1 && (
                    <div className="flex flex-row">
                        <div className="w-1/2 h-screen flex 
                        justify-center items-center">
                            <div className="w-4/5 h-5/6 bg-slate-200 rounded-md 
                            flex justify-center">
                                <div className="flex flex-col justify-evenly w-full">
                                    <form>
                                        <div className="flex justify-center flex-col my-3">
                                            <h1 className="text-md ml-8 mb-4">Name : </h1>
                                            <input onChange={handleInputs} type="text" name="fullname"
                                                id="fullname" value={user.fullname} className="mx-8 h-10 border-black
                                                 border-2 rounded-lg"></input>
                                        </div>
                                        <div className="flex justify-center flex-col my-3">
                                            <h1 className="text-md ml-8 mb-4">Email : </h1>
                                            <input onChange={handleInputs} type="email"
                                                name="email"
                                                id="email"
                                                value={user.email} className="mx-8 h-10 border-black
                                                 border-2 rounded-lg"></input>
                                        </div>
                                        <div className="flex justify-center flex-col my-3">
                                            <h1 className="text-md ml-8 mb-4">Username : </h1>
                                            <input onChange={handleInputs} type="text"
                                                name="username"
                                                id="username"
                                                value={user.username} className="mx-8 h-10 border-black
                                                 border-2 rounded-lg"></input>
                                        </div>
                                        <div className="flex justify-center flex-col my-3">
                                            <h1 className="text-md ml-8 mb-4">Password : </h1>
                                            <input onChange={handleInputs} type="password"
                                                name="user_password"
                                                id="user_password"
                                                value={user.user_password} className="mx-8 h-10 border-black
                                                 border-2 rounded-lg"></input>
                                        </div>

                                        <div className="flex  flex-row my-3">
                                            <div className="flex justify-start">
                                                <h1 className="text-md ml-8 mb-4">Intrested Topic : </h1>
                                            </div>
                                            <div className="ml-5 border-2 border-solid border-black h-full rounded-sm">
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
                                            {/* <div className="flex flex-col">
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

                                        <div className="text-md ml-8 my-8 flex justify-center">
                                            <input className="hover:bg-slate-100 bg-white rounded-md 
                                            cursor-pointer px-4 w-1/5 py-3 border-2 border-black" type="submit"
                                                // name="submit" id="submit" value="Sign up" onClick={()=>{postdata(); setChoice(!Choice)}} />
                                                name="submit" id="submit" value="Sign up" onClick={postdata} />
                                            <button className="ml-20 hover:bg-slate-100 bg-white rounded-md 
                                            cursor-pointer px-4 w-1/5 py-3 border-2 border-black">
                                                <a href="/first">Back</a></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 ml-16 h-screen flex items-center justify-center">
                            <div className="shadow-black shadow-2xl w-3/4 h-3/4">
                                <img className="h-full w-full" src="../bg2.jpg"></img>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* )} */}

            {/* {Choice && (
            <div>
            <div>
                <div>
                    <div className="">
                        <div className="h-screen flex justify-center items-center">
                            <div className="w-1/3 h-3/4 bg-pink-100 rounded-md flex justify-center">
                                <div className="w-full">
                                    <form>
                                        <div className="flex justify-center flex-col my-8">
                                            <h1 className="text-md ml-8 mb-4">Choose one topic in which u are
                                                intrested : </h1>
                                        </div>
                                        <div className="flex justify-center flex-col mt-8 ">
                                            <button value="breaking-news" onClick={(e) => { props.setAsk(e.target.value); }}
                                                className="bg-slate-300 mx-10 h-10 rounded-3xl hover:bg-white">
                                                Breaking-News</button>
                                        </div>
                                        <div className="flex justify-center flex-col my-1">
                                            <button value="world" onClick={(e) => { props.setAsk(e.target.value); }}
                                                className="bg-slate-300 mx-10 h-10 rounded-3xl hover:bg-white">
                                                World</button>
                                        </div>
                                        <div className="flex justify-center flex-col my-1">
                                            <button value="sports" onClick={(e) => { props.setAsk(e.target.value); }}
                                                className="bg-slate-300 mx-10 h-10 rounded-3xl hover:bg-white">
                                                Sports</button>
                                        </div>
                                        <div className="flex justify-center flex-col my-1">
                                            <button value="nation" onClick={(e) => { props.setAsk(e.target.value); }}
                                                className="bg-slate-300 mx-10 h-10 rounded-3xl hover:bg-white">
                                                Nation</button>
                                        </div>
                                        <div className="flex justify-center flex-col my-1">
                                            <button value="business" onClick={(e) => { props.setAsk(e.target.value); }}
                                                className="bg-slate-300 mx-10 h-10 rounded-3xl hover:bg-white">
                                                Business</button>
                                        </div>
                                        <div className="flex justify-center flex-col my-1">
                                            <button value="technology" onClick={(e) => { props.setAsk(e.target.value); }}
                                                className="bg-slate-300 mx-10 h-10 rounded-3xl hover:bg-white">
                                                Technology</button>
                                        </div>
                                        <div className="flex justify-center flex-col my-1">
                                            <button value="entertainment" onClick={(e) => { props.setAsk(e.target.value); }}
                                                className="bg-slate-300 mx-10 h-10 rounded-3xl hover:bg-white">
                                                Entertainment</button>
                                        </div>
                                        <div className="flex justify-center flex-col my-1">
                                            <button value="science" onClick={(e) => { props.setAsk(e.target.value); }}
                                                className="bg-slate-300 mx-10 h-10 rounded-3xl hover:bg-white">
                                                Science </button>
                                        </div>
                                        <div className="flex justify-center flex-col my-1">
                                            <button value="health" onClick={(e) => { props.setAsk(e.target.value); }}
                                                className="bg-slate-300 mx-10 h-10 rounded-3xl hover:bg-white">
                                                Health </button>
                                        </div>
                                        <div>
                                            <a href="/After_login">
                                            <button >Proceed</button> </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )} */}
        </>
    )
}

export default First;