import React, {useState,useEffect} from "react"
import "../styles.css"

export default function Meme() {
    let [meme, setmeme] = useState({
        topText : "",
        bottomText: "",
        randomImage:  "http://i.imgflip.com/1bij.jpg"
    })
    
    let [memeData, setmemeData] = useState([])
    useEffect( ()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then( res => res.json())
        .then( data => setmemeData(data.data.memes))
    },[])
    
        
    function changeHandler(event){
        let {name,value} = event.target;
        setmeme( 
            prevData => ({
                ...prevData,
                [name]: value 
            })
        )}
        
    function getRandomImage(){
       let num = Math.floor(Math.random()*memeData.length)
       setmeme( prevData => ({
           ...prevData,
           randomImage: memeData[num].url
           
       }))
    
    }
     return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value = {meme.topText}
                    onChange = {changeHandler}
                   
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                     name="bottomText"
                    value = {meme.bottomText}
                    onChange = {changeHandler}
                    
                />
                <button 
                    className="form--button"
                     onClick = {getRandomImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
             <img src={meme.randomImage} alt="img-meme" className="meme--image" />
               <h2 className="meme--text top">{meme.topText}</h2>
              <h2 className="meme--text bottom">{meme.bottomText}</h2>
               
            </div>
    </main>
    )
}