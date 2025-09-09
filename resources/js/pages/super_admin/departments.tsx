import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departments',
        href: '/departments',
    },
];

export default function Departments() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const page = usePage<{ departments: any[] }>();
    const departments = page.props.departments;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/departments/store', {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    const [open, setOpen] = useState(false);
    const [openAddManager, setOpenAddManager] = useState(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Departments" />
            <div className="p-5">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Departments</CardTitle>

                            <div>
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant={'outline'}>Add Department</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add Department</DialogTitle>
                                            <DialogDescription>Dialog description goes here.</DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <Input
                                                type="text"
                                                placeholder="Department Name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            <Button type="submit" disabled={processing}>
                                                {processing ? 'Adding...' : 'Add Department'}
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {departments.map((dept) => (
                                <Link href={`/departments/detail/${dept.id}`} key={dept.id}>
                                    <Card key={dept.id} className="mb-4 w-[50%]">
                                        <CardHeader>
                                            <div className="flex">
                                                <div>
                                                    <CardTitle>{dept.name}</CardTitle>
                                                    <CardDescription>
                                                        This department has ({dept.manager.length}) managers and ({dept.employee.length}) employees.
                                                    </CardDescription>
                                                </div>
                                                <div className="ml-auto">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" size="icon">
                                                                <Ellipsis />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <Link href={`/departments/${dept.id}/AddManager/show`}>Add Manager</Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Link href={`/departments/${dept.id}/AddEmployee/show`}>Add Employee</Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem variant="destructive">
                                                                <Link href={`/departments/${dept.id}/delete`}>Delete</Link>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
