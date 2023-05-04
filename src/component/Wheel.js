import React from 'react';
import "../css/Wheel.css"
import ZingTouch from 'zingtouch';

class Wheel extends React.Component{

    constructor(){
        super();
        this.angle = 0;
    }

    render(){
        const { changeMenuForward, active, currentMenu, theme,wheelColor } = this.props;
        return(
            <div style={{backgroundColor:wheelColor}} className='wheel-container' id='wheel-container'>
                <div className='wheel' id='wheel'>
                    <div className='controls' id='menu' style={{color
                    :theme}}>
                        <div>Menu</div>
                    </div>
                    <div className='controls' id='forward'>
                        <i className="fa-solid fa-forward-fast" style={{color: theme}}></i>
                    </div>
                    <div className='controls' id='play-pause'>
                        <i className="fa-solid fa-play" style={{color:theme}}></i>
                        <i class="fa-solid fa-pause" style={{color:theme}}></i>
                    </div>
                    <div className='controls' id='reverse'>
                        <i className="fa-solid fa-backward-fast" style={{color:theme}}></i>
                    </div>
                </div>
                <div className='blank' id='blank' onClick={() => {changeMenuForward(active, currentMenu)}}></div>
            </div>
        )
    }

    /* Wheel controlling funtion */

    /*
    e.detail.angle => angle of rotation
    e.detail.distanceFromOrigin === 0 => checks if user has touched the pad or not
    e.detail.distanceFromLast => distance user has move the finger from the last touch; <0 => counter-clockwise, >0 => clockwise
    */

    wheelControl = (e) => {
        const { updateActiveMenu, currentMenu } = this.props;

        if (e.detail.distanceFromOrigin === 0) {
            this.angle = e.detail.angle;
        }
        if (Math.abs(this.angle - e.detail.angle) > 300) {
            this.angle = Math.abs(e.detail.angle);
            if (e.detail.distanceFromLast === 0) {
                return;
            }
            else if (e.detail.distanceFromLast < 0) {
                updateActiveMenu(1, currentMenu);
            } else {
                updateActiveMenu(0, currentMenu);
            }

        } else if (Math.abs(this.angle - e.detail.angle) > 15) {
            this.angle = Math.abs(e.detail.angle);
            if (e.detail.distanceFromLast === 0) {
                return;
            }
            else if (e.detail.distanceFromLast > 0) {
                updateActiveMenu(1, currentMenu);
            } else {
                updateActiveMenu(0, currentMenu);
            }

        }
    }

    // binding the gestures

    componentDidMount() {
        const { changeMenuBackward ,togglePlayPause, seekSongForward, seekSongReverse} = this.props;
        const wheelControll = this.wheelControll;
        const wheel = document.getElementById("wheel");
        // This will create a new region and assign it to a variable. After region is created it can be used to define or listedn specific gestures like tap, rotate etc;

        const activeRegion = ZingTouch.Region(wheel);
        const menuIcon = document.getElementById("menu");
        const playPause = document.getElementById("play-pause");
        const reverse = document.getElementById("reverse");
        const forward = document.getElementById("forward");

        const longTapGesture = new ZingTouch.Tap({

            /*
            maxDelay will define the maximum delay between the start and the end event;
            numInputs => how many Inputs require to trigger, 1 means it can be trigger by one finger
            tolerance => 1 means that we are forgiving user upto the radius of 1 pixel, if the user moves it finger while tapping.
            */
            maxDelay:10000,
            numInputs: 1,
            tolerance: 1,
        })

        activeRegion.bind(menuIcon, 'tap', function (e) {
            changeMenuBackward();
        });
        activeRegion.bind(wheel, 'rotate', function (e) {
            wheelControll(e);
        });
        activeRegion.bind(playPause, 'tap', function (e) {
            togglePlayPause();
        });

        activeRegion.bind(reverse, longTapGesture, function (e) {
            seekSongReverse(e);
        });

        activeRegion.bind(forward, longTapGesture, function (e) {
            seekSongForward(e);
        });
        

    }

    
}

export default Wheel;