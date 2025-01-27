import { useState,useEffect } from "react";
import axios from "axios";
import "./FormStyle.css";
import Menu from "../../components/ui/menu";


function FormationUsers() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [Id, setId] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:8081/menu", {
          withCredentials: true,
        });
        if (response.data.valid) {
          // console.log(response.data)
          setId(response.data.id);
        } else {
          console.log("ERREUR")
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    try {
      const userId = Id;
      // console.log(userId+" "+currentPassword+" "+newPassword)
      const response = await axios.put(
        `http://localhost:8081/employeess/${userId}/password`,
        { currentPassword, newPassword }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  
  };

  return (
    <div>
      <Menu />
      <div className="form-container">
        <div className="form-section">
          <h2>Changer le mot de passe</h2>
          {message && <p className="message">{message}</p>}
          <div className="form-group">
            <label><strong>Mot de passe actuel:</strong></label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label><strong>Nouveau mot de passe:</strong></label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label><strong>Confirmer le nouveau mot de passe:</strong></label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <button className="form-button" onClick={handleChangePassword}>
            Changer le mot de passe
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormationUsers;
