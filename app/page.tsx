"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Globe, CheckCircle } from "lucide-react";
import { useState } from "react";
import PreviewSummary from "@/components/custom-component/previewSummary";
import AllQuestions from "@/components/custom-component/AllQuestions";
import { translateText } from "@/lib/translateText";

const companies = [
  {
    name: "(KDC) - Kuwait Drilling Company",
    value: "(KDC) - Kuwait Drilling Company",
  },
  { name: "(SP) - SINOPEC", value: "(SP) - SINOPEC" },
  {
    name: "(BWD) - Burgan Well Drilling",
    value: "(BWD) - Burgan Well Drilling",
  },
  {
    name: "(UPDC) - United Precision Drilling Corporation",
    value: "(UPDC) - United Precision Drilling Corporation",
  },
  { name: "(SD) - Sun Drilling", value: "(SD) - Sun Drilling" },
];

const textContent = {
  title: "Verification Form",
  subtitle: "Please provide accurate information for verification",
  fullName: "Full Name *",
  fullNamePlaceholder: "Enter your complete full name",
  designation: "Position / Designation *",
  rigNumber: "Rig Number / Employee ID *",
  rigNumberPlaceholder: "Enter rig number or employee identification",
  email: "Email Address *",
  positionPlaceholder: "Select your position or designation",
  emailPlaceholder: "Enter your official email address",
  company: "Company / Organization *",
  companyPlaceholder: "Select your company or organization",
  submit: "Submit Registration",
  terms: "I acknowledge that all information provided is accurate and complete. I understand that false information may result in denial of access or disciplinary action."
};


export default function Home() {
  const [language, setLanguage] = useState("en");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [translations, setTranslations] = useState(textContent);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const values = {
      fullName: formData.get("fullName"),
      designation: formData.get("designation"),
      rigNumber: formData.get("rigNumber"),
      email: formData.get("email"),
      company: formData.get("company"),
      language: language,
    };

    console.log("Form Values:", values);
    setIsFormSubmited(true);
    e.currentTarget.reset();
    setDesignation("");
    setCompany("");
  };

  const handleChange = async (lang: string) => {
  setLanguage(lang);

  // Translate all texts at once
  const entries = Object.entries(textContent);
  const values = await Promise.all(
    entries.map(([key, value]) => translateText(lang, value))
  );

  // Build translated object
  const translatedObj = entries.reduce((acc:any, [key], idx) => {
    acc[key] = values[idx] as string;
    return acc;
  }, {} as typeof textContent);

  setTranslations(translatedObj);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 sm:p-6">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-0 gap-10 max-w-7xl w-full rounded-md overflow-hidden shadow-2xl">
        <PreviewSummary />
        {isFormSubmited ? (
          <AllQuestions />
        ) : (
          <div className="bg-background  md:max-h-[90vh] h-full overflow-y-scroll overflow-x-hidden p-6 lg:p-8 flex flex-col justify-start items-center text-white relative overflow-hidden rounded-none rounded-r-md lg:rounded-l-none rounded-l-md shadow-xl">
            {/* Header Section */}
            <div className="flex md:flex-row flex-col justify-between items-start mb-4 w-full">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-0 capitalize">
                  {translations?.title}
                </h2>
                <p className="text-slate-600">
                  {translations?.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-2 w-full md:w-fit">
                <Globe className="w-4 h-4 text-slate-600" />
                <Select defaultValue="en" onValueChange={handleChange}>
                  <SelectTrigger className="border-none md:w-32 w-full rounded-lg py-3 px-1 text-slate-800 shadow-none focus:ring-0 outline-none focus-visible:ring-0 transition-all duration-200">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="hi">हिन्दी</SelectItem>
                    <SelectItem value="zh-Hans">印地语</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {translations.fullName} *
                </label>
                <Input
                  type="text"
                  name="fullName"
                  required
                  placeholder={translations.fullNamePlaceholder}
                  className="border-slate-300 rounded-lg py-3 px-4 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-2  w-full">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {translations.designation}
                </label>
                <Select
                  name="designation"
                  required
                  onValueChange={setDesignation}
                >
                  <SelectTrigger className="border-slate-300  w-full rounded-lg py-3 px-4 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                    <SelectValue placeholder={translations.positionPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="senior-engineer">
                      Senior Engineer
                    </SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="visitor">Visitor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {translations.rigNumber}
                </label>
                <Input
                  type="text"
                  name="rigNumber"
                  required
                  placeholder={translations.rigNumberPlaceholder}
                  className="border-slate-300 rounded-lg py-3 px-4 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {translations.email}
                </label>
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder={translations.emailPlaceholder}
                  className="border-slate-300 rounded-lg py-3 px-4 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {translations.company}
                </label>
                <Select name="company" required onValueChange={setCompany}>
                  <SelectTrigger className="border-slate-300 w-full rounded-lg py-3 px-4 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                    <SelectValue placeholder={translations.companyPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {companies?.map((company, index) => {
                      return (
                        <SelectItem value={company.value} key={index}>
                          {company.name}
                        </SelectItem>
                      );
                    })}
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Terms and Conditions */}

              <Button
                type="submit"
                disabled={!agreedToTerms}
                className={`w-full font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-2 ${
                  agreedToTerms
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed"
                }`}
              >
                {translations.submit}
              </Button>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setAgreedToTerms(!agreedToTerms)}
                    className={`mt-1 sm:w-7 w-12 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      agreedToTerms
                        ? "bg-blue-600 border-blue-600"
                        : "border-slate-300 hover:border-blue-400"
                    }`}
                  >
                    {agreedToTerms && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </button>
                  <label
                    className="text-[12px] text-slate-600 cursor-pointer"
                    onClick={() => setAgreedToTerms(!agreedToTerms)}
                  >
                    {translations.terms}
                  </label>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
