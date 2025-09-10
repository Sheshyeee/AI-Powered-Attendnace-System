import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Record Attendance',
        href: '/manager/employees',
    },
];

export default function Employees() {
    const { department } = usePage<{ department: { id: number; name: string } }>().props;

    const [time, setTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // convert 0 → 12 and 13–23 → 1–11

            setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleAction = (status: string) => {
        router.post('/attendance/employee', { status });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="mt-[-150px] flex h-full w-full flex-col items-center justify-center space-y-[85px] p-4 text-center">
                <div className="flex flex-col space-y-[-10px]">
                    <h1 className="text-[50px] tracking-widest text-red-500">Clock</h1>
                    <p className="text-[70px] tracking-widest">{time}</p>
                </div>
                <div className="flex space-x-8">
                    <Button onClick={() => handleAction('time_in')} variant="ghost">
                        <Card className="w-[200px] cursor-pointer">
                            <CardHeader>
                                <CardTitle>Time In</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                        </Card>
                    </Button>

                    <Button onClick={() => handleAction('time_out')} variant="ghost">
                        <Card className="w-[200px] cursor-pointer">
                            <CardHeader>
                                <CardTitle>Time Out</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                        </Card>
                    </Button>
                    <Button variant="ghost">
                        <Card className="w-[200px] cursor-pointer">
                            <CardHeader>
                                <CardTitle>Other</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                        </Card>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
