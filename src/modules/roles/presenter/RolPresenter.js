export default function RolePresenter(
  roles,
  setRoles
) {
  return {
    add(values) {
      const newRole = {
        id:
          roles.length > 0
            ? roles[
                roles.length - 1
              ].id + 1
            : 1,

        ...values,
      }

      setRoles([
        ...roles,
        newRole,
      ])
    },

    update(updatedRole) {
      setRoles(
        roles.map(role =>
          role.id === updatedRole.id
            ? updatedRole
            : role
        )
      )
    },

    delete(id) {
      setRoles(
        roles.filter(
          role => role.id !== id
        )
      )
    },
  }
}