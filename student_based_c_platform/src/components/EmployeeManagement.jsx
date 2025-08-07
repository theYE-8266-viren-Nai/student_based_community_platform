import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';

const EmployeeManagementSystem = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create', 'edit', 'view'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const API_BASE_URL = 'http://localhost:8080/api/employees';

  // Clear messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
      setError('');
    } catch (err) {
      setError('Error fetching employees: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single employee by ID
  const fetchEmployeeById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) throw new Error('Employee not found');
      const data = await response.json();
      setSelectedEmployee(data);
      setFormData(data);
      setError('');
      return data;
    } catch (err) {
      setError('Error fetching employee: ' + err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create new employee
  const createEmployee = async (employeeData) => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) throw new Error('Failed to create employee');
      const data = await response.json();
      setSuccess('Employee created successfully!');
      fetchEmployees(); // Refresh the list
      resetForm();
      return data;
    } catch (err) {
      setError('Error creating employee: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update employee
  const updateEmployee = async (id, employeeData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) throw new Error('Failed to update employee');
      const data = await response.json();
      setSuccess('Employee updated successfully!');
      fetchEmployees(); // Refresh the list
      resetForm();
      return data;
    } catch (err) {
      setError('Error updating employee: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete employee');
      setSuccess('Employee deleted successfully!');
      fetchEmployees(); // Refresh the list
    } catch (err) {
      setError('Error deleting employee: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Form handlers
  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', email: '' });
    setShowForm(false);
    setSelectedEmployee(null);
    setFormMode('create');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formMode === 'create') {
      await createEmployee(formData);
    } else if (formMode === 'edit') {
      await updateEmployee(selectedEmployee.id, formData);
    }
  };

  const openForm = (mode, employee = null) => {
    setFormMode(mode);
    setShowForm(true);
    if (employee) {
      setSelectedEmployee(employee);
      setFormData(employee);
    } else {
      resetForm();
      setShowForm(true);
    }
  };

  const viewEmployee = async (id) => {
    const employee = await fetchEmployeeById(id);
    if (employee) {
      openForm('view', employee);
    }
  };

  // Load employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-6xl px-4 mx-auto">
        {/* Header */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Employee Management System</h1>
            <button
              onClick={() => openForm('create')}
              className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              Add Employee
            </button>
          </div>
          
          {/* API Endpoints Info */}
          <div className="p-4 mt-4 bg-gray-100 rounded-lg">
            <h3 className="mb-2 font-semibold text-gray-700">Testing REST API Endpoints:</h3>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 md:grid-cols-2">
              <div>• GET /api/employees - Get all employees</div>
              <div>• GET /api/employees/{`{id}`} - Get employee by ID</div>
              <div>• POST /api/employees - Create new employee</div>
              <div>• PUT /api/employees/{`{id}`} - Update employee</div>
              <div>• DELETE /api/employees/{`{id}`} - Delete employee</div>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="px-4 py-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
            {success}
          </div>
        )}

        {/* Employee Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {formMode === 'create' ? 'Add New Employee' : 
                   formMode === 'edit' ? 'Edit Employee' : 'View Employee'}
                </h2>
                <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              
              <div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={formMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={formMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={formMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                  />
                </div>
                
                <div className="flex gap-2">
                  {formMode !== 'view' && (
                    <button
                      onClick={handleSubmit}
                      disabled={loading || !formData.firstName || !formData.lastName || !formData.email}
                      className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Save size={20} />
                      {loading ? 'Saving...' : (formMode === 'create' ? 'Create' : 'Update')}
                    </button>
                  )}
                  <button
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
                  >
                    {formMode === 'view' ? 'Close' : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employee Table */}
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Employee List ({employees.length})
            </h2>
          </div>
          
          {loading && !showForm ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-600">Loading employees...</p>
            </div>
          ) : employees.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No employees found. Click "Add Employee" to create your first employee.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      First Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Last Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {employee.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {employee.firstName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {employee.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {employee.email}
                      </td>
                      <td className="px-6 py-4 space-x-2 text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => viewEmployee(employee.id)}
                          className="p-1 text-blue-600 transition-colors rounded hover:text-blue-900"
                          title="View Employee"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openForm('edit', employee)}
                          className="p-1 text-green-600 transition-colors rounded hover:text-green-900"
                          title="Edit Employee"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteEmployee(employee.id)}
                          className="p-1 text-red-600 transition-colors rounded hover:text-red-900"
                          title="Delete Employee"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* API Testing Instructions */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">How to Test the APIs</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-gray-700">Frontend Actions:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Click "Add Employee" to test POST /api/employees</li>
                <li>• Click eye icon to test GET /api/employees/{`{id}`}</li>
                <li>• Click edit icon to test PUT /api/employees/{`{id}`}</li>
                <li>• Click delete icon to test DELETE /api/employees/{`{id}`}</li>
                <li>• Page load tests GET /api/employees</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-gray-700">Expected Data Format:</h4>
              <pre className="p-2 text-xs bg-gray-100 rounded">
{`{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",  
  "email": "john.doe@email.com"
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagementSystem;