"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Download, Shield, Users, FileCheck } from "lucide-react";
import { Button } from "../ui/button";

const previewSummary = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card className=" border-r-2 border-slate-400 border-solid md:max-h-[90vh] h-full overflow-y-scroll overflow-x-hidden bg-white dark:bg-slate-900 backdrop-blur-sm shadow-xl rounded-none rounded-l-md lg:rounded-r-none rounded-r-md px-0 py-6">
      <CardHeader>
        <div className="group relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <Image
            src="/test.webp"
            alt="PPE Requirements"
            width={600}
            height={400}
            className="rounded-xl mx-auto border-4 border-blue-100 dark:border-slate-700 transition-transform duration-300 group-"
          />
        </div>
        <div className="flex items-center gap-3 mt-6">
          <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" />
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-900 to-indigo-600 dark:from-blue-300 dark:to-indigo-400 bg-clip-text text-transparent">
            DRILLING RIG SITE
          </CardTitle>
        </div>
        <CardDescription className="text-lg md:text-xl font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Personal Protective Equipment (PPE) Requirements
        </CardDescription>
      </CardHeader>

      <CardContent className="leading-relaxed space-y-6 px-6 pb-8 text-gray-700 dark:text-gray-300">
        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-xl border-l-4 border-blue-500 dark:border-blue-400">
          <p className="font-semibold text-blue-900 dark:text-blue-300">
            <strong>KOC.SA.010</strong> - Procedure for Personal Protective
            Equipment (PPE) – August 2025
          </p>
        </div>

        <div className="space-y-4">
          <p>
            This procedure outlines requirements for PPE use, storage,
            maintenance, and replacement across KOC facilities and controlled
            areas, applying to all personnel including contractors and visitors.
            PPE is the last line of defence against workplace hazards like
            chemicals, noise, radiation, and physical dangers.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-5 rounded-xl">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
              Key Requirements:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                Mandatory PPE includes safety helmets, footwear, coveralls,
                hand/eye protection.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                Specialized PPE (flame-resistant coveralls, hearing protection,
                etc.) is required for specific hazards.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                All PPE must comply with KOC Standard KOC-L.010 or equivalent
                international standards.
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 p-5 rounded-xl">
            <h3 className="font-bold mb-3">Processes:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                Hazard assessments identify required PPE.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                PPE must be properly selected, fitted, and maintained.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                Regular audits ensure compliance.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                Contractors must submit PPE for approval with test certificates.
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 p-5 rounded-xl">
            <h3 className="font-bold mb-3">Special Provisions:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                Helmets require reflective striping for low visibility.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                Visitors must wear appropriate PPE.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                Records are retained for 5 years.
              </li>
            </ul>
          </div>

          <div className="text-center pt-4">
            <p className="font-semibold mb-4">
              Click below button to Download the Procedure
            </p>
            <Button
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform  transition-all duration-300 flex items-center gap-2 mx-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Download
                className={`w-5 h-5 transition-transform duration-300 ${
                  isHovered ? "animate-bounce" : ""
                }`}
              />
              Click here to Download ⭳
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default previewSummary;
