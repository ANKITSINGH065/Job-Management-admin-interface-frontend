import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import NavigationBarSection from "./NavigationBarSection";
import SearchBarSection from "./SearchBarSection";
import JobListingsSection from "./JobListingsSection";
import { useState } from "react";
import Loader from "./Loader";

const JobManagement = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    jobType: "",
    salaryRange: [30, 70],
  });

  // Fetch job listings using React Query
  const {
    data: jobListings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs", filters], // Unique key for this query
    queryFn: async () => {
      const response = await axios.get("https://job-management-admin-backend.onrender.com/jobs", {
        params: filters,
      });
      return response.data; // Return the fetched data
    },
  });

  // Mutation for creating a new job
  const createJobMutation = useMutation({
    mutationFn: async (newJob) => {
      const response = await axios.post("https://job-management-admin-backend.onrender.com/jobs", newJob);
      return response.data; // Return the newly created job
    },
    onSuccess: (newJob) => {
      // Invalidate the "jobs" query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  // Handle job submission
  const handleJobSubmit = (newJob) => {
    createJobMutation.mutate(newJob); // Trigger the mutation
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Loading and error states
  if (isLoading) return <Loader/>;
  if (isError) return <div>Error fetching job listings</div>;

  return (
    <main className="bg-[#fbfbff] flex flex-col items-center w-full min-h-screen">
      <div className="bg-[#fbfbff] w-full max-w-[1440px] flex flex-col items-center">
        <header className="w-full">
          <NavigationBarSection onJobSubmit={handleJobSubmit} />
        </header>

        <section className="w-full mt-4">
          <SearchBarSection onFilterChange={handleFilterChange} />
        </section>

        <section className="w-full mt-4 flex justify-center">
          <JobListingsSection jobListings={jobListings || []} />
        </section>
      </div>
    </main>
  );
};

export default JobManagement;