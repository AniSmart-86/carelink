import React from "react";
import { Button } from "./ui/button";
import {
  Calendar,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import { Badge } from "./ui/badge";
import { checkAndAllocateCredits } from "@/actions/credits";
import Image from "next/image";

export default async function Header() {
  const user = await checkUser();
  if (user?.role === "PATIENT") {
    await checkAndAllocateCredits(user);
  }

  return (
    <header className="fixed rounded-b-2xl top-0 w-full border-b-2 border-b-emerald-400 bg-black backdrop-blur-sm z-10 supports-[backdrop-filter]:bg-black-200">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className=" cursor-pointer text-2xl text-white font-bold items-center space-x-2 flex">
         Ndu<span className='text-emerald-400'>Linka</span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-2">
          <SignedIn>
            {/* Admin Links */}
            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <ShieldCheck className="hidden md:inline h-4 w-4" />
                  Admin Dashboard
                </Button>
                {/* <Button variant="ghost" className="hidden md:block w-10 h-10 p-0">
                  <ShieldCheck className="h-4 w-4" />
                </Button> */}
              </Link>
            )}

            {/* Doctor Links */}
            {user?.role === "DOCTOR" && (
              <Link href="/doctor">
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2"
                >
                  <Stethoscope className="hidden md:inline h-4 w-4" />
                  Doctor Dashboard
                </Button>
                {/* <Button variant="ghost" className="hidden md:block w-10 h-10 p-0">
                  <Stethoscope className="h-4 w-4" />
                </Button> */}
              </Link>
            )}

            {/* Patient Links */}
            {user?.role === "PATIENT" && (
              <Link href="/appointments">
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2 text-xs md:text-sm"
                >
                  <Calendar className="hidden md:inline h-4 w-4" />
                  My Appointments
                </Button>
                
              </Link>
            )}

            {/* Unassigned Role */}
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2 text-sm md:text-xl"
                >
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </SignedIn>

          {(!user || user?.role !== "ADMIN") && (
            <Link href={user?.role === "PATIENT" ? "/pricing" : "/doctor"}>
              <Badge
                variant="outline"
                className="h-9 bg-emerald-900/20 border-emerald-700/30 px-3 py-1 flex items-center gap-2"
              >
                <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">
                  {user && user.role !== "ADMIN" ? (
                    <>
                      {user.credits}{" "}
                      <span className="hidden md:inline">
                        {user?.role === "PATIENT"
                          ? "Credits"
                          : "Earned Credits"}
                      </span>
                    </>
                  ) : (
                    <>Pricing</>
                  )}
                </span>
              </Badge>
            </Link>
          )}

          <SignedOut>
            <SignInButton>
              <Button variant="secondary" className='text-emerald-400 border border-emerald-400'>Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
