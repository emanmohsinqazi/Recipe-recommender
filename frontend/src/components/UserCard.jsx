/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="User's photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age && gender && `${age} ${gender}`}</p>
        
        
      </div>
    </div>
  );
};

export default UserCard;
