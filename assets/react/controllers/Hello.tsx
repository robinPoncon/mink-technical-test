import React from "react";

type HelloProps = {
	fullName: string;
};

const Hello: React.FC<HelloProps> = ({ fullName }) => {
	console.log("test " + fullName);
	return <div>Hello component {fullName}</div>;
};

export default Hello;
