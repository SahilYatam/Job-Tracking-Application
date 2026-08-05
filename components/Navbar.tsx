"use client"

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup,  DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutBtn from "./Sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";

// Server side component can be async, but normal react components that are client side can't be async
export default function Navbar() {
  const {data: session} = useSession();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xl font-semibold text-primary"
        >
          <Briefcase />
          Job Tracker
        </Link>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black cursor-pointer"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarFallback className="bg-primary text-white">
                        {session.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="flex-sm font-medium leading-none">
                          {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <SignOutBtn/>
                  </DropdownMenuGroup>
                </DropdownMenuContent>

              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black cursor-pointer"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
                  Start for free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
// 1:45
