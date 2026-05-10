export default function UserPresenter(
  users,
  setUsers
) {
  const addUser = (user) => {
    const newId =
      Math.max(...users.map((u) => u.id), 0) + 1

    setUsers([
      ...users,
      {
        id: newId,
        ...user,
      },
    ])
  }

  const deleteUser = (id) => {
    setUsers(
      users.filter((user) => user.id !== id)
    )
  }

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id
          ? updatedUser
          : user
      )
    )
  }

  return {
    addUser,
    deleteUser,
    updateUser,
  }
}