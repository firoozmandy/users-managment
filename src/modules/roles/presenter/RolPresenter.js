
export default function RolePresenter(roles, setRoles) {
  const addRole = (role) => {
    const newId = Math.max(...roles.map((p) => p.id), 0) + 1

    setRoles([
      ...roles,
      {
        id: newId,
        ...role,
      },
    ])
  }

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  const updateRole = (updatedRole) => {
    setRoles(
      roles.map((role) => (role.id === updatedRole.id ? updatedRole : role))
    )
  }
  return {
    addRole,
    deleteRole,
    updateRole,
  };
}
