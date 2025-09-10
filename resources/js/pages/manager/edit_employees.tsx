import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    password: string;
    department_id?: number;
    created_at: string;
    updated_at: string;
}

interface AuthPermissions {
    manageDepartments: boolean;
    manageOwnDepartment: boolean;
    employees: boolean;
}

interface Auth {
    user: User;
    can: AuthPermissions;
}

interface PageProps {
    auth: Auth;
    user: User;
    [key: string]: any;
}

export default function Dashboard() {
    const { auth, user } = usePage<PageProps>().props;

    const { data, setData, put, post, processing, reset } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        ...(auth.can.manageOwnDepartment
            ? [
                  {
                      title: 'Employees',
                      href: '/manager/table/view',
                  },
              ]
            : []),
        ...(auth.can.manageOwnDepartment
            ? [
                  {
                      title: `Edit Details of ${user.name}`,
                      href: '/manager/table/view',
                  },
              ]
            : []),
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/employee/details/edit/store/${user.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-5 pr-40 pl-40">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Details</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Label>Name</Label>
                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <Label>Role</Label>
                            <div className="w-[200px]">
                                <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="manager">Manager</SelectItem>
                                        <SelectItem value="employee">Employee</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Label>Email</Label>
                            <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        </CardContent>
                        <CardFooter className="mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Submiting...' : 'Submit'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
