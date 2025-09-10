import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

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
                        <div className="flex items-center">
                            <CardTitle>Department: {department.name}</CardTitle>
                            <div className="ml-auto">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="outline" className="flex cursor-pointer items-center gap-2">
                                            <Plus />
                                            <p>Add</p>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                          <Link href={`/departments/${department.id}/AddManager/show`}>Add Manager</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Link href={`/departments/${department.id}/AddEmployee/show`}>Add Employee</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
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
                                            <TableCell className="capitalize">
                                                {user.role === 'manager' ? (
                                                    <Badge variant="outline" className="bg-blue-200 text-blue-900">
                                                        Manager
                                                    </Badge>
                                                ) : user.role === 'admin' ? (
                                                    <Badge variant="outline" className="bg-red-200 text-red-900">
                                                        Admin
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-green-200 text-green-900">
                                                        Employee
                                                    </Badge>
                                                )}
                                            </TableCell>
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
