import { useState } from "react";
import { Button, Card, Input, Select, Textarea } from "@mantine/core";
import axios from "axios";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const JobCreationForm = ({ onJobSubmit, currentJob, onCancelEdit }) => {
  const [formData, setFormData] = useState(
    currentJob || {
      title: "",
      companyName: "",
      location: "",
      jobType: "",
      salaryRange: "",
      description: "",
      requirements: "",
      responsibilities: "",
      applicationDeadline: "",
      companyProfilePhoto: "",
    }
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentJob) {
        await axios.put(
          `http://localhost:3000/jobs/${currentJob.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3000/jobs", formData);
      }
      onJobSubmit();
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Job Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <Input
          placeholder="Company Name"
          value={formData.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
        />
        <Input
          placeholder="Location"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
        <Select
          data={jobTypes}
          placeholder="Job Type"
          value={formData.jobType}
          onChange={(value) => handleChange("jobType", value)}
        />
        <Input
          placeholder="Salary Range"
          value={formData.salaryRange}
          onChange={(e) => handleChange("salaryRange", e.target.value)}
        />
        <Textarea
          placeholder="Job Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <Textarea
          placeholder="Requirements"
          value={formData.requirements}
          onChange={(e) => handleChange("requirements", e.target.value)}
        />
        <Textarea
          placeholder="Responsibilities"
          value={formData.responsibilities}
          onChange={(e) => handleChange("responsibilities", e.target.value)}
        />
        <Input
          type="date"
          value={formData.applicationDeadline}
          onChange={(e) => handleChange("applicationDeadline", e.target.value)}
        />
        <Input
          placeholder="Company Profile Photo URL"
          value={formData.companyProfilePhoto}
          onChange={(e) => handleChange("companyProfilePhoto", e.target.value)}
        />
        <Button type="submit" mt="md">
          {currentJob ? "Update" : "Publish"}
        </Button>
        {currentJob && (
          <Button onClick={onCancelEdit} mt="md" ml="sm">
            Cancel
          </Button>
        )}
      </form>
    </Card>
  );
};

export default JobCreationForm;
