import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

function Joke() {
    const [jokes,setJokes] = useState([]);
    const [joke,setJoke] = useState('');
    const [jokeID,setJokeID] = useState(null);
    const [count,setCount] = useState(0);

    useEffect(()=>{
         getJokeList();
    },[])

    const getJokeList = async ()=>{
      const res = await axios.get('api/joke');
      if(res.data.status  === 200){
        let data = res.data.jokes;
        let joke = data[0];
        setJokes(data);
        setJoke(joke.joke_content);
        setJokeID(joke.id);
        setCount(count+1);
      }
    }

    const updateJokeVote = async (status,id) =>{
        let vote = {};
        if(status==='funny'){
            vote = {joke_vote:'funny'}; 
        }
        else{
            vote = {joke_vote:'not-funny'}; 
        }
       const res = await  axios.put(`api/update-joke/${jokeID}`,vote);
       if(res.data.status === 200){
           getNextJoke();
       }
      
    }

    const getNextJoke = ()=>{
        let data = jokes;
         if(count >= data.length){
             setJoke("That's all the jokes for today! Come back another day!");
         }
         else{
             let joke = data[count];
             setJoke(joke.joke_content);
             setCount(count + 1);
             setJokeID(joke.id);
         }
    }
    return (
        <div className="joke">
            <div className="joke__header">
                <div className="container">
                    <div className="joke__header__content">
                       <div className="joke__header__image">
                           <img src="/images/logo.png" alt="" />
                       </div>
                       <div className="joke__header__image">
                           <img src="/images/right-logo.png" alt="" />
                       </div>
                    </div>
                </div>
            </div>
            <div className="joke__hero">
                <div className="container">
                   <div className="joke__hero__content">
                     <h2>A joke a day keep the doctors away</h2>
                     <p>If you joke wrong way, your teeth have to pay. (Serious)</p>
                   </div>
                </div>
            </div>
            <div className="joke__content">
                <div className="container">
                  <div className="joke__content__text">
                    <p>{joke}</p>
                  </div>
                  <div className="joke__content__button">
                       <button  className="btn btn--secondary" onClick={()=>updateJokeVote('funny')}>This is Funny</button>
                       <button className="btn btn--primary" onClick={()=>updateJokeVote('not-funny')}>This is not Funny</button>
                       
                  </div>
                </div>
            </div>
            <div className ="footer">
                <div className="container">
                    <div className="footer__content">
                          <p>
                              This website is created as part of Hlsolutions programing. The materials contained on this website arre provied for general infomation only and do not constitute of
                              advice. HLS assumes no responsiblity for the accuracy of any particular statement and accept no liability for any loss or damage which may arrise from reliance on the information contained on this site.
                          </p>
                          <p>
                              <span>Copyright 2021 HLS</span>
                          </p>
                    </div>
                </div>
            </div>
        </div>
       
    );
}

export default Joke;

if (document.getElementById('root')) {
    ReactDOM.render(<Joke />, document.getElementById('root'));
}
