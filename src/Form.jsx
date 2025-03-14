import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import React, { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function Form({ onClose, onJobSubmit }) {
  const [jobData, setJobData] = useState({
    title: "",
    companyName: "",
    location: "",
    jobType: "",
    salaryRange: "",
    description: "",
    requirements: "",
    responsibilities: "",
    applicationDeadline: "",
  });

  const [companyProfilePhoto, setCompanyProfilePhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  // React Query mutation for creating a job
  const createJobMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post("http://localhost:3000/jobs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Return the newly created job
    },
    onSuccess: (newJob) => {
      console.log("Job created successfully:", newJob);
      onJobSubmit(newJob); // Pass the new job data to the parent component
      onClose(); // Close the form
    },
    onError: (error) => {
      console.error("Error creating job:", error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setJobData({ ...jobData, jobType: value });
  };

  const handleFileChange = (e) => {
    setCompanyProfilePhoto(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!jobData.title) newErrors.title = "Job title is required";
    if (!jobData.companyName) newErrors.companyName = "Company name is required";
    if (!jobData.location) newErrors.location = "Location is required";
    if (!jobData.jobType) newErrors.jobType = "Job type is required";
    if (!jobData.salaryRange) newErrors.salaryRange = "Salary range is required";
    if (!jobData.description) newErrors.description = "Description is required";
    if (!jobData.requirements) newErrors.requirements = "Requirements are required";
    if (!jobData.responsibilities) newErrors.responsibilities = "Responsibilities are required";
    if (!jobData.applicationDeadline) newErrors.applicationDeadline = "Application deadline is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();

    // Append all form fields
    Object.entries(jobData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append the file
    if (companyProfilePhoto) {
      formData.append("companyProfilePhoto", companyProfilePhoto);
    }

    // Trigger the mutation
    createJobMutation.mutate(formData);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target) && !event.target.closest(".select-content")) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <Card
        ref={formRef}
        className="w-[848px] h-auto rounded-2xl overflow-hidden"
      >
        <CardContent className="relative w-[768px] h-auto mt-[30px] mx-auto p-0">
          <h1 className="text-center text-2xl font-bold text-[#222222] mb-8">
            Create Job Opening
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <Input
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              placeholder="Job Title"
              className="h-[58px] rounded-[10px] border-[#222222] font-bold text-lg px-4 py-4"
            />
            {errors.title && <p className="text-red-500 text-sm col-span-2">{errors.title}</p>}
            <Input
              name="companyName"
              value={jobData.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="h-[58px] rounded-[10px] border-[#222222] font-bold text-lg px-4 py-4"
            />
            {errors.companyName && <p className="text-red-500 text-sm col-span-2">{errors.companyName}</p>}
            <Input
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="h-[58px] rounded-[10px] border-[#222222] font-bold text-lg px-4 py-4"
            />
            {errors.location && <p className="text-red-500 text-sm col-span-2">{errors.location}</p>}
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="h-[58px] rounded-[10px] border-[#222222] font-bold text-lg px-4 py-4">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent className="select-content">
                <SelectItem value="Full Time">Full Time</SelectItem>
                <SelectItem value="Part Time">Part Time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            {errors.jobType && <p className="text-red-500 text-sm col-span-2">{errors.jobType}</p>}
            <Input
              name="salaryRange"
              value={jobData.salaryRange}
              onChange={handleInputChange}
              placeholder="Salary Range"
              className="h-[58px] rounded-[10px] border-[#222222] font-bold text-lg px-4 py-4"
            />
            {errors.salaryRange && <p className="text-red-500 text-sm col-span-2">{errors.salaryRange}</p>}
            <Input
              name="applicationDeadline"
              value={jobData.applicationDeadline}
              onChange={handleInputChange}
              type="datetime-local"
              className="h-[58px] rounded-[10px] border-[#222222] font-bold text-lg px-4 py-4"
            />
            {errors.applicationDeadline && <p className="text-red-500 text-sm col-span-2">{errors.applicationDeadline}</p>}
            <Textarea
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              placeholder="Job Description"
              className="w-full h-[120px] rounded-[10px] border-[#bcbcbc] font-medium text-[#bcbcbc] p-4 resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm col-span-2">{errors.description}</p>}
            <Input
              name="requirements"
              value={jobData.requirements}
              onChange={handleInputChange}
              placeholder="Requirements"
              className="h-[58px] rounded-[10px] border-[#222222] font-bold text-lg px-4 py-4"
            />
            {errors.requirements && <p className="text-red-500 text-sm col-span-2">{errors.requirements}</p>}
            <Input
              name="responsibilities"
              value={jobData.responsibilities}
              onChange={handleInputChange}
              placeholder="Responsibilities"
              className="h-[58px] rounded-[10px] border-[#222222] font-bold text-lg px-4 py-4"
            />
            {errors.responsibilities && <p className="text-red-500 text-sm col-span-2">{errors.responsibilities}</p>}

            {/* File Upload */}
            <div className="flex flex-col gap-1.5 mt-4 col-span-2">
              <label className="font-bold text-xl text-[#636363]">
                Company Profile Photo
              </label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            {/* Action Buttons */}
            <div className="col-span-2 flex justify-between mt-8">
              <Button
                type="button"
                variant="lightBlue" 
                className="px-[60px] py-4 rounded-[10px] border-[1.5px] border-[#222222] font-bold text-xl shadow-[0px_0px_4px_#00000040] flex items-center gap-2.5"
                onClick={onClose}
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                variant="lightBlue" 
                className="px-[60px] py-4 rounded-[10px] bg-[#00aaff] font-bold text-xl flex items-center gap-2.5"
                disabled={createJobMutation.isPending} // Disable button while mutation is in progress
              >
                {createJobMutation.isPending ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}