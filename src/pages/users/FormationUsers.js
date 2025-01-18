import { useState } from "react";
import './FormStyle.css';

function FormationUsers() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleCurrentPassword(e) {
    setCurrentPassword(e.target.value);
  }

  function handleNewPassword(e) {
    setNewPassword(e.target.value);
  }

  function handleConfirmNewPassword(e) {
    setConfirmPassword(e.target.value);
  }

  return (
	<div>
    <div className="form-container">

      <div className="form-section">
        <h2>Change Email</h2>
        
        <div className="form-group">
          <label><strong>Email:</strong></label>
          <input type="email" value={email} onChange={handleEmail} className="form-input" />
        </div>

        <button className="form-button">Change Email</button>
      </div>

      <div className="form-section">
        <h2>Change Password</h2>
        <div className="form-group">
          <label><strong>Current password:</strong></label>
          <input type="password" value={currentPassword} onChange={handleCurrentPassword} className="form-input" />
        </div>

        <div className="form-group">
          <label><strong>New password:</strong></label>
          <input type="password" value={newPassword} onChange={handleNewPassword} className="form-input" />
        </div>

        <div className="form-group">
          <label><strong>Confirm New password:</strong></label>
          <input type="password" value={confirmPassword} onChange={handleConfirmNewPassword} className="form-input" />
        </div>

        <button className="form-button">Change Password</button>
      </div>
    </div>
	</div>
  );
}

export default FormationUsers;
