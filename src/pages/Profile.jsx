import { useProfile } from "@/hooks";
import FormHeading from "@/components/FormHeading";

function Profile() {
	const { profile } = useProfile();
	/*
	Profile type: 
	{
		"profileImg": "xyz.jpg",
		"username": "meharjeet1234"
	}
	
	*/

	return (
		<>
			<FormHeading>Profile</FormHeading>
			{!profile ? (
				<h1>No Profile</h1>
			) : (
				<div>
					<img src={profile?.profileImg} alt="profile image" />
					<h2>{profile?.username}</h2>
				</div>
			)}
		</>
	);
}

export default Profile;
