import UserManagement from "./UserManagement";

const Admin: React.FC = () => {
  return (
    <div>
      <header>
        <h4>User management</h4>
        <p>Invite, manage and update users.</p>
      </header>
      <UserManagement />
    </div>
  );
};

export default Admin;
