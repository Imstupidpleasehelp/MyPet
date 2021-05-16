import React, { useState, useEffect } from "react";
//import getPetInfo from "../services/pets";
import { Link } from "react-router-dom";

const RestaurantsList = props => {
  const [pets, setPets] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchType, setSearchType ] = useState("");

  useEffect(() => {
    getPetInfo();
   
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchType = e => {
    const searchType = e.target.value;
    setSearchType(searchType);
  };
  async function getPetInfo() {
    const response = await fetch('https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/my_pets-dbdsd/service/pets/incoming_webhook/petswebhook');
    
    console.log(response); 
     
}



 



 

  const find = (query, by) => {
    getPetInfo.find(query, by)
      .then(response => {
        console.log(response.data);
        setPets(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByType = () => {
    find(searchType, "type")
  };
  if (pets) {
    return (
<div className="row ">
        {pets.map((restaurant) => {

          return (
            <div className="col-lg-4 ">
              <div className="card" key={pets.id}>
                <div className="card-body">
                  <h5 className="card-title">{pets.pet}</h5>
                  <h6 className="card-title">{pets.breed}</h6>
                  <img src={pets.image} alt={pets.pet}></img>
                  <div className="row">
                  <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Comments
                  </Link>
                 <button className="btn btn-primary col-lg-5 mx-1 mb-1">Give like</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    )
  }
  else {
    return ( 
      <div>App is loading</div>
    )
  }
} 
  
   

export default RestaurantsList;