import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';

interface NavigationItem {
  view: string;
  masterData?: string;
  label: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  navigationHistory: NavigationItem[];
  onBack?: () => void;
  onNavigate?: (item: NavigationItem) => void;
  actions?: React.ReactNode;
  showBackButton?: boolean;
  onResetNavigation?: () => void;
}

export function PageHeader({
  title,
  subtitle,
  navigationHistory,
  onBack,
  onNavigate,
  actions,
  showBackButton = true,
  onResetNavigation
}: PageHeaderProps) {
  const canGoBack = navigationHistory.length > 1;

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Home className="h-4 w-4" />
        {navigationHistory.map((item, index) => (
          <React.Fragment key={`${item.view}-${item.masterData}-${index}`}>
            <button
              onClick={() => onNavigate?.(item)}
              className="hover:text-gray-900 transition-colors"
              disabled={index === navigationHistory.length - 1}
            >
              {item.label}
            </button>
            {index < navigationHistory.length - 1 && (
              <ChevronRight className="h-3 w-3" />
            )}
          </React.Fragment>
        ))}
        {navigationHistory.length > 8 && onResetNavigation && (
          <>
            <ChevronRight className="h-3 w-3" />
            <button
              onClick={onResetNavigation}
              className="text-red-600 hover:text-red-800 transition-colors text-xs px-2 py-1 rounded border border-red-200 hover:border-red-300"
              title="Reset navigation history"
            >
              Reset Navigation
            </button>
          </>
        )}
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && canGoBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {navigationHistory.length > 1 && (
                <Badge variant="outline" className="text-xs">
                  {navigationHistory[navigationHistory.length - 1].label}
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}