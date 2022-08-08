import React, { useEffect, useState } from 'react';
import FetchApi from '../../../libs/FetchApi';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import classes from './Product.module.scss';

export const Product = () => {
	const [product, setProduct] = useState([]);
	const params = useParams();

	useEffect(() => {
		const getProduct = async () => {
			//setLoading(true);
			const res = await FetchApi.get(`/product/${params.id}`);
			if (!res.isError) {
				const tmpProduct = res.data;
				setProduct(tmpProduct);
			}
			//setLoading(false);
		};
		getProduct();
	}, []);

	return (
		<div>
			<div>
				<div>
					<strong>ID: </strong> {product.id}
				</div>
				<div>
					<strong>IMG: </strong>
					{product.image || <img src='/logo.jpg' alt='image' className={classes.img} />}
				</div>
				<div>
					<strong>Name: </strong>
					{product.name}
				</div>
				<div>
					<strong>Description: </strong>
					{product.description}
				</div>
				<div>
					<strong>Category: </strong>
					{product.category_id}
				</div>
				<div>
					<strong>Price: </strong>
					{product.price}
				</div>
			</div>

			<Link to='/dashboard/products'>
				<Button>Back</Button>
			</Link>
		</div>
	);
};
