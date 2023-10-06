import {
  authService,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "fbase";
import React, { useState } from "react";

const Auth = () => {
const [user, setUser] = useState({email:"", password:""})
const [newAccount, setNewAccount] = useState(false);
const [error,setError] = useState("");
const onChange = ({target:{name,value}}) => {
    setUser({...user,[name]:value})
}
const onSubmit = async(event) =>{
    event.preventDefault();
    try{
        let data;
        if(newAccount){
            data = await createUserWithEmailAndPassword(authService,user.email,user.password);
        }else{
            data = await signInWithEmailAndPassword(
              authService,user.email,
              user.password
            );
        }
        console.log(data);
    }catch(err){
        setError(err.message);
    }
}

const toggleAccount = () => setNewAccount((prev)=> !prev);
const onSocialClick =async ({target:{name}}) =>{
    let provider;
    if(name === 'google'){
        console.log('ss')
        provider = new GoogleAuthProvider();
        const data = await signInWithPopup(authService, provider);
        const credential = GoogleAuthProvider.credentialFromResult(data);
    }else if(name === 'gh'){
        provider = new GithubAuthProvider();
        const data = await signInWithPopup(authService, provider);
        const credential = GithubAuthProvider.credentialFromResult(data);
        
    }
    
}

return (
  <div>
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={user.email}
        onChange={onChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        required
        value={user.password}
        onChange={onChange}
      />
      <input type="submit" value={newAccount ? "Create Account" : "Sign in"} />
    </form>
    <div>
      <span>{error}</span>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </div>
    <div>
      <button onClick={onSocialClick} name="google">
        Continue with Google
      </button>
      <button onClick={onSocialClick} name="gh">
        Continue with Github
      </button>
    </div>
  </div>
);};
export default Auth;