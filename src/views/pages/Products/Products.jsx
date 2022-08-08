import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner, Table } from 'react-bootstrap';
import classes from './Products.module.scss';
import Select from 'react-select';

import FetchApi from '../../../libs/FetchApi';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		perPage: 20,
	});

	useEffect(() => {
		const getProducts = async () => {
			setLoading(true);
			const res = await FetchApi.get('/products', { page: pagination.currentPage });

			if (!res.isError) {
				const { data: tmpProducts, ...tmpPagination } = res.data;
				setProducts(tmpProducts);
				setPagination(tmpPagination);
			}
			setLoading(false);
		};
		getProducts();
	}, [pagination.currentPage, pagination.perPage]);

	const goToPreviousPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
	};

	const goToNextPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
	};

	if (loading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	}

	return (
		<div>
			<div>
				<div>
					{pagination.currentPage > 1 && <Button onClick={goToPreviousPage}>Prev</Button>}
					<div>{pagination.currentPage}</div>
					<Button onClick={goToNextPage}>Next</Button>
				</div>
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Image</th>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((product) => (
						<tr key={product.id}>
							<td>{product.id}</td>
							<td>{product.image || <img src='/logo.jpg' alt='image' className={classes.img} />}</td>
							<td>{product.name}</td>
							<td>{product.description}</td>
							<td>{product.price}</td>
							<td>
								<Link to={`/dashboard/product/${product.id}`}>
									{' '}
									<Button>View</Button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Products;
