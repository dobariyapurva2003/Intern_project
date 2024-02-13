import React from "react";
import { useState } from "react";

const Email = () => {

    const [isActive2, setIsActive2] = useState(false);
  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");

  const fetchUser = async () => {
    try {
      const res = await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email
        }),
      });
      const data = await res.json();
      console.log(data);
      if(res.status === 200){
          window.alert("User Verified");
          setIsActive2(!isActive2);
    }
    else{
          window.alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postPass = async () => {
    try{
        const res = await fetch("fpassword", {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,newpassword
            })
        })
        const data = await res.json();
        if(res.status === 200){
            window.alert("password updated.");
        } else{
            window.alert("password updation unsuccessful");
        }
    }catch(err){
        console.log(err);
    }finally{
        window.location="/";
    }
  }


    return (
        <>
            <div class="flex h-screen">
        <div class="m-auto rounded-lg border-blue-700 h-88 w-96 border-solid
         border-2 p-4">
          <h1 className="mb-4">
            To reset password, Please enter your email I'D to verify you as a
            user.
          </h1>
          <h2 className="mb-2 font-semibold">Enter your email</h2>
          <div className="flex flex-col">
            <input
              name="email"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="text"
              className="bg-gray-100 bg-opacity-50 rounded border
               border-gray-800 focus:border-blue-500 focus:bg-white focus:ring-2
                focus:ring-blue-200 text-base outline-none text-gray-700 leading-8
                 transition-colors duration-200 ease-in-out px-3 py-1"
            ></input>
            {isActive2 && (
              <div className="">
                <h2 className="mt-4 mb-2 font-semibold">
                  Enter the new password
                </h2>
                <input
                    name="newpassword"
                    id="newpassword"
                    value={newpassword}
                    onChange={(e) => setnewpassword(e.target.value)}
                  type="password"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border
                   border-gray-800 focus:border-blue-500 focus:bg-white 
                   focus:ring-2 focus:ring-blue-200 text-base outline-none 
                   text-gray-700 leading-8 transition-colors duration-200 ease-in-out
                    px-3 py-1"
                ></input>
                <button onClick={postPass} className="my-6 place-self-center bg-blue-200 rounded-lg w-full h-10 border-black border-solid border-2 font-semibold hover:bg-blue-300 ">
                  reset
                </button>
              </div>
            )}
            {!isActive2 && (
              <button
                onClick={fetchUser}
                className="mt-6 place-self-center bg-blue-200 rounded-lg
                 w-full h-10 border-black border-solid border-2 font-semibold
                  hover:bg-blue-300 "
              >
                next
              </button>
            )}
          </div>
        </div>
      </div>
        </>
    )
}

export default Email;