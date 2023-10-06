import React, { useState } from "react";
import {
  dbService,
  doc,
  updateDoc,
  deleteDoc,
  deleteObject,
  ref,
  storageService,
} from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async() =>{
        const ok = window.confirm("are you sure you want to delete this nweet?");
        if(ok){
            const NweetTextRef = doc(dbService,"nweets", `${nweetObj.id}`);

            await deleteDoc(NweetTextRef);
            if (nweetObj.attachmentUrl !== "") {
                await deleteObject(ref(storageService, nweetObj.attachmentUrl));
            }
        }
    };

    const toggleEditing = () => setEditing((prev)=> !prev);
    const onSubmit= async (event) =>{
        event.preventDefault();
        const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
        await updateDoc(NweetTextRef,{text:newNweet});
        setEditing(false);
    }
    const onChange= ({target:{value}}) =>{
        setNewNweet(value);
    }
    return (
      <div>
        {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                text="text"
                placeholder="Edit your nweet"
                value={newNweet}
                onChange={onChange}
                required
              ></input>
              <input type="submit" value="Update Nweet"></input>
            </form>
            <button onClick={toggleEditing}> Cancel </button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && (
                <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="error"/>
            )}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete Nweet</button>
                <button onClick={toggleEditing}>Edit Nweet</button>
              </>
            )}
          </>
        )}
      </div>
    );
};

export default Nweet;