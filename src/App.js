import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // fetch('http://localhost/client-form-backend/api.php')
    fetch('http://localhost/client-form/api/api.php')
    .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { name, address, phone };

    if (!name || !address || !phone) {
      alert('Harap lengkapi semua kolom input!');
      return;
    }

    fetch('http://localhost/client-form/api/submit.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      const whatsappLink = `https://api.whatsapp.com/send?phone=6281234567890&text=hallo%2C%0Asaya%20*${encodeURIComponent(name)}*%0Aalamat%20*${encodeURIComponent(address)}*%0Anomor%20telp%20*${encodeURIComponent(phone)}*`;
      window.location.href = whatsappLink;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
      <h1>User List</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>Nama: {user.name} [{user.address}, {user.phone}]</li>
          ))}
        </ul>
        <hr/>
        <h1>Form User</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nama:</label>
            <input type="text" name="name"  value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Alamat:</label>
            <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div>
            <label>Nomor Telepon:</label>
            <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
