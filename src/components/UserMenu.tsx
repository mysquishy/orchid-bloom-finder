
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Crown, CreditCard } from 'lucide-react';
import AuthModal from './auth/AuthModal';
import { toast } from 'sonner';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const { subscribed, subscriptionTier, openCustomerPortal } = useSubscription();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleManageSubscription = async () => {
    try {
      await openCustomerPortal();
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error('Failed to open subscription management');
    }
  };

  if (!user) {
    return (
      <>
        <Button
          onClick={() => setShowAuthModal(true)}
          className="bg-gradient-to-r from-green-500 to-purple-600 text-white hover:from-green-600 hover:to-purple-700"
        >
          Sign In
        </Button>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  const userInitials = user.user_metadata?.first_name && user.user_metadata?.last_name
    ? `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`
    : user.email?.[0]?.toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-gradient-to-br from-green-500 to-purple-600 text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.user_metadata?.first_name && (
              <p className="font-medium text-sm">
                {user.user_metadata.first_name} {user.user_metadata.last_name}
              </p>
            )}
            <p className="w-[200px] truncate text-xs text-muted-foreground">
              {user.email}
            </p>
            {subscribed && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs w-fit">
                <Crown className="w-3 h-3" />
                <span>{subscriptionTier}</span>
              </div>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        {subscribed && (
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={handleManageSubscription}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Manage Subscription
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
