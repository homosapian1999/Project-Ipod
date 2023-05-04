import React from "react";
import "../css/Navbar.css";
import BatImg from "../static/battery.png";

class Navbar extends React.Component{
    constructor(){
        super();
        this.state = {
            time: this.getCurrentTime()
        }
        this.stateId = "";
    }

     // If there is a notfication we will show it for a sec and if not we will just display time

    componentDidMount() {
        const { noty } = this.props;
        if (noty === true) {
            return;
        }
        // set an interval of 60 seconds to update time
        this.stateId = setInterval(() => {
            this.setState({ time: this.getCurrentTime() });
        }, 60000);
    }

    componentDidUpdate(){
        const {setNoty, noty } = this.props;
        if(noty===true){
            setTimeout(function () {
                setNoty();
            },1000)
        }
    }

    // Clearing the  time interval
    componentWillUnmount() {
        const { noty } = this.props;
        if (noty !== true)
            clearInterval(this.stateId);
    }


    // Getting the current Time
    getCurrentTime(){
        // getting today's date from which we will extract the hours and minutes
        const today = new Date();
        var time = today.getHours() + ':' + today.getMinutes();
        if(today.getMinutes() < 10){
            time = today.getHours() + ':0' + today.getMinutes();
        }
        return time;
    }

    /* Render the Navbar */
    render() {
        const { time } = this.state;
        const { playing, noty , notifyText} = this.props;
        return (
            <div className="bar">
                { <h5 className="heading">iPod <i className="fas fa-wifi"></i></h5>}
                {noty === true && <h5 className="notification">{notifyText}</h5>}
                {noty === false && <h3 className="time">{time}</h3>}
                {<div className="right-container-nav">
                    {playing ? <h5 className="play-pause-nav"><i className="fas fa-play"></i></h5> : <h5 className="play-pause-nav"><i className="fas fa-pause"></i> </h5>}
                    <img className="battery" src={BatImg} alt="Battery" />
                </div>}
            </div>
        )
    }
}

export default Navbar;