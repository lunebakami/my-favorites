import ProtectedRoute from '../../components/ProtectedRoute';
import Navbar from '../../components/Navbar';

export default function Dashboard() {
  return (
    <ProtectedRoute>
        <Navbar />
        {/* Conteúdo protegido */}
    </ProtectedRoute>
  );
}

