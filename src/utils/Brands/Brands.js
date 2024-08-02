import React from "react";
import { IoIosPartlySunny } from "react-icons/io";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";
import { SiPythonanywhere } from "react-icons/si";
import { TbPackageExport } from "react-icons/tb";
import { FcAssistant } from "react-icons/fc";
import BrandItem from "./BrandItem";

const Brands = () => {
  return (
    <div className="grid lg:grid-cols-3  sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10 pt-10 md:px-0 px-5">
      <BrandItem
        title="Global Reach"
        text="Gain access to a vast network of employers from various industries and regions, expanding your career opportunities across the globe."
        icon={AiOutlineGlobal}
      />
      <BrandItem
        title="Personalized Job Matches"
        text="Receive job suggestions that match your skills, experience, and career aspirations, ensuring you find the most relevant opportunities."
        icon={IoIosPartlySunny}
      />
      <BrandItem
        title="Industry Expertise"
        text="Leverage expert advice and industry insights to enhance your job search and career development, making informed decisions along the way."
        icon={MdOutlineSecurity}
      />
      <BrandItem
        title="Seamless Application Process"
        text="Experience a user-friendly application process that allows you to apply for jobs quickly and efficiently, saving you time and effort."
        icon={SiPythonanywhere}
      />
      <BrandItem
        title="Comprehensive Resources"
        text="Access a wide range of resources, including resume builders, interview tips, and career advice, to support your professional growth."
        icon={TbPackageExport}
      />
      <BrandItem
        title="Trusted by Top Employers"
        text="Connect with leading employers who trust our platform to find talented professionals like you, opening doors to prestigious career opportunities."
        icon={FcAssistant}
      />
      <BrandItem
        title="Anywhere reculting"
        text="Connect with LinkedIn, Google, and 70+ other apps and tools to get more
        done. Make your work easier by linking your favorite platforms. Stay on
        top of tasks, calendars, and messages in one spot. Save time and focus
        better with our easy connections."
        icon={SiPythonanywhere}
      />
      <BrandItem
        title="Export Advice"
        text="Connect with LinkedIn, Google, and 70+ other apps and tools to get more
        done. Make your work easier by linking your favorite platforms. Stay on
        top of tasks, calendars, and messages in one spot. Save time and focus
        better with our easy connections."
        icon={TbPackageExport}
      />
      <BrandItem
        title="Assisted Onboarding"
        text="Connect with LinkedIn, Google, and 70+ other apps and tools to get more
        done. Make your work easier by linking your favorite platforms. Stay on
        top of tasks, calendars, and messages in one spot. Save time and focus
        better with our easy connections."
        icon={FcAssistant}
      />
    </div>
  );
};

export default Brands;
