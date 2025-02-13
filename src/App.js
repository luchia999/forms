import React from'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './App.css';
import './app.module.css';

// Определяем схему валидации
const schema = Yup.object().shape({
  email: Yup.string()
	.email('Email is invalid')
	.required('Email is required'),
  password: Yup.string()
	.required('Password is required')
	.min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
	.oneOf([Yup.ref('password'), null], 'Passwords must match')
	.required('Confirm Password is required'),
});

export const App = () => {
  const { register, handleSubmit, formState: { errors, isValid }, setFocus } =useForm({
	resolver: yupResolver(schema),
	mode: 'onChange',
  });

  const onSubmit = (data) => {
	console.log(data);
  };

  React.useEffect(() => {
	if (isValid) {
	  setFocus('confirmPassword');
	}
  }, [isValid, setFocus]);

  return (
	<div>
	  <h2>Регистрация</h2>
	  <form onSubmit={handleSubmit(onSubmit)}>
		<div>
		  <label>Email</label>
		  <input type="email" {...register('email')} />
		  {errors.email && <p>{errors.email.message}</p>}
		</div>
		<div>
		  <label>Пароль</label>
		  <input type="password" {...register('password')} />
		  {errors.password && <p>{errors.password.message}</p>}
		</div>
		<div>
		  <label>Подтвердите Пароль</label>
		  <input type="password" {...register('confirmPassword')} />
		  {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
		</div>
		<button type="submit" disabled={!isValid}>Зарегистрироваться</button>
	  </form>
	</div>
  );
};
