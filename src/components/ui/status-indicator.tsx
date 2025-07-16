import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'success' | 'pending' | 'error' | 'warning';
  children: React.ReactNode;
  className?: string;
}

export function StatusIndicator({ status, children, className }: StatusIndicatorProps) {
  const statusConfig = {
    success: {
      icon: CheckCircle,
      className: 'text-green-600 bg-green-50 border-green-200'
    },
    pending: {
      icon: Clock,
      className: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    },
    error: {
      icon: XCircle,
      className: 'text-red-600 bg-red-50 border-red-200'
    },
    warning: {
      icon: AlertCircle,
      className: 'text-orange-600 bg-orange-50 border-orange-200'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn(
      'flex items-center space-x-2 px-3 py-2 rounded-md border text-sm font-medium',
      config.className,
      className
    )}>
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </div>
  );
}