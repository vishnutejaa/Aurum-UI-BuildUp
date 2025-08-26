import React from 'react';
import { Badge } from './badge';
import { cn } from './utils';

export interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Standardized status color mapping
const getStatusColor = (status: string) => {
  const statusLower = status.toLowerCase();
  
  // Project statuses
  if (statusLower.includes('active')) return 'bg-green-100 text-green-800 border-green-200';
  if (statusLower.includes('planning')) return 'bg-blue-100 text-blue-800 border-blue-200';
  if (statusLower.includes('on hold') || statusLower.includes('pending')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (statusLower.includes('completed') || statusLower.includes('delivered')) return 'bg-gray-100 text-gray-800 border-gray-200';
  
  // RFQ statuses
  if (statusLower.includes('draft')) return 'bg-slate-100 text-slate-800 border-slate-200';
  if (statusLower.includes('closed')) return 'bg-purple-100 text-purple-800 border-purple-200';
  if (statusLower.includes('expired')) return 'bg-red-100 text-red-800 border-red-200';
  
  // Quote statuses
  if (statusLower.includes('under review')) return 'bg-blue-100 text-blue-800 border-blue-200';
  if (statusLower.includes('accepted')) return 'bg-green-100 text-green-800 border-green-200';
  if (statusLower.includes('rejected')) return 'bg-red-100 text-red-800 border-red-200';
  
  // PO statuses
  if (statusLower.includes('approved')) return 'bg-green-100 text-green-800 border-green-200';
  if (statusLower.includes('pending approval')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (statusLower.includes('in transit')) return 'bg-blue-100 text-blue-800 border-blue-200';
  
  // Goods statuses
  if (statusLower.includes('shipped')) return 'bg-blue-100 text-blue-800 border-blue-200';
  if (statusLower.includes('received')) return 'bg-green-100 text-green-800 border-green-200';
  if (statusLower.includes('quality check')) return 'bg-orange-100 text-orange-800 border-orange-200';
  
  // Payment statuses
  if (statusLower.includes('paid')) return 'bg-green-100 text-green-800 border-green-200';
  if (statusLower.includes('overdue')) return 'bg-red-100 text-red-800 border-red-200';
  
  // Default
  return 'bg-gray-100 text-gray-800 border-gray-200';
};

// Size variants
const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'text-xs px-2 py-0.5';
    case 'md':
      return 'text-sm px-2.5 py-1';
    case 'lg':
      return 'text-sm px-3 py-1.5';
    default:
      return 'text-xs px-2 py-0.5';
  }
};

export function StatusBadge({ 
  status, 
  variant = 'default', 
  size = 'md',
  className 
}: StatusBadgeProps) {
  const statusColor = getStatusColor(status);
  const sizeClasses = getSizeClasses(size);
  
  if (variant === 'outline') {
    return (
      <Badge 
        variant="outline" 
        className={cn(
          sizeClasses,
          'border-2 font-medium',
          className
        )}
      >
        {status}
      </Badge>
    );
  }
  
  return (
    <Badge 
      className={cn(
        sizeClasses,
        'border-2 font-medium',
        statusColor,
        className
      )}
    >
      {status}
    </Badge>
  );
}
