import { toXML } from "jstoxml";
import { ListCustomersOutputDTO } from "../../../../usecases/customers/list/list-customers.dto";

export class ListCustomersPresenter {
  static toXML(data: ListCustomersOutputDTO): string {
    const xmlOptions = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML({
      customers: data.customers.map(customer => ({
        customer: {
          id: customer.id,
          name: customer.name,
          address: customer.address && {
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            zip: customer.address.zip,
          },
        }
      })),
    }, xmlOptions);
  }
}