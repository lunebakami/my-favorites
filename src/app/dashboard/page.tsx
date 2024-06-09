import ProtectedRoute from '../../components/ProtectedRoute';
import LogoutButton from '../../components/LogoutButton';
import Navbar from '../../components/Navbar';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <h1>Dashboard</h1>
        <LogoutButton />
        {/* Conteúdo protegido */}
      </div>
    </ProtectedRoute>
  );
}

