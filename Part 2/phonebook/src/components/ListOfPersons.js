import react from "react";
import Person from "./Person"

const ListOfPersons = ( {peopleToShow, deleteEntry} ) => {

    return(
        <ul>
          {peopleToShow.map(person =>
            <Person key={person.name} person={person} deleteEntry={deleteEntry}/>
          )}
        </ul>
    )
  }

export default ListOfPersons