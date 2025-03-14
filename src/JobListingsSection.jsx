import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseIcon, DollarSignIcon, MapPinIcon } from "lucide-react";
import React from "react";

export default function JobListingsSection({ jobListings }) {
  // Function to calculate time difference
  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);

    // If the createdAt date is in the future, treat it as "just created"
    if (createdDate > now) {
      return "Just now";
    }

    const diffInMs = now - createdDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert milliseconds to minutes
    const diffInHours = Math.floor(diffInMinutes / 60); // Convert minutes to hours

    if (diffInMinutes < 60) {
      // Less than 1 hour
      return `${diffInMinutes}m Ago`;
    } else {
      // 1 hour or more
      return `${diffInHours}h Ago`;
    }
  };

  return (
    <div className="flex flex-wrap gap-5 p-6">
      {jobListings.map((job) => (
        <Card
          key={job.id}
          className="w-[350px] h-[400px] relative shadow-lg rounded-lg overflow-hidden"
        >
          <CardContent className="p-6">
            {/* Company Logo */}
            <div className="flex justify-center items-center w-20 h-20 mb-4 rounded-lg overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
              <img
                className="w-12 h-12"
                alt="Company logo"
                src={job.companyProfilePhoto}
              />
            </div>

            {/* Posted Time Badge */}
            <Badge
              variant="lightBlue"
              className="absolute top-6 right-6 bg-blue-100 text-blue-800 hover:bg-blue-100 px-3 py-1 rounded-full"
            >
              <span className="font-medium text-sm">
                {getTimeDifference(job.createdAt)}
              </span>
            </Badge>

            {/* Job Title */}
            <div className="text-xl font-bold text-gray-900 mb-2">
              {job.title}
            </div>

            {/* Job Details */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <BriefcaseIcon className="h-4 w-4" />
                <span>{job.jobType}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPinIcon className="h-4 w-4" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <DollarSignIcon className="h-4 w-4" />
                <span>{job.salaryRange}</span>
              </div>
            </div>

            {/* Job Description */}
            <div className="text-sm text-gray-600 mb-6">
              {job.description}
            </div>

            {/* Apply Button */}
            <Button variant="lightBlue" className="w-full">
              Apply Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}