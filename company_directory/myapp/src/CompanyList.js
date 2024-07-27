import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from './api';
import './App.css';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch companies data when component mounts
    useEffect(() => {
        fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/companies/`)
            .then(data => {
                setCompanies(data);
                setFilteredCompanies(data); // Initially, show all companies
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Filter companies based on the search query
    useEffect(() => {
        setFilteredCompanies(
            companies.filter(company =>
                company.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, companies]);

    // Handle changes in the search input field
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Display loading state while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error message if there was an issue fetching data
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="company-list-container">
            <h1>Company List</h1>
            <input
                type="text"
                placeholder="Search by company name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            <div className="company-list">
                {filteredCompanies.map(company => (
                    <Link key={company.company_id} to={`/companydetails/${company.company_id}`} className="company-item">
                        {company.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CompanyList;
