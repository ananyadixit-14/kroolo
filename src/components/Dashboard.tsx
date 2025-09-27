import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PenTool, Code, Film, CircleHelp as HelpCircle, Settings, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../App';

const features = [
  {
    id: 'ai-writer',
    title: 'AI Writer',
    icon: PenTool,
    emoji: '📝',
    description: 'Generate compelling content with advanced AI writing assistance',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'code-assistant',
    title: 'Code Assistant', 
    icon: Code,
    emoji: '💻',
    description: 'Get intelligent code suggestions and debugging help',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'media-summarizer',
    title: 'Media Summarizer',
    icon: Film,
    emoji: '🎬',
    description: 'Summarize videos, podcasts, and audio content instantly',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'qa-generator',
    title: 'Q&A Generator',
    icon: HelpCircle,
    emoji: '❓',
    description: 'Create engaging questions and answers from any content',
    color: 'from-orange-500 to-red-500'
  }
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings/profile');
  };

  const handleFeatureClick = (featureId: string) => {
    // Simulate feature launch
    console.log(`Launching ${featureId}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Sparkflow
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What will you create today?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our powerful AI tools to enhance your productivity and creativity.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 bg-white/70 backdrop-blur-sm"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <span className="text-2xl">{feature.emoji}</span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    className={`w-full bg-gradient-to-r ${feature.color} hover:shadow-lg text-white font-medium transition-all duration-200 group-hover:scale-105`}
                  >
                    Launch
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Stats or Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to supercharge your workflow?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of creators and developers who are already using Sparkflow to enhance their productivity.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50K+</div>
                <div>Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1M+</div>
                <div>AI Generations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div>Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}