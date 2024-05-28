import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateComponent from './components/PrivateComponent';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CompanyProfile from './pages/CompanyProfile';
import CompanyProfileData from './pages/CompanyProfileData';
import Employees from './pages/Employees';
import EmployeeData from './pages/EmployeeData';
import Logout from './pages/Logout';
import Designation from './pages/Designation';
import PartyType from './pages/PartyType';

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route element={<PrivateComponent />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/companyProfiles" element={<CompanyProfile />} />
					<Route path="/companyProfiles/data" element={<CompanyProfileData />} />
					<Route path="/employees" element={<Employees />} />
					<Route path="/employees/data" element={<EmployeeData />} />
					<Route path="/employees/data/:_id" element={<EmployeeData />} />
					<Route path="/designations" element={<Designation />} />
					<Route path="/partyTypes" element={<PartyType />} />
					<Route path="/logout" element={<Logout />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App