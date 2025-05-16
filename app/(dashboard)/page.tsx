import { GetFormStats } from '@/action/form';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React, { ReactNode, Suspense } from 'react';
import { LuView } from 'react-icons/lu';
import {FaWpforms} from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/components/CreateFormBtn';
export default function Home() {
  return (
    <div className="container py-8 px-4 mx-auto mt-4">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's an overview of your form stats.</p>
      </div>
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatWrapper />
      </Suspense>
      <Separator className='my-7 mt-15'/>
        <h2 className='text-6xl font-bold col-span-2'>Your Forms</h2>
        <Separator className='my-7'/>
        <CreateFormBtn/>
    </div>
  );
}

async function CardStatWrapper() {
  const stats = await GetFormStats();
  return <StatsCards data={stats} loading={false} />;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      <StatsCard
        title="Total visits"
        icon={<LuView className="text-blue-600" />}
        helperText="Total visits on forms"
        value={data?.visits?.toLocaleString() || ""}
        loading={loading}
        className="shadow-lg shadow-blue-600"
      />
      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="Total submissions on forms"
        value={data?.submissions?.toLocaleString()  || ""}
        loading={loading}
        className="shadow-lg shadow-yellow-600"
      />
      <StatsCard
        title="Submission Rate"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="Visits that result in form submission"
        value={data?.submissionRate?.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-lg shadow-green-600"
      />
        <StatsCard
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Visits that leave without interacting"
        value={data?.bounceRate?.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-lg shadow-red-600"
      />
    </div>
  );
}

function StatsCard({
  title,
  value,
  loading,
  helperText,
  icon,
  className,
}: {
  title: string;
  value: string;
  loading: boolean;
  helperText: string;
  icon: ReactNode;
  className: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? <Skeleton className="w-16 h-6" /> : value}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{helperText}</p>
      </CardContent>
    </Card>
  );
}
