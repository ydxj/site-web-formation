import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeManagement.css';
import Menu from '../../../components/ui/menu';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    service: '',
    image: null
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setFilteredEmployees(
      employees.filter(employee => 
        employee.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, employees]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8081/employees');
      setEmployees(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des employés:', err);
      setError('Impossible de récupérer les employés.');
    }
  };

  const addOrEditEmployee = async (e) => {
    e.preventDefault();
  
    if (editingEmployee) {
      try {
        const updateData = { ...newEmployee };
        const formData = new FormData();
        formData.append('name', updateData.name);
        formData.append('service', updateData.service);
        formData.append('email', updateData.email);
        formData.append('role', updateData.role);
        formData.append('password', updateData.password);
        formData.append('profile', updateData.image); // this should be a File object

        // if (newEmployee.newPassword) {
        //   await axios.put(`http://localhost:8081/employees/${editingEmployee.id}/password`, {
        //     password: newEmployee.newPassword,
        //   });
        //   delete updateData.newPassword; 
        // }
        await axios.put(`http://localhost:8081/employees/${editingEmployee.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setEmployees(
          employees.map((employee) =>
            employee.id === editingEmployee.id ? { ...editingEmployee, ...newEmployee } : employee
          )
        );
        resetForm();
      } catch (err) {
        console.error('Error updating employee:', err);
        setError('Failed to update employee.');
      }
    } else {
        const formData = new FormData();
        formData.append('name', newEmployee.name);
        formData.append('service', newEmployee.service);
        formData.append('email', newEmployee.email);
        formData.append('role', newEmployee.role);
        formData.append('password', newEmployee.password);

        // 👇 VERY IMPORTANT: this name MUST match `uploadProfile.single('profile')`
        formData.append('profile', newEmployee.image); // this should be a File object

        try {
          const res = await axios.post('http://localhost:8081/employees', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          const addedEmployee = { ...newEmployee, id: res.data.id, fullname: newEmployee.name };
          setEmployees([...employees, addedEmployee]);
          resetForm();
        } catch (err) {
          console.error('Error adding employee:', err);
          setError('Failed to add employee.');
        }
    }
  };
  
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/employees/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'employé:', err);
      setError('Impossible de supprimer l\'employé.');
    }
  };

  const resetForm = () => {
    setNewEmployee({ name: '', email: '', password: '', role: '', service: '' });
    setEditingEmployee(null);
  };

  const startEditing = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee({
      name: employee.fullname,
      email: employee.email,
      password: '',
      role: employee.role,
      service: employee.service,
    });
  };

  return (
    <div>
        <Menu />
        <div className="employee-management">
        <h1>Gestion des Employés</h1>
        {error && <div className="alert">{error}</div>}
        <form onSubmit={addOrEditEmployee} className="employee-form">
            <h2>{editingEmployee ? 'Modifier Employé' : 'Ajouter Employé'}</h2>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input id="name" type="text" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input id="password" type="password" value={newEmployee.password} onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })} required />
            </div>
            <div className="form-group">
              <label htmlFor="image">image de profile (optionnel)</label>
              <input type="file" id="profile" name="profile" accept="image/*" onChange={(e) => setNewEmployee({ ...newEmployee, image: e.target.files[0] })} />
            </div>
            <div className="form-group">
              <label htmlFor="role" className="form-label">Rôle</label>
              <select className="form-select" id="role" value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="service">Service</label>
              <select id="service" name="service" onChange={(e) => setNewEmployee({ ...newEmployee, service: e.target.value })} required>
                <option value="">-- Sélectionner un service --</option>
                <option value="Urgences">Urgences</option>
                <option value="Cardiologie">Cardiologie</option>
                <option value="Neurologie">Neurologie</option>
                <option value="Pédiatrie">Pédiatrie</option>
                <option value="Radiologie">Radiologie</option>
                <option value="Gynécologie">Gynécologie</option>
                <option value="Chirurgie">Chirurgie</option>
                <option value="Dermatologie">Dermatologie</option>
                <option value="Oncologie">Oncologie</option>
                <option value="Psychiatrie">Psychiatrie</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
            {editingEmployee ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editingEmployee && <button type="button" onClick={resetForm} className="btn btn-secondary">Annuler</button>}
        </form>
        </div>
        <div className='container'>
          <label htmlFor="Rechercher un utilisateur">Rechercher un utilisateur</label>
          <input
            type="text"
            placeholder="Rechercher un employé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
            style={{border:"0.5px gray solid",borderRadius:"10px"}}
          />
        </div>
        
        <table className="employees-table">
            <thead>
            <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Service</th>
                <th>Rôle</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                   <td data-label="Nom">{employee.fullname}</td>
                   <td data-label="Email">{employee.email}</td>
                   <td data-label="Service">{employee.service}</td>
                   <td data-label="Rôle">{employee.role}</td>
                   <td>
                    <button onClick={() => startEditing(employee)} className="btn btn-bleu">Modifier</button>
                    <button onClick={() => deleteEmployee(employee.id)} className="btn btn-danger">Supprimer</button>
                  </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="4" className="text-center">Aucun employé trouvé.</td>
                </tr>
            )}
            </tbody>
        </table>
    </div>
  );
}

export default EmployeeManagement;
