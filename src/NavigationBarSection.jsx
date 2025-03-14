import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React, { useState } from "react";
import Form from "./Form"; // Import the Form component
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function NavigationBarSection({ onJobSubmit }) {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Navigation menu items data
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Find Jobs", href: "#" },
    { label: "Find Talents", href: "#" },
    { label: "About us", href: "#" },
    { label: "Testimonials", href: "#" },
  ];

  // Function to toggle form visibility
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // React Query mutation for creating a job
  const createJobMutation = useMutation({
    mutationFn: async (newJob) => {
      const response = await axios.post("http://localhost:3000/jobs", newJob);
      return response.data; // Return the newly created job
    },
    onSuccess: () => {
      // Invalidate the "jobs" query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      handleCloseForm(); // Close the form after successful submission
    },
    onError: (error) => {
      console.error("Error creating job:", error);
    },
  });

  // Handle job submission
  const handleJobSubmit = (newJob) => {
    createJobMutation.mutate(newJob); // Trigger the mutation
  };

  return (
    <>
      <nav className="w-full max-w-[890px] h-20 mx-auto bg-white rounded-[122px] border border-solid border-[#fcfcfc] shadow-[0px_0px_20px_#7f7f7f26] flex items-center px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="w-11 h-[45px]">
            <img src="../public/cybermind_works_logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="mx-4">
            <NavigationMenuList className="flex items-center gap-2">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={item.href}
                    className="inline-flex items-center justify-center px-6 py-2 font-bold text-base text-[#000000] rounded-[10px] hover:bg-gray-100 transition-colors"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Create Job Button */}
          <Button
            onClick={handleOpenForm}
            className="px-6 py-2 rounded-[30px] font-bold text-base text-white bg-gradient-to-b from-[#a028ff] to-[#6000ac]"
          >
            Create Jobs
          </Button>
        </div>
      </nav>

      {/* Render the Form component conditionally */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <Form onClose={handleCloseForm} onJobSubmit={handleJobSubmit} />
        </div>
      )}
    </>
  );
}