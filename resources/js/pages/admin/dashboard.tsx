import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table ,TableColumn } from '@/components/ui/table';
import { Users, Eye, Video, MessageSquare } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

// Sample DataAdd commentMore actions
const stats = [
    {
      title: "Total Users",
      value: 120,
      icon: <Users className="text-primary size-6" />,
    },
    {
      title: "Total Views",
      value: 2400,
      icon: <Eye className="text-primary size-6" />,
    },
    {
      title: "Total Animations",
      value: 85,
      icon: <Video className="text-primary size-6" />,
    },
    {
      title: "Pending Reviews",
      value: 7,
      icon: <MessageSquare className="text-primary size-6" />,
    },
  ];
  
  // Sample Animation Data
  type Animation = {
    id: number;
    title: string;
    category: string;
    postedBy: string;
    views: number;
  };
  
  const animations: Animation[] = [
    { id: 1, title: "The Lion King Intro", category: "Cartoon", postedBy: "John Doe", views: 320 },
    { id: 2, title: "Spiderman Short Clip", category: "Action", postedBy: "Jane Smith", views: 189 },
    { id: 3, title: "Frozen Scene Recreation", category: "Fantasy", postedBy: "Anna Lee", views: 245 },
  ];
  
  const animationColumns: TableColumn<Animation>[] = [
    { key: 'title', label: 'Animation Title' },
    { key: 'category', label: 'Category' },
    { key: 'postedBy', label: 'Posted By' },
    { key: 'views', label: 'Views' },
  ];

export default function Dashboard() {
    return (
        <AdminLayout >
            <div className="space-y-6 p-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
    
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-sm font-medium">
                    {stat.title}
                    {stat.icon}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
    
          {/* Recent Animations Table */}
          <Table<Animation>
            title="Recent Animations"
            data={animations}
            columns={animationColumns}
          />
        </div>
        </AdminLayout>
      );
    }
