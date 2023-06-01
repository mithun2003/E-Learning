import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "../../axios";
const Live = () => {
  const { roomName } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  // let role_str = getUrlParams(window.location.href).get('role') || 'Host';
  // const role =
  //   role_str === 'Host'
  //     ? ZegoUIKitPrebuilt.Host
  //     : role_str === 'Cohost'
  //     ? ZegoUIKitPrebuilt.Cohost
  //     : ZegoUIKitPrebuilt.Audience;

  // let sharedLinks = [];
  // if (role === ZegoUIKitPrebuilt.Host) {
  //   sharedLinks.push({
  //     name: 'Join as host',
  //     url:
  //       window.location.protocol + '//' +
  //       window.location.host + window.location.pathname +
  //       '?roomID=' +
  //       roomID +
  //       '&role=Cohost',
  //   });
  // }
  // sharedLinks.push({
  //   name: 'Join as audience',
  //   url:
  //    window.location.protocol + '//' +
  //    window.location.host + window.location.pathname +
  //     '?roomID=' +
  //     roomID +
  //     '&role=Audience',
  // });

  const isHost = sessionStorage.getItem("is_host") === "true"; // Check if the teacher is the host
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
  // useEffect(()=>{
  //     alert(`${window.location.protocol}//${window.location.host}${window.location.pathname}`)
  // })
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
      // onUserAvatarSetter:(userList) => {
      //     userList.forEach(users => {
      //           console.log("hdkjfad",users)
      //               users.setUserAvatar(`${baseUrl}${users?.image}`)
      //           })
      //       },
      onLiveEnd: async () => {
        sessionStorage.removeItem("is_host");

        // axios.delete('/live/',{
        //   room_code:roomName
        // })
        axios.delete(`/live/${roomName}`);

        // Close the current window/tab
        window.close();
        navigate("/");
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
