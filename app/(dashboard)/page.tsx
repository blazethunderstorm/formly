import { GetForms, GetFormStats } from '@/action/form';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React, { ReactNode, Suspense } from 'react';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/components/CreateFormBtn';
import { Form } from '@/lib/generated/prisma';
import { BiRightArrowAlt } from 'react-icons/bi'; 
import { FaEdit } from 'react-icons/fa';
import { formatDistance } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <div className="container py-8 px-4 mx-auto mt-4">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's an overview of your form stats.</p>
      </div>
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatWrapper />
      </Suspense>
      <Separator className='my-7 mt-15'/>
      <h2 className='text-4xl font-bold col-span-2'>Your Forms</h2>
      <Separator className='my-7'/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateFormBtn/>
        <Suspense fallback={[1,2,3,4].map(el => <FormCardSkeleton key={el}/>)}>
          <FormCards/>
        </Suspense>
      </div>
    </div>
    </>
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
    <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
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

function FormCardSkeleton() {
  return <Skeleton className='border-2 border-primary-/20 h-[190px] w-full'/>
}

async function FormCards() {
  const forms = await GetForms();
  
  return (
    <>
      {forms.map((form: Form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 justify-between'>
          <span className='truncate font-bold'>
            {form.name}
          </span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant="destructive">Draft</Badge>}
        </CardTitle>
        <CardDescription>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className='flex items-center gap-2'>
              <LuView className='text-muted-foreground'/>
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className='text-muted-foreground'/>
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
        {form.description || "No Description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button variant={"secondary"} asChild>
            <Link href={`/forms/${form.id}`}>
              View Submissions <BiRightArrowAlt/>
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button  variant={"secondary"} asChild>
            <Link href={`/builder/${form.id}`}>
              Edit Form <FaEdit/>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}