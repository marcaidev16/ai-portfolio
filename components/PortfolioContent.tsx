import { JobFitAssessment } from "@/components/sections/JobFitAssessment";
import {
  AboutSection,
  AchievementsSection,
  AutomationsLibrary,
  BlogSection,
  CertificationsSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from "@/components/sections";

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <JobFitAssessment />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <AutomationsLibrary />
      <CertificationsSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}

export default PortfolioContent;
