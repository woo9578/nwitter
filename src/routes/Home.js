import Nweet from "components/Nweet";
import {
  dbAddDoc,
  dbCollection,
  dbService,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  ref,
  uploadString,
  storageService,
  getDownloadURL
} from "fbase";
import { v4 as uuidv4 } from "uuid"; //어떤 식별자를 랜덤하게 생성
import React, { useState, useEffect, useRef } from "react";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();
    
    // const getNweets = async() =>{
    //     const ppnweets = dbCollection(dbService, "nweets")
    //       // const q= query(dbCollection(dbService,"nweets"));
    //       const querySnapshot = await getDocs(ppnweets);
    //       // const querySnapshot = await getDoc(dbCollection(dbService,"nweets"));
    //       querySnapshot.forEach((result)=>{
    //             const nweetObj = { ...result.data(), id: result.id };
    //           setNweets((prev) => [nweetObj, ...prev]); 
    //     });
    // };
    
    useEffect(()=>{
        // getNweets();  //DB 저장 내용 가져오기
        //DB 실시간 변화 감지
        const q = query(dbCollection(dbService, "nweets"),orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const nweetArr = snapshot.docs.map((doc)=>({
                id:doc.id,...doc.data()
            }));
            setNweets(nweetArr);
        });
    }, [])

    const onSubmit = async (event)=>{ //이미지 저장 및 글 저장
        event.preventDefault();
        let attachmentUrl = "";
        try{
            if(attachment !== ""){
                const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
                const response = await uploadString(fileRef, attachment, "data_url").then((snapshot) => {
                    console.log(snapshot);
                return snapshot;
                });
                attachmentUrl = await getDownloadURL(response.ref);
            }
            const nweetsobj = {
              text: nweet,
              createdAt: Date.now(),
              creatorId: userObj.uid,
              attachmentUrl,
            };

            await dbAddDoc(dbCollection(dbService, "nweets"), nweetsobj);

        }catch(err){
            console.log(err);
        }
        setNweet("");
        setAttachment("");
        fileInput.current.value = "";
    }
    const onChange = (event) => {
        const {target:{value}}= event
        setNweet(value);
    }

    const onFileChange = ({target:{files,value}}) =>{
        const theFile = files[0];
        console.log(theFile)
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            console.log(finishedEvent)
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
            value = "";
        }
        reader.readAsDataURL(theFile)
    }

    const onClearAttachmentClick = () => {
        setAttachment("");
        // document.getElementById("img").value = ""; //파일이름 지우기
        fileInput.current.value = "";
    }

    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="Nweet" />
          <br />
          {attachment && (
            <div>
              <img src={attachment} width="50px" height="50px" alt="error" />
              <button onClick={onClearAttachmentClick}>Clear</button>
            </div>
          )}
          <input
            id="img"
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={onFileChange}
          ></input>
        </form>
        <div>
          {nweets.map((value, index) => (
            <Nweet
              nweetObj={value}
              key={index}
              isOwner={value.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
    );}; 
export default Home; 
