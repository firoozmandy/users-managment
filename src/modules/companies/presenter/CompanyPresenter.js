export default class CompanyPresenter {
  constructor(companies, setCompanies) {
    this.companies = companies;
    this.setCompanies = setCompanies;
  }

  addCompany(company) {
    const newId =Math.max(...this.companies.map(c => c.id), 0)+1;
    this.setCompanies([
      ...this.companies,

      {
        id:newId,
        ...company,
      },
    ]);
  }

  deleteCompany(id) {
    this.setCompanies(this.companies.filter((company) => company.id !== id));
  }

  updateCompany(updatedCompany) {
    this.setCompanies(
      this.companies.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
  }
}
