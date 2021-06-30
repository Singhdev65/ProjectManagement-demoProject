import React, { useEffect, useState } from 'react';
import './Team.css';
import { Link } from 'react-router-dom';
import db from '../../firebase';

const Team = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        db.collection("Team").onSnapshot(snapshot => (
          setTeams(snapshot.docs.map((doc) =>
          ({
            id: doc.id,
            fullName: doc.data().name,
            role: doc.data().role,
            imageUrl: doc.data().imageUrl,
          })))
        ));
      }, [])

    return (
        <div className="team">
            <div className="team__wrapper">
                <div className="team__TitleContainer">
                    <h1 className="team__Title">Our Team</h1>
                    <Link to="/team/add" style={{ textDecoration: "none" }}>
                     <button className="team__AddButton">Add</button>
                    </Link>
                </div>
                <div className="team__cardWrapper">
                    {teams.map((team) => (
                        <div className="team__card" key={team.id} id={team.id}>
                            <div className="team__cardImg">
                                <img src={team.imageUrl} alt="" />
                            </div>
                            <div className="team__cardInfo">
                                <h4>{team.fullName}</h4>
                                <h5>{team.role}</h5>
                                <div className="team__cardInfoButton">
                                <Link to={`/team/members/view/${team.id}`}>
                                    <button
                                    className="userUpdateButton">View Member
                                    </button>
                                </Link>
                                <button
                                    className="userUpdateButton"
                                    onClick={() => db.collection("Team").doc(team.id).delete()}
                                    style={{backgroundColor:"red"}}
                                   >Remove Member</button>
                                    </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Team;
