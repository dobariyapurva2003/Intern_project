import React from "react";

const Home = () => {
    return (
        <>
            <div className="">
                <div className="flex flex-row">
                <div className=" w-1/2 h-screen flex justify-center items-center">
                        <img className="h-3/4 mr-16 rounded-3xl shadow-xl shadow-black"
                            src="../bg1.jpg" alt="loading"></img>
                    </div>
                    <div className=" w-1/2 h-screen flex justify-center items-center">
                        <div className="w-3/4 h-2/3 
                        rounded-lg flex justify-center">
                            <div className="flex flex-col justify-evenly">
                                <div className="flex justify-center">
                                    <h1 className="text-5xl text-slate-500 font-bold">
                                        ArtiSearch</h1>
                                </div>
                                <div className="flex justify-center text-center text-lg
                                font-semibold mx-8">
                                    <h1>You can choose any language mentioned in
                                        References and topics/category for getting news
                                        articles in wanted language. It will show you head
                                        title and small part of description plus publishing
                                        date and it also provides reference link related to
                                        article, if you want to know in more details you can
                                        go at website through that link y clicking on "Read more"
                                        button.</h1>
                                </div>
                                <div className="flex justify-center text-xl font-semibold">
                                    <button className="px-3 bg-slate-300 hover:bg-white
                                     h-11 rounded-lg
                                    border-2 border-black"><a href="/landing_page">
                                            Let's Try
                                        </a></button>
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </div>

                {/* For next content */}




                <div className="flex flex-row">
                    
                    <div className=" w-1/2 h-screen flex justify-center items-center">
                        <div className="w-3/4 h-2/3 
                        rounded-lg flex justify-center">
                            <div className="flex flex-col justify-evenly">
                                <div className="flex justify-center">
                                    <h1 className="text-5xl text-slate-500 font-bold">
                                        Like Articles</h1>
                                </div>
                                <div className="flex justify-center text-center text-lg
                                font-semibold mx-8">
                                    <h1>After selecting like option for any
                                        particular article, you can add that article
                                        to your wishlist. By selecting option Wishlist
                                        you can see your previously liked articles. If you
                                        want to remove any article from Wishlist you can
                                        simply select dislike option.</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-1/2 h-screen flex justify-center items-center">
                        <img className="h-3/4 rounded-full "
                            src="../wishlist.jpg" alt="loading"></img>
                    </div>
                </div>


                {/* For next content */}


                <div className="flex flex-row">
                <div className=" w-1/2 h-screen flex justify-center items-center">
                        <img className="h-3/4 rounded-full"
                            src="../view_profile.jpg" alt="loading"></img>
                    </div>
                    <div className=" w-1/2 h-screen flex justify-center items-center">
                        <div className="w-3/4 h-2/3 
                        rounded-lg flex justify-center">
                            <div className="flex flex-col justify-evenly">
                                <div className="flex justify-center">
                                    <h1 className="text-5xl text-slate-500 font-bold">
                                        Edit / View Profile</h1>
                                </div>
                                <div className="flex justify-center text-center text-lg
                                font-semibold mx-8">
                                    <h1>After sign in/sign up you can edit or
                                        view your profile by selecting options like Edit
                                        profile and View profile. For your profile you can
                                        add your image also.</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>






                <div className="flex flex-row">
                    
                    <div className=" w-1/2 h-screen flex justify-center items-center">
                        <div className="w-3/4 h-2/3 
                        rounded-lg flex justify-center">
                            <div className="flex flex-col justify-evenly">
                                <div className="flex justify-center">
                                    <h1 className="text-5xl text-slate-500 font-bold">
                                        Save Articles</h1>
                                </div>
                                <div className="flex justify-center text-center text-lg
                                font-semibold mx-8">
                                    <h1>After sign in/sign up you can save that article
                                        to your folders. By selecting option Folders
                                        you can see your previously saved articles in
                                        folders by different topics which was searched by you.
                                        If you want to remove any article from that perticular
                                        folder you can  simply select remove option.</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-1/2 h-screen flex justify-center items-center">
                        <img className="h-2/3 mr-20 rounded-xl shadow-md shadow-black"
                            src="../folder2.jpg" alt="loading"></img>
                    </div>
                </div>




                <div className="flex flex-row">
                <div className=" w-1/2 mr-16 h-screen flex justify-center items-center">
                        <img className="h-2/3 w-2/3 rounded-xl shadow-md shadow-black"
                            src="../feedback.jpg" alt="loading"></img>
                    </div>
                    <div className=" w-1/2 h-screen flex justify-center items-center">
                        <div className="w-3/4 h-2/3 
                        rounded-lg flex justify-center">
                            <div className="flex flex-col justify-evenly">
                                <div className="flex justify-center">
                                    <h1 className="text-5xl text-slate-500 font-bold">
                                        Feedbacks</h1>
                                </div>
                                <div className="flex justify-center text-center text-lg
                                font-semibold mx-8">
                                    <h1>After sign in/sign up you can give your Feedbacks
                                    which can be learn by admins. Your feedbacks will help us
                                    to modify or develop this app further in future.</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Home;