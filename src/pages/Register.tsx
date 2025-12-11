import { useRegisterMutation, useVerificationMutation } from "@/app/services/authApi";
import travelHero from "@/assets/travel-hero.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [verification, { isLoading: isVerificationLoading }] = useVerificationMutation();
  const [completeRegister, setCompleteRegister] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profession: "",
    password: "",
    confirmPassword: "",
  });
  const [formData2, setFormData2] = useState({
    code: "",
    token: ""
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const handleChange2 = (field: string, value: string) => {
    setFormData2(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error("Please fill in all fields");
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }


    const res = await register(formData);
    if (res.data.success) {
      toast.success(res?.data?.message || "Please check your email to verify email before complate registeration !");
      setCompleteRegister(false)
      setFormData2({
        code: "",
        token: res.data.token
      })
    } else {
      toast.error(res?.error?.data?.message)
    }
  };

  const finalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let res = await verification(formData2);

    if (res.data.success) {
      toast.success(res.data.message || "Congrats please check your email for password");
      navigate("/login");
      setCompleteRegister(true);
    } else {
      toast.error(res?.error?.data?.message)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/90 to-primary/80 z-10" />
        <img
          src={travelHero}
          alt="Travel destination"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <h1 className="text-5xl font-bold mb-4">Start Your Journey</h1>
          <p className="text-xl text-center max-w-md opacity-90">
            Join thousands of travelers discovering amazing destinations and experiences
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md p-8 shadow-medium">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Create Account</h2>
            <p className="text-muted-foreground">Start exploring the world today</p>
          </div>

          {completeRegister ? <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="1234567890"
                value={formData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                className="h-11"
                required
              />
            </div>

            {/*<div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <Select onValueChange={(value) => handleChange("profession", value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select your profession" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel_agent">Travel Agent</SelectItem>
                  <SelectItem value="tour_guide">Tour Guide</SelectItem>
                  <SelectItem value="hotel_manager">Hotel Manager</SelectItem>
                  <SelectItem value="tourist">Tourist</SelectItem>
                  <SelectItem value="business">Business Professional</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div> */}



            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          </form>

            : <form onSubmit={finalSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="code">Enter Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter verification code"
                  value={formData2.code}
                  onChange={(e) => handleChange2("code", e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold"
                disabled={isVerificationLoading}
              >
                {isVerificationLoading ? "Verifying Account..." : "Verify Account"}
              </Button>
            </form>}
        </Card>
      </div>
    </div>
  );
};

export default Register;
