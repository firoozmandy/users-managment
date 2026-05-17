export default function PermissionPresenter(
  permissions,
  setPermissions
) {
  return {
    add(values) {
      const newPermission = {
        id:
          permissions.length > 0
            ? permissions[
                permissions.length - 1
              ].id + 1
            : 1,

        ...values,
      }

      setPermissions([
        ...permissions,
        newPermission,
      ])
    },

    update(updatedPermission) {
      setPermissions(
        permissions.map(
          permission =>
            permission.id ===
            updatedPermission.id
              ? updatedPermission
              : permission
        )
      )
    },

    delete(id) {
      setPermissions(
        permissions.filter(
          permission =>
            permission.id !== id
        )
      )
    },
  }
}