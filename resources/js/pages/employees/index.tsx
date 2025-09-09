import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/manager/employees',
    },
];

export default function Employees() {
    const { department } = usePage<{ department: { id: number; name: string } }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <p>{department?.name}</p>
        </AppLayout>
    );
}
