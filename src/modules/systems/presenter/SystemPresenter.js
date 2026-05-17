export default function SystemPresenter(systems, setSystems) {
  return {
    add(values) {
      const newSystem = {
        id: systems.length > 0 ? systems[systems.length - 1].id + 1 : 1,

        ...values,
      }

      setSystems([...systems, newSystem])
    },

    update(updatedSystem) {
      setSystems(
        systems.map((system) =>
          system.id === updatedSystem.id ? updatedSystem : system,
        ),
      )
    },

    delete(id) {
      setSystems(systems.filter((system) => system.id !== id))
    },
  }
}
