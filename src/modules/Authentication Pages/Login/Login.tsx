import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useLoginMutation } from "../../../redux/features/api/Authentication/authentication";

import { showSwal } from "../../../shared/Helpers/SwalShower";
import { useNavigate } from "react-router-dom";
import { setToLocalStorage } from "../../../shared/Helpers/local_storage";
import { authKey, refreshToken } from "../../../shared/config/constaints";
import { Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

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
    <div className="flex min-h-screen w-full bg-background animate-in fade-in duration-500">
      {/* Left Side - Hero/Branding */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-blue-900/80 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />

        <div className="relative z-20 text-white space-y-6 max-w-lg">
          <div className="h-12 w-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/30">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Human Resources Management System</h1>
          <p className="text-lg text-slate-200">
            Streamline your workforce management with our premium portal. Secure, efficient, and user-friendly.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="h-2 w-16 bg-white rounded-full opacity-50" />
            <div className="h-2 w-4 bg-white rounded-full opacity-25" />
            <div className="h-2 w-4 bg-white rounded-full opacity-25" />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2 lg:hidden">
            <h1 className="text-2xl font-bold">NEC Portal</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <Card className="border-0 shadow-none lg:border lg:shadow-xl lg:bg-card/50 lg:backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center lg:text-left">Welcome back</CardTitle>
              <CardDescription className="text-center lg:text-left">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-10 bg-background/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="pl-10 h-10 bg-background/50"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 text-base shadow-md transition-all hover:scale-[1.02]" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign in"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account? <span className="text-primary font-medium hover:underline cursor-pointer">Contact Admin</span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
