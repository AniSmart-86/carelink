import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

/**
 * Reusable page header component with back button and title
 *
 * @param {React.ReactNode} props.icon - Icon component to display next to the title
 * @param {string} props.title - Page title
 * @param {string} props.backLink - URL to navigate back to (defaults to home)
 * @param {string} props.backLabel - Text for the back link (defaults to "Back to Home")
 */
export function PageHeader({
  icon,
  title,
  backLink = "/",
  backLabel = "Back to Home",
}) {

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between mb-4'>
        <Link href={backLink} className='flex text-2xl font-bold text-primary self-start'>
        <Button variant="outline" size={"sm"} className='mb-2 border-emerald-900/30 hover:border-emerald-800/40'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            {backLabel}
        </Button>
        </Link>

        <div className='flex items-center gap-4'>
            {icon && (
                <div className='text-emerald-400'>
                   {React.cloneElement(icon, {
                         className: 'h-8 md:h-16 w-8 md:w-14' 

                    })}
                    </div>
  )}
   <h1 className='text-sm md:text-3xl font-bold gradient-title mt-2'>
                {title}
            </h1>
  </div>
    </div>
  );
}
