import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../assets/css/login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

	const [showPassword, setShowPassword] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const navigate = useNavigate();

	const showHidePassword = () => {
		setShowPassword(!showPassword);
	}

	const loginHandler = async (event) => {
		event.preventDefault();
		let data = event.target;
		data = new FormData(data);
		data = Object.fromEntries(data.entries());
		let result = await fetch(
			`${import.meta.env.VITE_BASE_URL}api/login`,
			{
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			}
		);

		result = await result.json();

		if (result.status) {
			localStorage.setItem("user", JSON.stringify(result.data));
			navigate('/dashboard');
		} else {
			setErrorMsg(result.message);
		}
	}

	return (
		<section className="login_form" >
			<div className='container'>
				<div className='flex justify-center	w-full h-screen items-center'>
					<div className='w-4/12'>
						<div className='logon_img'>
							<img src="images/shared-workspace.gif" alt="" />
						</div>
					</div>
					<div className='w-4/12'>
						<div className='w-full form_log pb-12 pt-6 px-10 rounded-xl shadow-2xl'>

							<form onSubmit={loginHandler}>
								<div className='w-full mb-6 form_logo'>
									<img src="images/iwt-logo.png" alt="" />
									<p className='text-center font-semibold text-red-400'>{errorMsg}</p>
								</div>
								<div className='w-full mb-6'>
									<TextField
										// error
										className='w-full border-white text-white'
										id="outlined-error"
										name='username'
										label="Username"
										required={true}
									/>
								</div>
								<div className='w-full'>
									<TextField
										// error
										className='w-full border-white text-white'
										type={
											showPassword
												?
												'text'
												:
												'password'
										}
										id="outlined-error-helper-text"
										name='password'
										label="Password"
										required={true}
									/>
								</div>
								<div className='w-full mt-2'>
									<FormControlLabel control={<Checkbox className='text-white' />} onChange={showHidePassword} label="Show Password" />
								</div>
								<div className='w-full mt-4'>
									<Button type='submit' variant="contained" className='w-full'>
										Login
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Login