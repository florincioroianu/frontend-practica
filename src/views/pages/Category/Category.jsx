import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import FetchApi from '../../../libs/FetchApi';

const Category = () => {
	const [category, setCategory] = useState([]);
	const params = useParams();

	useEffect(() => {
		const getCategory = async () => {
			//setLoading(true);
			const res = await FetchApi.get(`/category/${params.id}`);

			if (!res.isError) {
				const tmpCategory = res.data;
				setCategory(tmpCategory);
			}
			//setLoading(false);
		};
		getCategory();
	}, []);

	return (
		<div>
			<div>
				<div>
					<strong>ID: </strong> {category.id}
				</div>
				<div>
					<strong>Name: </strong>
					{category.name}
				</div>
				<div>
					<strong>Parent ID: </strong>
					{category.parent_id || '-'}
				</div>
			</div>

			<Link to='/dashboard/categories'>
				<Button>Back</Button>
			</Link>
		</div>
	);
};

export default Category;
