import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MoreHorizontal, Edit, Trash2, Eye, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface UsersTableProps {
  searchTerm: string;
}

const usersData = [
  { id: 1, name: 'John Doe', email: 'john.doe@company.com', role: 'Admin', department: 'IT', status: 'Active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Sarah Wilson', email: 'sarah.wilson@company.com', role: 'Manager', department: 'Procurement', status: 'Active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@company.com', role: 'User', department: 'Operations', status: 'Active', lastLogin: '2024-01-13' },
  { id: 4, name: 'Emily Chen', email: 'emily.chen@company.com', role: 'Manager', department: 'Finance', status: 'Active', lastLogin: '2024-01-12' },
  { id: 5, name: 'David Rodriguez', email: 'david.rodriguez@company.com', role: 'User', department: 'Warehouse', status: 'Inactive', lastLogin: '2024-01-05' },
  { id: 6, name: 'Lisa Anderson', email: 'lisa.anderson@company.com', role: 'Admin', department: 'HR', status: 'Active', lastLogin: '2024-01-14' },
  { id: 7, name: 'Tom Brown', email: 'tom.brown@company.com', role: 'User', department: 'Quality', status: 'Pending', lastLogin: 'Never' },
  { id: 8, name: 'Anna Schmidt', email: 'anna.schmidt@company.com', role: 'Manager', department: 'Sales', status: 'Active', lastLogin: '2024-01-15' },
];

export function UsersTable({ searchTerm }: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = usersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/avatars/${user.id}.png`} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-blue-600 hover:underline cursor-pointer">
                  {user.email}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-gray-400" />
                    <span>{user.role}</span>
                  </div>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell className="text-sm text-gray-600">{user.lastLogin}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      user.status === 'Active' ? 'default' :
                      user.status === 'Pending' ? 'secondary' : 'destructive'
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        Manage Permissions
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deactivate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
        </p>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}