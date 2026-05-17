export default function CompanyPresenter(
  companies,
  setCompanies
) {
  return {


add(values) {
  const newCompany = {
    id:
      companies.length > 0
        ? companies[
            companies.length - 1
          ].id + 1
        : 1,

    ...values,
  }

  setCompanies([
    ...companies,
    newCompany,
  ])
},

    update(updatedCompany) {
      setCompanies(
        companies.map(company =>
          company.id ===
          updatedCompany.id
            ? updatedCompany
            : company
        )
      )
    },

    delete(id) {
      setCompanies(
        companies.filter(
          company => company.id !== id
        )
      )
    },
  }
}