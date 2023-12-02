// Profile.js

const Profile = (props) => {
    const user = props.user ? props.user.username : null;
    return (
      <div style={{ padding: 20 }}>
        <h1>Profile page</h1>
        <p>This is a Profile page view.</p>
        <p>{user}</p>
      </div>
    );
  };
  
  export default Profile;