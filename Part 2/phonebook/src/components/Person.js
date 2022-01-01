import react from "react";

const Person = ({ person, deleteEntry }) => {
    return (
      <>
      <p>{person.name} {person.number}</p>
      <button onClick={() => deleteEntry(person.id)}>Delete</button>
      </>
    )
  }

export default Person