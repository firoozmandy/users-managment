import { Routes, Route } from "react-router-dom";
import AppLayout from "./shared/layout/AppLayout";

import UsersPage from "./modules/users/view/UsersPage";
import RolesPage from "./modules/roles/view/RolesPage";
import PagesPage from "./modules/pages/view/PagesPage";
import SystemPage from "./modules/systems/view/SystemPage";
import CompaniesPage from "./modules/companies/view/CompaniesPage";
import PermissionsPage from "./modules/permissions/view/permissionsPage";
import AccessViewerPage from "./modules/users/view/AccessViewerPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/systems" element={<SystemPage />} />
        <Route path="/pages" element={<PagesPage />} />
        <Route path="/permissions" element={<PermissionsPage/>} />
        <Route path="/access-viewer" element={<AccessViewerPage/>} />

      </Routes>
    </AppLayout>
  );
}

export default App;
