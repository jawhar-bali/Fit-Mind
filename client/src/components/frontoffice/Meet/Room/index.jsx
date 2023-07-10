import React from 'react';
import { useParams} from 'react-router-dom';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt';
import HeaderSignedInClient from '../../shared/HeaderSignedInClient';
import requireAuth from '../../authentification/requireAuth';
const RoomPage = ()=> {

    const{roomId}=useParams();

    const myMeeting = async (element) => {
        const appID = 1709051325 ;
        const serverSecret = "cab4bdd4f1d56e16d442d6661cd8e12d";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID , serverSecret , roomId , Date.now().toString(),"type your name : ");
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container : element,
            sharedLinks : [
                {
                name :'Copy Link',
                url : `http://localhost:3000/room/${roomId}`
            }
        ],
            scenario:{
                mode : ZegoUIKitPrebuilt.OneONoneCall,
            },

            showScreenSharingButton : true,
            showPinButton:true,
            showRemoveUserButton:true,
            showExitButton:true,
            showSettingButton:true,
            showBeautyButton:true,

            
            


        })


    }
    
        return (
            <div>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>Meeting room</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

                <div ref={myMeeting}></div>
                
                
            </div>
        )
};

export default requireAuth (RoomPage);