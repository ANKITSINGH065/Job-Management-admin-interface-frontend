import React, { useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function SearchBarSection({ onFilterChange }) {
  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    jobType: "",
    salaryRange: [30, 70],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleSliderChange = (value) => {
    setFilters({ ...filters, salaryRange: value });
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  return (
    <Card className="w-full py-6 px-8 bg-white shadow-md rounded-none">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleInputChange}
              className="pl-10 h-12 text-base font-medium placeholder:text-[#686868] border-none bg-gray-50 rounded-md"
              placeholder="Search By Job Title, Role"
            />
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <MapPin className="h-5 w-5 text-gray-500" />
            </div>
            <Select onValueChange={(value) => handleSelectChange("location", value)}>
              <SelectTrigger className="pl-10 h-12 text-base font-medium text-[#686868] border-none bg-gray-50 rounded-md">
                <SelectValue placeholder="Preferred Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location1">New York</SelectItem>
                <SelectItem value="location2">UK</SelectItem>
                <SelectItem value="location3">California</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Briefcase className="h-5 w-5 text-gray-500" />
            </div>
            <Select onValueChange={(value) => handleSelectChange("jobType", value)}>
              <SelectTrigger className="pl-10 h-12 text-base font-medium text-[#686868] border-none bg-gray-50 rounded-md">
                <SelectValue placeholder="Job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fulltime">Full-time</SelectItem>
                <SelectItem value="parttime">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-base text-[#222222]">Salary Per Month</span>
              <span className="font-bold text-base text-[#222222]">₹{filters.salaryRange[0]}k - ₹{filters.salaryRange[1]}k</span>
            </div>
            <div className="px-2 py-1 relative">
              <Slider
                defaultValue={filters.salaryRange}
                max={100}
                step={1}
                className="w-full"
                onValueChange={handleSliderChange}
              />
              <div className="absolute left-0 top-1/2 w-[15px] h-[15px] bg-white rounded-full border-[5px] border-solid border-black -translate-y-1/2"></div>
              <div className="absolute left-[170px] top-1/2 w-[15px] h-[15px] bg-white rounded-full border-[5px] border-solid border-black -translate-y-1/2"></div>
            </div>
          </div>
          <Button onClick={handleSearch} 
          variant="lightBlue" 
          className="bg-blue-600 hover:bg-blue-700 text-white">
            Search
          </Button>
        </div>
      </div>
    </Card>
  );
}