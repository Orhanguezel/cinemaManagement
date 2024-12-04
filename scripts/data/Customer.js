export class Customer {
    constructor(id, name, email, phone, registeredDate) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.registeredDate = registeredDate;
    }
  }
  
  export const customers = [
    new Customer(1, "John Doe", "john@example.com", "+123456789", "2023-12-01"),
    new Customer(2, "Jane Smith", "jane@example.com", "+987654321", "2023-11-25")
  ];
  