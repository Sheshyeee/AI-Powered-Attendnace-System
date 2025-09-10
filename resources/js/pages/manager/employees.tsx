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

import { Head, Link, router, usePage } from '@inertiajs/react';
import { Ellipsis, Plus } from 'lucide-react';

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

interface Auth {
    user: User;
}

interface PageProps {
    auth: Auth;
    department: Department;
    [key: string]: any;
}

export default function Employees() {
    // Get data from the controller via Inertia

    const { auth, department } = usePage<PageProps>().props;
    const authUser = auth.user;
    // Combine managers and employees, or just show employees
    const allUsers = [...(department.manager || []), ...(department.employee || [])];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Employees',
            href: '/manager/table/view',
        },
    ];

    const handleDelete = (userId: number) => {
        router.delete(`/employees/${userId}`);
    };

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
                                                {authUser.id === user.id ? (
                                                    <Button disabled variant="ghost">
                                                        <Ellipsis />
                                                    </Button>
                                                ) : (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <Ellipsis className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <Link href={`/employees/${user.id}/edit`}>Edit</Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-red-600 focus:text-red-600"
                                                                onClick={() => handleDelete(user.id)}
                                                            >
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
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
