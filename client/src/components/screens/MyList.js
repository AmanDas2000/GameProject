import React ,{ useState,useEffect,useContext  } from 'react'
import Card from './Card.js'
import ParticlesBg from 'particles-bg'
import {UserContext} from '../../App'
import {Link,useHistory} from 'react-router-dom'

function MyList() {
    const [games, setGames] = useState([]);
    const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
    
    useEffect(()=>{
        fetch("/userrated", {
            method: "get",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
            

        }).then(res => res.json())
                .then(data => {
                    console.log(data.userrated)
                    setGames(data.userrated);
                }).catch(err => {
                    console.log(err)
                })
    },[])
        
    console.log(games);
    const rate = (a, b) => {
        if (b === 0) {
            return 0;
        }
        return (a/b).toFixed(1);
    }
    return (
        <div style={{
            maxWidth: "",
            margin: "0px auto",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img class="dp"
                        style={{ width: "160px", height: "160px", borderRadius: "80px" }} 
                        src={games[0]?.postedBy.photo}
                        />
                </div>
                <div class="white-text">
                    <h4>{ state.name}</h4> 
                    
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "110%",
                    }}>
                        <h5>5 year coin</h5>
                        <h5>{games.length} Ratings</h5> 
                    </div>
                </div>
            </div>
            <div class="white-text" style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "5px auto",
                borderBottom: "1px solid grey"
            }}>
            <h2>User rated</h2>
            </div>
            
            <div className="games">
            {/* <ParticlesBg color="black" type="cobweb" bg={true} /> */}
            {games?.map(item => (
                <div>
                    <Card id={item._id} photo={item.game.photo} name={item.game.name} oldrating={item.rating} number={ item.game.noOfRating}/>
                </div>
                ))}
         </div> 
        </div>
    )
}

export default MyList
