import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import { useLoginMutation } from "../../../redux/features/api/Authentication/authentication";

import { showSwal } from "../../../shared/Helpers/SwalShower";
import { setToLocalStorage } from "../../../shared/Helpers/local_storage";
import { authKey, refreshToken } from "../../../shared/config/constaints";
import { 
  Loader2, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Building2, 
  ShieldCheck, 
  Info,
  ArrowRight
} from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  // Auto-fill logic for clients/recruiters
  const handleDemoLogin = (role: 'admin' | 'staff') => {
    if (role === 'admin') {
      setEmail("admin@softwara.com");
      setPassword("123456");
    } else {
      setEmail("staff@softwara.com");
      setPassword("123456");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullData = { email, password };
    const result = await login({ fullData });

    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      setToLocalStorage(authKey, result?.data?.data?.accessToken);
      setToLocalStorage(refreshToken, result?.data?.data?.refreshToken);
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
      {/* --- Left Side: Branding & Visuals --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] relative items-center justify-center p-12 overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse transition-all duration-1000" />
        
        <div className="relative z-20 w-full max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">OFFICE HUB PRO</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Manage your <span className="text-primary">Workspace</span> with intelligence.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              The all-in-one ecosystem for HR, payroll, and office operations. 
              Securely scale your team with precision.
            </p>
          </div>

          {/* Glassmorphism Stat Card */}
          <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-10 w-10 rounded-full border-2 border-[#0F172A] bg-slate-${i+5}00 shadow-xl`} />
              ))}
              <div className="h-10 w-10 rounded-full border-2 border-[#0F172A] bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                +1k
              </div>
            </div>
            <div>
              <p className="text-white font-medium">Enterprise Ready</p>
              <p className="text-slate-400 text-sm">Used by high-growth startups globally.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px] space-y-8">
          
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="flex flex-col items-center gap-2 lg:hidden mb-4">
             <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <Building2 className="h-7 w-7 text-white" />
             </div>
             <h2 className="text-2xl font-bold">Office Hub</h2>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h2>
            <p className="text-muted-foreground text-sm">Please sign in to access your portal.</p>
          </div>

          {/* Quick Demo Access Card */}
          <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
                <Info className="h-4 w-4" />
                <span>Quick Client Demo Access</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDemoLogin('admin')}
                  className="bg-white hover:bg-primary hover:text-white border-primary/30 transition-all text-xs"
                >
                  Admin Mode
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDemoLogin('staff')}
                  className="bg-white hover:bg-primary hover:text-white border-primary/30 transition-all text-xs"
                >
                  Staff Mode
                </Button>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@officehub.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 focus-visible:ring-primary border-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 focus-visible:ring-primary border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="remember" className="text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remember this device
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Enterprise-grade security protocols active</span>
            </div>
            <p className="text-sm text-slate-500">
              Don't have access? <span className="text-primary font-semibold hover:underline cursor-pointer">Contact System Administrator</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;