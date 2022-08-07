import React, { useEffect, useState } from 'react';
import FetchApi from '../../../libs/FetchApi';

const Profile = () => {
	const [user, setUser] = useState({});

	useEffect(() => {
		const getUser = async () => {
			const res = await FetchApi.get('/user');
			if (!res.isError) {
				const tmpUser = res.data.user;
				setUser(tmpUser);
			}
		};
		getUser();
	}, []);

	return (
		<div>
			<div>
				<div>
					<strong>ID: </strong> {user.id}
				</div>
				<div>
					<strong>Name: </strong>
					{user.name}
				</div>
				<div>
					<strong>Email: </strong>
					{user.email}
				</div>
			</div>
		</div>
	);
};

export default Profile;
