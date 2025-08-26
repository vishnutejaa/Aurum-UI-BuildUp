import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ArrowLeft, Edit, Trash2, Copy, Download, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface DisplayField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'tags' | 'badge' | 'currency' | 'avatar' | 'link';
  format?: (value: any) => string;
  badgeColor?: 'default' | 'destructive' | 'outline' | 'secondary';
}

interface GenericDetailViewProps {
  title: string;
  subtitle?: string;
  data: any;
  fields: DisplayField[];
  onEdit?: () => void;
  onDelete?: () => void;
  onBack: () => void;
  actions?: Array<{
    label: string;
    icon: React.ElementType;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  }>;
}

export function GenericDetailView({
  title,
  subtitle,
  data,
  fields,
  onEdit,
  onDelete,
  onBack,
  actions = []
}: GenericDetailViewProps) {
  const formatValue = (field: DisplayField, value: any) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-400">Not set</span>;
    }

    switch (field.type) {
      case 'email':
        return (
          <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
            {value}
          </a>
        );
      
      case 'link':
        return (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {value}
          </a>
        );
      
      case 'date':
        return new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      
      case 'tags':
        if (Array.isArray(value)) {
          return (
            <div className="flex flex-wrap gap-1">
              {value.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          );
        }
        return value;
      
      case 'badge':
        return (
          <Badge variant={field.badgeColor || 'default'}>
            {value}
          </Badge>
        );
      
      case 'avatar':
        return (
          <Avatar className="h-10 w-10">
            <AvatarImage src={value} />
            <AvatarFallback>
              {data.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        );
      
      default:
        return field.format ? field.format(value) : value;
    }
  };

  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      ?.map(word => word.charAt(0))
      ?.join('')
      ?.toUpperCase()
      ?.slice(0, 2) || 'UN';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4">
            {data.avatar && (
              <Avatar className="h-12 w-12">
                <AvatarImage src={data.avatar} />
                <AvatarFallback>
                  {getInitials(data.name || title)}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <h1 className="text-2xl font-bold">{data.name || data.title || title}</h1>
              {subtitle && <p className="text-gray-600">{subtitle}</p>}
              {data.status && (
                <Badge variant={data.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                  {data.status}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              onClick={action.onClick}
              size="sm"
            >
              <action.icon className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          ))}
          
          {(onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {onEdit && (
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </DropdownMenuItem>
                {onDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={onDelete}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
              <CardDescription>
                Details and configuration for this {title.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields
                .filter(field => !['avatar'].includes(field.type))
                .map((field, index) => (
                  <div key={field.name}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1 flex-1">
                        <Label className="text-sm font-medium text-gray-700">
                          {field.label}
                        </Label>
                        <div className="text-sm">
                          {formatValue(field, data[field.name])}
                        </div>
                      </div>
                    </div>
                    {index < fields.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Additional sections can be added here based on data type */}
          {data.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{data.description}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Created</span>
                <span className="text-sm font-medium">
                  {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Modified</span>
                <span className="text-sm font-medium">
                  {data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
              {data.createdBy && (
                <>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Created By</span>
                    <span className="text-sm font-medium">{data.createdBy}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Related Items */}
          {data.relatedCount && (
            <Card>
              <CardHeader>
                <CardTitle>Related Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(data.relatedCount).map(([key, count]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <label className={className}>
      {children}
    </label>
  );
}