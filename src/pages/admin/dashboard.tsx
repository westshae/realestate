import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/basic/card';
import Link from 'next/link';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <div className="mx-auto w-[80%] py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <Link href="/admin" className="block hover:opacity-80 transition-opacity">
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle>Home</CardTitle>
              </CardHeader>
              <CardContent>
                Navigate to home
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/stage-management" className="block hover:opacity-80 transition-opacity">
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle>Stage Management</CardTitle>
              </CardHeader>
              <CardContent>
                Manage stages
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/machine-management" className="block hover:opacity-80 transition-opacity">
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle>Machine Management</CardTitle>
              </CardHeader>
              <CardContent>
                Manage machines
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
