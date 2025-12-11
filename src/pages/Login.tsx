import { useLoginMutation } from "@/app/services/authApi";
import travelHero from "@/assets/travel-hero.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadRememberedData } from "@/lib/encrypt";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { encryptText } from "@/lib/encrypt";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [formValue,setFormValue] = useState({
    login:"",
    password:""
  })
  const [security,setSecurity] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // save remember password
    if (security) {
          localStorage.setItem("remember_email", formValue.login);
          localStorage.setItem("remember_password", encryptText(formValue.password));
        } else {
          localStorage.removeItem("remember_email");
          localStorage.removeItem("remember_password");
    }
    
    if (!formValue.password || !formValue.login) {
      toast.error("Please fill in all fields");
      return;
    }
    try{
      const res = await login(formValue).unwrap();

    if(res?.success){
      toast.success("Login Sucessfull");
      navigate("/dashboard");
    }
    }catch(err){
        toast.error(err?.data?.message || err?.data?.error)
    }
  };


  useEffect(()=>{
    const { login, password } = loadRememberedData();
    setFormValue(pre => ({...pre,password,login}));
    if(login || password){
      setSecurity(true)
    }
  },[])

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/80 z-10" />
        <img 
          src={travelHero} 
          alt="Travel destination" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
          <p className="text-xl text-center max-w-md opacity-90">
            Continue your journey to explore the world's most beautiful destinations
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md p-8 shadow-medium">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Sign In</h2>
            <p className="text-muted-foreground">Access your travel dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="login">Email Address</Label>
              <Input
                id="login"
                type="login"
                placeholder="your@login.com"
                value={formValue.login}
                onChange={(e) => setFormValue(pre => ({...pre,login:e.target.value}))}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formValue.password}
                onChange={(e) => setFormValue(pre => ({...pre,password:e.target.value}))}
                className="h-11"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                 <Checkbox
                      id="security"
                      checked={security}
                      onCheckedChange={(checked) => setSecurity(checked as boolean)}
                    />
                    <Label htmlFor="security" className="cursor-pointer text-muted-foreground ">
                      Remember Me
                    </Label>
              </div>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Create Account
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
