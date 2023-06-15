import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "../../axios";
const Live = () => {
  const { roomName } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const isHost = localStorage.getItem("is_host") === "true"; // Check if the teacher is the host
  const role = isHost ? "Host" : "Audience";
  const generateSharedLinks = () => {
    const sharedLinks = [];

    if (!isHost) {
      sharedLinks.push({
        name: "Join as audience",
        url: `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      });

      return sharedLinks;
    }
  };

  const appID = 520130856;
  const serverSecret = "39fe954d71bce381b7cc1394e1a5084b";
  const id = user.id.toString();
  const userName = user.name;
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomName,
    id,
    userName
  );
  let myMeeting = async (element) => {
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role
        }
      },
      sharedLinks: generateSharedLinks(),
      showPreJoinView: false,
 
      onLiveEnd: async () => {
        localStorage.removeItem("is_host");
        try {
          await axios.delete(`/live/${roomName}`);
          window.close();
        } catch (error) {
          console.log(error);
          // Handle the error or display an error message
        }
      }
    });
  };

  return (
    <>
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </>
  );
};

export default Live;
