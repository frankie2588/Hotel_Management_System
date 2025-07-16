import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
  show: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export function Notification({ 
  type, 
  title, 
  description, 
  show, 
  onClose, 
  autoClose = true, 
  autoCloseDelay = 5000 
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    
    if (show && autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [show, autoClose, autoCloseDelay, onClose]);

  const typeConfig = {
    success: {
      icon: CheckCircle,
      className: 'bg-green-50 border-green-200 text-green-800'
    },
    error: {
      icon: AlertCircle,
      className: 'bg-red-50 border-red-200 text-red-800'
    },
    info: {
      icon: Info,
      className: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    warning: {
      icon: AlertTriangle,
      className: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    }
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  if (!isVisible) return null;

  return (
    <div className={cn(
      'fixed top-4 right-4 z-50 w-96 rounded-lg border p-4 shadow-lg transition-all duration-300',
      config.className,
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    )}>
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          {description && (
            <p className="mt-1 text-sm opacity-80">{description}</p>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 text-current hover:opacity-70 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}