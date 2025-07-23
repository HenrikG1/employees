import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface ComponentState {
  employees: Employee[];
}

export default class Root extends React.Component<any, ComponentState> {
  constructor(props: ComponentState) {
    super(props);

    this.state = { employees: [] };
  }

  componentDidMount() {
    // Using JSONPlaceholder API which is free and doesn't require API key
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        // Transform the data to match our Employee interface
        const employees = users.map((user: any) => ({
          id: user.id,
          first_name: user.name.split(' ')[0],
          last_name: user.name.split(' ')[1] || '',
          email: user.email,
          avatar: `https://i.pravatar.cc/150?img=${user.id}` // Random avatar service
        }));
        this.setState({ employees });
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
  }

  render() {
    const { employees } = this.state;

    if (!employees.length) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    return (
      <BrowserRouter basename="/">
        <table className="table table-striped table-bordered table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: Employee) => {
              return (
                <tr key={employee.id}>
                  <th>
                    <Link to={`/employees/${employee.id}`}>{employee.id}</Link>
                  </th>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <em>{this.props.name} using React</em>
      </BrowserRouter>
    );
  }
}
