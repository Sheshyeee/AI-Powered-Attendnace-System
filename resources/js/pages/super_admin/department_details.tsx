import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

// Define the types for manager and employees
type User = {
    id: number;
    name: string;
    email?: string;
    role?: string;
};

type Department = {
    id: number;
    name: string;
    manager: User[] | null; // Can be null
    employee: User[] | null; // Can be null
};

export default function DepartmentDetails({ department }: { department: Department }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Departments',
            href: '/departments',
        },
        {
            title: `${department.name}`,
            href: '/departments',
        },
    ];

    // Safe access to manager and employee arrays
    const managers = department.manager || [];
    const employees = department.employee || [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Department Details" />
            <div className="p-5">
                <Card>
                    <CardHeader>
                        <CardTitle>{department.name}</CardTitle>
                        <CardDescription>Department Overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            <div className="flex">
                                                <div>{managers.length === 1 ? 'Manager' : 'Managers'}</div>
                                                <div className="ml-auto">
                                                    <Link href={`/departments/${department.id}/AddManager/show`}>
                                                        <Button>
                                                            <Plus w-5 h-5 />
                                                            Add Manager
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {managers.length > 0 ? (
                                            managers.map((manager) => (
                                                <Card key={manager.id} className="mb-2">
                                                    <CardHeader>
                                                        <CardTitle>{manager.name}</CardTitle>
                                                        {manager.email && <CardDescription>{manager.email}</CardDescription>}
                                                    </CardHeader>
                                                </Card>
                                            ))
                                        ) : (
                                            <p>No manager assigned</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="flex-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            {' '}
                                            <div className="flex">
                                                <div>{employees.length === 1 ? 'Employee' : 'Employees'}</div>
                                                <div className="ml-auto">
                                                    <Link href={`/departments/${department.id}/AddEmployee/show`}>
                                                        <Button>
                                                            <Plus w-5 h-5 />
                                                            Add Employee
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {employees.length > 0 ? (
                                            employees.map((employee) => (
                                                <Card key={employee.id} className="mb-2">
                                                    <CardHeader>
                                                        <CardTitle>{employee.name}</CardTitle>
                                                        {employee.email && <CardDescription>{employee.email}</CardDescription>}
                                                    </CardHeader>
                                                </Card>
                                            ))
                                        ) : (
                                            <p>No employee assigned</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
