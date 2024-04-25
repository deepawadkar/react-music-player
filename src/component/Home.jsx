import React, { useState } from "react";
import Search from "../pages/Search";
import config from "../tokan/config";
import Artist from "../pages/Artist";
import Tracks from "./Tracks";

function Home () {

    const [artistInfo,setArtistInfo] = useState(false)
    
    const searchHandler = async(name) => {
        console.log(`artist name = `, name)

        await fetch(`${config.access_url}/v1/search?q=${name}&type=artist&limit=1`, {
            method: "GET" ,
            headers: {
                Authorization: `${config.access_type} ${config.access_tokan}`
            }
        }).then(res => res.json())
        .then(res => {
            console.log(`artists =`, res)
            setArtistInfo(res.artists?res.artists.items[0]: false)
        }).catch(err => console.log(err))
    }
    return (
       <div className="container mt-5">
        <div className="row">
            <div className="col-md-12 text-center">
                <div className="display-3 text-success">Music App</div>
            </div>
        </div>
        <Search handler ={searchHandler}/>
        <Artist info={artistInfo}/>
       </div>
    )
}

export default Home