import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner, Table, DropdownButton, Dropdown } from 'react-bootstrap';

import FetchApi from '../../../libs/FetchApi';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		perPage: 25,
	});

	useEffect(() => {
		const getCategories = async () => {
			setLoading(true);
			const res = await FetchApi.get('/categories', { page: pagination.currentPage, perPage: pagination.perPage });
			if (!res.isError) {
				const { data: tmpCategories, ...tmpPagination } = res.data;
				setCategories(tmpCategories);
				setPagination(tmpPagination);
			}
			setLoading(false);
		};
		getCategories();
	}, [pagination.perPage, pagination.currentPage]);

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

	const handleSelect = (e) => {
		setPagination((prev) => ({ ...prev, perPage: e }));
	};

	return (
		<div>
			<div>
				<div>
					{pagination.currentPage > 1 && <Button onClick={goToPreviousPage}>Prev</Button>}
					<div>{pagination.currentPage}</div>
					<Button onClick={goToNextPage}>Next</Button>
				</div>

				<div>
					<DropdownButton alignRight title={pagination.perPage} onSelect={handleSelect}>
						<Dropdown.Item eventKey='25'>25</Dropdown.Item>
						<Dropdown.Item eventKey='50'>50</Dropdown.Item>
						<Dropdown.Item eventKey='75'>75</Dropdown.Item>
					</DropdownButton>
				</div>
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Parrent Id</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{categories?.map((category) => (
						<tr key={category.id}>
							<td>{category.id}</td>
							<td>{category.name}</td>
							<td>{category.parent_id || '-'}</td>
							<td>
								<Link to={`/dashboard/category/${category.id}`}>
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

export default Categories;
