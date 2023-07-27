import { Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import Login from "./components/Login/Login";
import Home from "./components/Home.jsx/Home";

export default function App() {
	return (
		<Layout>
			<Routes>
				{/* auth */}
				{['/', '/login'].map((path, id) => (
					<Route path={path} element={<Login />} key={id} />
				))}
				{/* home */}
				<Route path='/home' element={<Home />} />
				{/* 404 */}
				<Route path='*' element={<h1>404</h1>} />
			</Routes>
		</Layout>
	)
}
