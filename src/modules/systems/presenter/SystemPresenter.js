export default function SystemPresenter(systems, setSystems) {
  const addSystem = (system) => {
     const newId =Math.max(...systems.map(c => c.id), 0)+1;

    setSystems([
      ...systems,
      {
        id: newId,
        ...system,
      },
    ]);
  };

  const deleteSystem = (id) => {
    setSystems(systems.filter((system) => system.id !== id));
  };

  const updateSystem = (updatedSystem) => {
    setSystems(
      systems.map((system) =>
        system.id === updatedSystem.id ? updatedSystem : system
      )
    );
  };

  return {
    addSystem,
    deleteSystem,
    updateSystem,
  };
}
