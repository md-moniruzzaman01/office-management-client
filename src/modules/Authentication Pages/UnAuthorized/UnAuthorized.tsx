import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4 animate-in zoom-in-95 duration-500">
      <Card className="w-full max-w-md shadow-lg border-destructive/20">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="h-8 w-8 text-destructive px-0.5" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access this resource.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground pb-6">
          <p>
            Please log in with an authorized account or return to the previous page.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={handleGoBack} className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
          <Button onClick={handleLogin} className="w-full sm:w-auto">
            <LogIn className="mr-2 h-4 w-4" /> Go to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
