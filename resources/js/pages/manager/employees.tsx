import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Department {
    id: number;
    name: string;
    manager: User[];
    employee: User[];
}

interface PageProps {
    department: Department;
    [key: string]: any;
}

export default function Employees() {
    // Get data from the controller via Inertia
    const { department } = usePage<PageProps>().props;

    // Combine managers and employees, or just show employees
    const allUsers = [...(department.manager || []), ...(department.employee || [])];
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Employees',
            href: '/manager/table/view',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />
            <div className="p-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Department: {department.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Added At</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allUsers.length > 0 ? (
                                    allUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell className="capitalize">{user.role}</TableCell>
                                            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                {/* Add your actions here */}
                                                <span className="text-muted-foreground">Actions</span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            No employees found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
