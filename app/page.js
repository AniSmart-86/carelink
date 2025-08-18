"use client"

import Image from "next/image";
import Link from "next/link";
import { AlertCircle, ArrowRight, ChevronDown, Loader2, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Pricing from "@/components/pricing";
import { creditBenefits, faqs, features, testimonials } from "@/lib/data";
import { recommendSpecialtyAI } from "@/actions/symptom-checker";
import { verifyDrugByNafdac } from "@/actions/drug-verification";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Home() {


  
// await new Promise(resolve => setTimeout(resolve, 5000));
const [open, setOpen] = useState(false);
const [openModal, setOpenModal] = useState(false);
const [input, setInput] = useState("");
const [nafdacNumber, setNafdacNumber] = useState("");
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
const [isloading, setIsLoading] = useState(false);
const [aiResult, setAiResult] = useState("");
const [openIndex, setOpenIndex] = useState(null);

console.log(aiResult);


const toggleFaq = (index)=>{
  setOpenIndex(openIndex === index ? null : index)
}
 const handleCheck = async (e) => {
  e.preventDefault();

  if(isloading) return;

  if (!input.trim()) {
      toast.error("Please describe your symptoms first.");
      return;
    }

    setIsLoading(true);
   try {
    const data = await recommendSpecialtyAI(input);

    if (data.success) {
      setAiResult(data.message);
      setOpenModal(true);
      console.log(data.message);
    } else {
      toast.error(data.message);
    
    }
   } catch (error) {
    toast.error(error.message || "An error occurred during while analyzing");
   }finally{
    setIsLoading(false);
    setInput("");
   }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!nafdacNumber.trim()) {
      toast.error("Please enter a NAFDAC number");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyDrugByNafdac(nafdacNumber);

      if (res.success) {
        setResult(res.data);
        toast.success("Drug verification successful!");
        console.log("Drug details:", res.data);
       
      } else {
        toast.error("Failed to verify drug");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during verification");
    } finally {
      setLoading(false);
      setResult(null);
    }
  };


  return (
    <div className="bg-background">

      {/* Sub header */}
      
    <div>

      <Card className='pt-20 w-full bg-muted/50 border border-emerald-600'>
      <div className="p-6 md:flex md:items-center md:justify-between gap-2">
      <div>
      <form onSubmit={handleCheck}>
      <h2 className="text-xl font-bold mb-2">AI Symptom Checker</h2>
      <Textarea
        className="border border-emerald-600 p-3 rounded"
        rows={4}
        placeholder="Describe how you feel..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></Textarea>
      <Button
        type="submit"
        disabled={isloading}
        className="bg-emerald-500 text-white text-md px-8 py-6 md:py-4 mt-4 rounded hover:bg-emerald-700 cursor-pointer"
      >
        {isloading ?( 
          <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
          Analyzing...
          </>
          ) : ("Check")}
      </Button>

      </form>

      </div>

      <div className='pt-10'>
             <Button
             type="button"
        onClick={()=>setOpen(true)}
        disabled={loading}
        className="border border-emerald-700 bg-muted/20 cursor-pointer text-emerald-400 text-md px-4 py-6 mt-2 rounded hover:bg-emerald-800 w-full"
      >
       Verify Drugs
      </Button>
      </div>
    </div>
</Card>

    </div>

      {/* Hero Section */}
      
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium"
              >
                Healthcare made simple
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Connect with doctors <br />
                <span className="gradient-title">anytime, anywhere</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Book appointments, consult via video, and manage your healthcare
                journey all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Link href="/onboarding">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-emerald-700/30 hover:bg-muted/80"
                >
                  <Link href="/doctors">Find Doctors</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/Banner2.jpg"
                alt="Doctor consultation"
                fill
                priority
                className="object-cover md:pt-14 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform makes healthcare accessible with just a few clicks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
            >
              Affordable Healthcare
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Consultation Plans
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the perfect consultation package that fits your healthcare
              needs
            </p>
          </div>

          <div className="mx-auto">
            {/* Clerk Pricing Table */}
            <Pricing />

            {/* Description */}
            <Card className="mt-12 bg-amber-900/20 border-amber-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-amber-400" />
                  How Our Credit System Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {creditBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1 bg-emerald-900/20 p-1 rounded-full">
                        <svg
                          className="h-4 w-4 text-emerald-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: benefit }}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
            >
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from patients and doctors who use our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-emerald-900/20 hover:border-emerald-800/40 transition-all"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center mr-4">
                      <span className="text-emerald-400 font-bold">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with green medical styling */}
      

           <section className="py-20 bg-muted/50 dark:bg-muted/80">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-emerald-900/30 border-emerald-900/30 hover:border-emerald-800/40 transition-all duration-300">
          <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Ready to Transform Your Healthcare Experience?</h2>
                <p className="text-muted-foreground text-lg md:text-xl mb-6">Join thousands of satisfied users and take control of your health today.</p>
               
               <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">

                <Button asChild size={"lg"} className="bg-emerald-500 hover:bg-emerald-700 text-white w-full md:w-auto">
                  <Link href="/sign-up">
                    Get Started Now 
                  </Link>
                </Button>

                <Button asChild size={"lg"} variant={"outline"}
                 className="border-emerald-700/30 hover:bg-muted/80
                 hover:text-white text-emerald-500 bg-transparent ml-4">
                  <Link href="/pricing">
                    View pricing 
                  </Link>
                </Button>
                    </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </section>




 <section className="py-20 bg-muted/50 dark:bg-muted/80">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-muted-900 border-emerald-900 ">
          <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-xl mx-auto">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                
               
               <div className="space-y-6">
                {faqs.map((item,index)=>(
                  <div key={index} className='border border-emerald-800 rounded-xl'>

                <Button onClick={()=>toggleFaq(index)} variant={"outline"} size={"lg"} className="w-full flex items-center text-left p-4 justify-between bg-muted/20 cursor-pointer">
                <span className="font-medium text-gray-300 text-sm md:text-xl">{item.question}</span>
                <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform ${openIndex === index ? "rotate-180" : "" }`}/>
                </Button>
                {openIndex === index &&(
                  <div className='p-4 bg-gray-800 text-gray-400 text-sm'>{item.answer}</div>
                )}
                  </div>
                ))}

            
                    </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </section>

<section>


<Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="flex flex-col items-center justify-center">
    
    <DialogHeader>
    <DialogTitle className='text-xl font-bold gradient-title text-center'>Verify Your Drug</DialogTitle>

    <DialogDescription>
  Please enter your drug NAFDAC number to verify
    </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSearch}>
    <Input placeholder="06-4986"
            value={nafdacNumber}
            onChange={(e)=>setNafdacNumber(e.target.value)}
            className='w-full p-5'
            />
              <Button
              size={"sm"}
              type="submit"
        disabled={loading}
        className="bg-emerald-600 text-white px-4 py-2 rounded font-medium hover:bg-emerald-700 disabled:opacity-50 w-full my-5 cursor-pointer"
      >
        {loading ?(
          <>
          <Loader2 className='h-4 w-4 mr-2 animate-spin'/>
           Verifying...
           </>
            ):( "Verify Drug")}
      </Button>

      </form>
 
            <Card>
<CardContent>{result}</CardContent>
            </Card>
          
</DialogContent>
</Dialog>


{/* AI Result */}
<Dialog open={openModal} onOpenChange={setOpenModal}>
    <DialogContent className="flex flex-col items-center justify-center">
     <DialogHeader>
    <DialogTitle className='text-xl font-bold gradient-title text-center'>Successful Reponse!</DialogTitle>

    </DialogHeader>
   
      {aiResult}
</DialogContent>
</Dialog>
</section>
    </div>
  );
}
