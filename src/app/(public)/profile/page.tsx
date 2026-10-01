import ProfileHero from "@/components/public/landing/profile/ProfileHero";
import MosqueStory from "@/components/public/landing/profile/MosqueStory";
import VisionMission from "@/components/public/landing/profile/VisionMission";
import FacilitiesSection from "@/components/public/landing/profile/FacilitiesSection";
import ContactSection from "@/components/public/landing/profile/ContactSection";

export default function ProfilePage() {
  return (
    <main className="bg-[#F8F5EF]">
      <ProfileHero />

      <MosqueStory />

      <VisionMission />

      <FacilitiesSection />

      <ContactSection />
    </main>
  );
}
