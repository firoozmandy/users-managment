

export default function PermissionPresenter(
  permissions,
  setPermissions
) {
  const addPermission = (permission) => {
    const newId =
      Math.max(...permissions.map((p) => p.id), 0) + 1;

    setPermissions([
      ...permissions,
      {
        id: newId,
        ...permission,
      },
    ]);
  };

  const deletePermission = (id) => {
    setPermissions(
      permissions.filter(
        (permission) => permission.id !== id
      )
    );
  };

  const updatePermission = (updatedPermission) => {
    setPermissions(
      permissions.map((permission) =>
        permission.id === updatedPermission.id
          ? updatedPermission
          : permission
      )
    );
  };

  return {
    addPermission,
    deletePermission,
    updatePermission,
  };
}