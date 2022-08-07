import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [errors, setErrors] = useState({
		email: '',
	});

	const _handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'email') {
			setEmail(value);
		}

		if (value.length) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const _validate = () => {
		let isValid = true;
		const tmpErrors = { ...errors };

		if (!email.length) {
			tmpErrors.email = 'Email cannot be empty!';
			isValid = false;
		}

		setErrors(tmpErrors);

		return isValid;
	};

	const _forgotPassword = async () => {
		const isValid = _validate();

		if (isValid) {
			// make API REQUEST
			const payload = {
				email,
			};

			// const res = await fetch('http://practica.local/api/forgot-password', {
			//   method: 'POST',
			//   headers: {
			//     "Accept": 'application/json',
			//     "Content-Type": 'application/json'
			//   },
			//   body: JSON.stringify(payload)
			// })

			// console.log(res);
			navigate('/change-password');
		}
	};
	return (
		<section>
			<div className='color-overlay d-flex justify-content-center align-items-center'>
				<Form className='rounded p-4 p-sm-3'>
					<Form.Group className='mb-3'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							name='email'
							type='email'
							placeholder='Enter email'
							value={email}
							isInvalid={errors.email.length}
							onChange={_handleChange}
						/>
						{!!errors.email.length && <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>}
					</Form.Group>

					<Button onClick={_forgotPassword}>Forgot password</Button>
				</Form>
			</div>
		</section>
	);
};

export default ForgotPassword;
