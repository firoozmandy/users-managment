export default function PagePresenter(
  pages,
  setPages
) {
  return {
    add(values) {
      const newPage = {
        id:
          pages.length > 0
            ? pages[
                pages.length - 1
              ].id + 1
            : 1,

        ...values,
      }

      setPages([
        ...pages,
        newPage,
      ])
    },

    update(updatedPage) {
      setPages(
        pages.map(page =>
          page.id === updatedPage.id
            ? updatedPage
            : page
        )
      )
    },

    delete(id) {
      setPages(
        pages.filter(
          page => page.id !== id
        )
      )
    },
  }
}