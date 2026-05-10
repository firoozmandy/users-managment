

export default function PagePresenter(pages, setPages) {
  const addPage = (page) => {
    const newId = Math.max(...pages.map((p) => p.id), 0) + 1;
    setPages([
      ...pages,
      {
        id: newId,
        ...page,
      },
    ]);
  };

  const deletePage = (id) => {
    setPages(pages.filter((page) => page.id !== id));
  };

  const updatePage = (updatedPage) => {
    setPages(
      pages.map((page) => (page.id === updatedPage.id ? updatedPage : page))
    );
  };
  return {
    addPage,
    deletePage,
    updatePage,
  };
}
