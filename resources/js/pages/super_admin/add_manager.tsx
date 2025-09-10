import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Label } from '@radix-ui/react-dropdown-menu';

export default function AddManager() {
    const { department } = usePage<{ department: { id: number; name: string } }>().props;
    const { auth } = usePage<{ auth: { user: any; can: { manageDepartments: boolean; manageOwnDepartment: boolean; employees: boolean } } }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        ...(auth.can.manageDepartments
            ? [
                  {
                      title: 'Departments',
                      href: '/departments',
                  },
              ]
            : []),
        ...(auth.can.manageDepartments
            ? [
                  {
                      title: `${department.name}`,
                      href: '/departments',
                  },
              ]
            : []),
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
                      title: `${department.name}`,
                      href: '/manager/table/view',
                  },
              ]
            : []),
    ];

    const { data, setData, post, processing, reset } = useForm({
        department_id: department.id,
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/managers/store', {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Manager" />
            <div className="p-5 pr-40 pl-40">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Manager</CardTitle>
                        <CardDescription>{department.name}</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Label>Name</Label>
                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <Label>Email</Label>
                            <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            <Label>Password</Label>
                            <Input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                        </CardContent>
                        <CardFooter className="mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Adding...' : 'Add Manager'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
