import { useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, ChartBar as BarChart3, Shield, Upload, Sparkles } from 'lucide-react';
import { useAuth } from '../App';

const sidebarItems = [
  { id: 'profile', label: 'Profile', icon: User, emoji: '👤' },
  { id: 'usage', label: 'Usage', icon: BarChart3, emoji: '📊' },
  { id: 'account', label: 'Account', icon: Shield, emoji: '🔐' }
];

function ProfileSection() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleSaveChanges = () => {
    // Simulate save operation
    console.log('Saving changes...', { displayName });
  };

  const handleAvatarUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => setIsUploading(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Public Profile</h2>
        <p className="text-gray-600 mt-1">Manage your public profile information</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xl">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button 
                onClick={handleAvatarUpload}
                disabled={isUploading}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>{isUploading ? 'Uploading...' : 'Upload a new picture'}</span>
              </Button>
              <p className="text-sm text-gray-500 mt-1">JPG, PNG, or GIF (max 5MB)</p>
            </div>
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="mt-1 bg-gray-50"
              />
              <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
            </div>
          </div>

          <Button onClick={handleSaveChanges} className="w-full sm:w-auto">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function UsageSection() {
  const usageData = {
    transcription: { used: 42, total: 60, unit: 'minutes' },
    wordsGenerated: 12500,
    codeSnippets: 42
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Monthly Usage</h2>
        <p className="text-gray-600 mt-1">Your free plan usage resets on the 1st of each month.</p>
      </div>

      <div className="space-y-4">
        {/* Audio & Video Transcription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🎤</span>
              <span>Audio & Video Transcription</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{usageData.transcription.used} / {usageData.transcription.total} {usageData.transcription.unit} used</span>
                <span>{Math.round((usageData.transcription.used / usageData.transcription.total) * 100)}%</span>
              </div>
              <Progress value={(usageData.transcription.used / usageData.transcription.total) * 100} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* AI Generations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🤖</span>
              <span>AI Generations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{usageData.wordsGenerated.toLocaleString()}</div>
                <div className="text-sm text-blue-700">Words Generated</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{usageData.codeSnippets}</div>
                <div className="text-sm text-green-700">Code Snippets Created</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Prompt */}
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Need more usage?</h3>
                <p className="text-gray-600 text-sm mt-1">Upgrade to Pro for unlimited AI generations and priority support.</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Upgrade
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AccountSection() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === 'DELETE') {
      // Simulate account deletion
      console.log('Account deleted');
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-600 mt-1">Manage your account preferences and security</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>Sign out of your current session</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogout} variant="outline" className="w-full sm:w-auto">
            Log Out
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            These actions are permanent and cannot be undone. Please proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                  
                  <div className="mt-4">
                    <Label htmlFor="delete-confirm">Type "DELETE" to confirm:</Label>
                    <Input
                      id="delete-confirm"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      placeholder="DELETE"
                      className="mt-2"
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteConfirmation('')}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== 'DELETE'}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSection = location.pathname.split('/').pop() || 'profile';

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={handleBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Settings
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardContent className="p-0">
                <nav className="space-y-1 p-4">
                  {sidebarItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = currentSection === item.id;
                    
                    return (
                      <Link
                        key={item.id}
                        to={`/settings/${item.id}`}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-lg">{item.emoji}</span>
                        <IconComponent className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg border-0 shadow-sm p-6">
              <Routes>
                <Route path="profile" element={<ProfileSection />} />
                <Route path="usage" element={<UsageSection />} />
                <Route path="account" element={<AccountSection />} />
                <Route path="*" element={<ProfileSection />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}