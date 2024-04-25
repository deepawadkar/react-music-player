import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../tokan/config";

function Tracks () {

    const[music,setMusic] = useState([])

    const [view,setView]= useState(false) //handle player view

    const [track,setTrack] = useState(false) //single track

    //to read router  params data -> useparams()
    const params = useParams()


    const searchHandler = async() => {

        await fetch(`${config.access_url}/v1/artists/${params.aId}/top-tracks?market=IN`,{
            method:"GET",
            headers:{
                Authorization: `${config.access_type} ${config.access_tokan}`
            }
        }).then(res => res.json())
        .then(res => {
            console.log(`tracks =`, res)
            setMusic(res.tracks)
        }).catch(err => console.log(err))
    }

    useEffect(() =>{
        searchHandler()
    },[])
    //track card click handler
    const trackClick = (data) => {
         setView(true)
         setTrack(data)
    }

    //close the player
    const close = ()=>{
        setView(false)
        setTrack(false)
    }

    return (
        <div className="container mt-5" id="track">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-4 text-success">Music Tracks</h3>
                    <p className="text-secondary">{params.aId}</p>
                </div>
            </div>
            <div className="row">
                {
                    music?.map((item,index)=> {
                        const{name,album,preview_url} = item
                        return(
                            <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mb-2" key={index}>
                                <div className="card music-card" onClick={() => trackClick(item)}>
                                    <img src={album? album.images[0].url:''} className="card-img-top" alt="" />
                                    <div className="card-hover">
                                        <h6 className="text-success text-center">{name}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* {
                view ? <div id="player" className="justify-content-center align-items-center">
                    <button className="btn-close text-danger justify-content-end"  onClick={() => close()}></button>
                    <div className="img">
                        <img src={track?.album.images[0].url } alt=""  className="trackImg"/>
                    </div>
                    <h6 className="text-center text-success"> { track?.name }</h6>
                    <audio src={track?.preview_url} controls></audio>
                </div>: null
            } */}

            {/* or */}
            

            {
                view ? <div id="player" className="justify-content-center align-items-center p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn-close float-end" onClick={() => close()}></button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="img">
                                    <img src={track?.album.images[0].url } alt=""  className="img-fluid rounded-circle" width={150} height={150}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h5 className="text-center text-success">{ track?.name }</h5>
                                <audio src={track?.preview_url} controls></audio>
                            </div>
                        </div>
                    </div>
                </div>: null
            }


            
        </div>
    )
}

export default Tracks