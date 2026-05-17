export default function UserPresenter(
  users,
  setUsers
) {
  return {
    add(values) {
      const newUser = {
        id:
          users.length > 0
            ? users[
                users.length - 1
              ].id + 1
            : 1,

        ...values,
      }

      setUsers([
        ...users,
        newUser,
      ])
    },

    update(updatedUser) {
      setUsers(
        users.map(user =>
          user.id === updatedUser.id
            ? updatedUser
            : user
        )
      )
    },

    delete(id) {
      setUsers(
        users.filter(
          user => user.id !== id
        )
      )
    },
  }
}