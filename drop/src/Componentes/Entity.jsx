import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Entity = ({ entityName, entityFields }) => {
    const [entities, setEntities] = useState([]);
    const [formData, setFormData] = useState({});
    const [editId, setEditId] = useState(null);
    const [searchField, setSearchField] = useState('id'); // Default search by ID

    useEffect(() => {
        fetchEntities();
    }, []);

    const fetchEntities = async () => {
        const res = await axios.get(`http://localhost:3001/api/${entityName}`);
        setEntities(res.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const createEntity = async () => {
        await axios.post(`http://localhost:3001/api/${entityName}`, formData);
        setFormData({});
        fetchEntities();
    };

    const updateEntity = async () => {
        const url = searchField === 'id' ? 
            `http://localhost:3001/api/${entityName}/id/${editId}` : 
            `http://localhost:3001/api/${entityName}/nombre/${formData.Nombre}`;
        await axios.put(url, formData);
        setFormData({});
        setEditId(null);
        fetchEntities();
    };

    const deleteEntity = async () => {
        const url = searchField === 'id' ? 
            `http://localhost:3001/api/${entityName}/id/${editId}` : 
            `http://localhost:3001/api/${entityName}/nombre/${formData.Nombre}`;
        await axios.delete(url);
        fetchEntities();
    };

    const searchEntity = async () => {
        const url = searchField === 'id' ? 
            `http://localhost:3001/api/${entityName}/id/${editId}` : 
            `http://localhost:3001/api/${entityName}/nombre/${formData.Nombre}`;
        const res = await axios.get(url);
        setEntities(res.data);
    };

    const editEntity = (entity) => {
        setFormData(entity);
        setEditId(entity.Id);
    };

    return (
        <div>
            <h1>{entityName.charAt(0).toUpperCase() + entityName.slice(1)}</h1>
            {entityFields.map(field => (
                <input 
                    key={field} 
                    type="text" 
                    placeholder={field} 
                    name={field} 
                    value={formData[field] || ''} 
                    onChange={handleInputChange} 
                />
            ))}
            <button onClick={editId ? updateEntity : createEntity}>
                {editId ? 'Update' : 'Create'}
            </button>
            <button onClick={deleteEntity}>
                Delete
            </button>
            <div>
                <label>
                    Search by:
                    <select onChange={(e) => setSearchField(e.target.value)}>
                        <option value="id">ID</option>
                        <option value="nombre">Nombre</option>
                    </select>
                </label>
                <input 
                    type="text" 
                    placeholder={searchField === 'id' ? 'Enter ID' : 'Enter Nombre'}
                    onChange={(e) => setEditId(e.target.value)}
                />
                <button onClick={searchEntity}>Search</button>
            </div>
            <ul>
                {entities.map(entity => (
                    <li key={entity.Id}>
                        {entityFields.map(field => `${entity[field]} `).join('')}
                        <button onClick={() => editEntity(entity)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Entity;
