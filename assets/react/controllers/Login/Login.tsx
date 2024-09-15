import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";

type LoginFormProps = {
	lastUsername: string;
	loginError: "string" | null;
};

type FormData = {
	email: string;
	password: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ lastUsername, loginError }) => {
	const [isBtnDisabled, setIsBtnDisabled] = useState(true);
	const [isEmailError, setIsEmailError] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormData>({
		email: lastUsername,
		password: ""
	});

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const keyFormData =
			event.currentTarget.name === "email"
				? "email"
				: event.currentTarget.name === "password"
				? "password"
				: undefined;
		if (keyFormData) {
			const copyFormData = { ...formData };
			copyFormData[keyFormData] = event.currentTarget.value;
			setFormData(copyFormData);
		}
	};

	const onInputBlur = (event: FocusEvent<HTMLInputElement>) => {
		const getValueInput = event.currentTarget.value;
		if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(getValueInput)) {
			setIsEmailError("Veuillez renseigner une adresse mail valide.");
			setIsBtnDisabled(true);
		} else {
			setIsEmailError(null);
			if (formData.email !== "" && formData.password !== "") {
				setIsBtnDisabled(false);
			}
		}
	};

	useEffect(() => {
		if (formData.email !== "" && formData.password !== "" && !isEmailError) {
			setIsBtnDisabled(false);
		} else {
			setIsBtnDisabled(true);
		}
	}, [formData]);

	return (
		<form
			className="w-96 mx-auto flex flex-col gap-5"
			method="post"
			action="/login"
		>
			{loginError && (
				<p className="bg-red-700 py-2 text-white rounded-md text-center">{loginError}</p>
			)}
			<div className="flex flex-col">
				<label htmlFor="email">
					Votre email<span className="text-red-500">*</span>
				</label>
				<input
					className={`rounded-sm p-2 ${isEmailError ? "border-2 border-red-500" : ""}`}
					type="email"
					name="email"
					id="email"
					placeholder="admin@example.com"
					value={formData["email"]}
					required
					autoFocus
					onChange={onInputChange}
					onBlur={onInputBlur}
				/>
				{isEmailError && <p className="text-red-500">{isEmailError}</p>}
			</div>
			<div className="flex flex-col">
				<label htmlFor="password">
					Votre mot de passe<span className="text-red-500">*</span>
				</label>
				<input
					className="rounded-sm p-2"
					type="password"
					name="password"
					placeholder="test1234"
					value={formData["password"]}
					required
					onChange={onInputChange}
				/>
			</div>
			<button
				className={`bg-green-600 text-white font-semibold py-2 px-3 rounded-md w-fit mx-auto hover:bg-green-700 ${
					isBtnDisabled ? "pointer-events-none opacity-50" : ""
				}`}
				type="submit"
			>
				Connexion
			</button>
		</form>
	);
};

export default LoginForm;
