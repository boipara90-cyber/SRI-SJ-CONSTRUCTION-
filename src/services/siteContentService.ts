import { useState, useEffect } from 'react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';

export interface EditableSiteContent {
  company: {
    name: string;
    shortName: string;
    tagline: string;
    establishedYear: string | number;
    experienceYears: string;
    gstNumber: string;
    fullAddress: string;
    phone: string;
    altPhone: string;
    email: string;
    supportEmail: string;
    whatsapp: string;
    workingHours: string;
    emergencySupport: string;
  };
  hero: {
    specialistBadge: string;
    headline1: string;
    headline2: string;
    intro: string;
    quoteBtnText: string;
    projectsBtnText: string;
    galleryBtnText: string;
  };
  about: {
    badgeText: string;
    heading: string;
    leadParagraph: string;
    storyParagraph1: string;
    storyParagraph2: string;
    storyParagraph3?: string;
  };
  stats: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
  services: Array<{
    id: string;
    title: string;
    category: string;
    shortDescription: string;
  }>;
  lastUpdated?: string;
}

export const DEFAULT_SITE_CONTENT: EditableSiteContent = {
  company: {
    name: COMPANY_INFO.name,
    shortName: COMPANY_INFO.shortName,
    tagline: COMPANY_INFO.tagline,
    establishedYear: COMPANY_INFO.establishedYear,
    experienceYears: COMPANY_INFO.experienceYears,
    gstNumber: COMPANY_INFO.gstNumber,
    fullAddress: COMPANY_INFO.address.fullAddress,
    phone: COMPANY_INFO.contact.phone,
    altPhone: COMPANY_INFO.contact.altPhone,
    email: COMPANY_INFO.contact.email,
    supportEmail: COMPANY_INFO.contact.supportEmail,
    whatsapp: COMPANY_INFO.contact.whatsapp,
    workingHours: COMPANY_INFO.contact.workingHours,
    emergencySupport: COMPANY_INFO.contact.emergencySupport
  },
  hero: {
    specialistBadge: "SPECIALIST IN PILE FOUNDATIONS & INDUSTRIAL CIVIL WORKS",
    headline1: "Strong Foundations.",
    headline2: "Reliable Construction.",
    intro: "SRI SJ CONSTRUCTIONS PRIVATE LIMITED is an established engineering contractor based in Haldia, Sutahata, Nandarampur, West Bengal (721635). We execute high-capacity bored cast-in-situ piling, sheet piling, EHV transmission tower footings, and heavy industrial machine substructures across India.",
    quoteBtnText: "Get a Quote",
    projectsBtnText: "View Done Projects",
    galleryBtnText: "Project Gallery"
  },
  about: {
    badgeText: "About S.J. Constructions",
    heading: "Building on Trust, Technicality & Engineering Precision",
    leadParagraph: "From our founding roots in 2007 to our established corporate presence in Haldia, Sutahata, Nandarampur, West Bengal (721635), delivering specialized deep foundation and infrastructure solutions.",
    storyParagraph1: "Incorporated as a piling company in 2007, S.J. Constructions has taken the shape of a full-fledged construction company with special emphasis on pile foundation, testing and other geotechnical works in less than a year and half.",
    storyParagraph2: "Consistent effort to improve quality of workmanship, Commitment towards timely Completion, Transparency in dealing with clients, above all the greatest encouragement from our clients are the Motivating factors to our Success.",
    storyParagraph3: "To combat the challenge ahead we’re on the way to modernize the testing and Construction methods. Sonic integrity testing on piles, usage of LVDT display device, VDF system and Power trowel are to name a few in this direction."
  },
  stats: [
    { label: "Established Year", value: "2011", detail: "Registered Pvt Ltd" },
    { label: "GST Registration", value: "19ABPCS8304J1ZQ", detail: "Active Verified GSTIN" },
    { label: "Industry Experience", value: "15+ Years", detail: "Deep Piling & Civil" },
    { label: "Execution Track", value: "Multiple Projects", detail: "Industrial & Infrastructure" },
    { label: "Operational Hub", value: "Haldia, WB", detail: "Port & Industrial Belt" }
  ],
  services: SERVICES.slice(0, 6).map(s => ({
    id: s.id,
    title: s.title,
    category: s.category,
    shortDescription: s.shortDescription
  }))
};

const STORAGE_KEY = 'sri_sj_editable_site_content';
const UPDATE_EVENT_KEY = 'sri_sj_site_content_updated';

// Get current saved content or fallback to defaults
export function getSiteContent(): EditableSiteContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_SITE_CONTENT;
    const parsed = JSON.parse(saved);
    return {
      ...DEFAULT_SITE_CONTENT,
      ...parsed,
      company: { ...DEFAULT_SITE_CONTENT.company, ...(parsed.company || {}) },
      hero: { ...DEFAULT_SITE_CONTENT.hero, ...(parsed.hero || {}) },
      about: { ...DEFAULT_SITE_CONTENT.about, ...(parsed.about || {}) },
      stats: parsed.stats && Array.isArray(parsed.stats) ? parsed.stats : DEFAULT_SITE_CONTENT.stats,
      services: parsed.services && Array.isArray(parsed.services) ? parsed.services : DEFAULT_SITE_CONTENT.services
    };
  } catch (e) {
    console.error('Failed to load editable site content:', e);
    return DEFAULT_SITE_CONTENT;
  }
}

// Save content and notify components
export function saveSiteContent(content: EditableSiteContent): void {
  try {
    const dataToSave = {
      ...content,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_KEY, { detail: dataToSave }));
  } catch (e) {
    console.error('Failed to save editable site content:', e);
  }
}

// Reset content to default
export function resetSiteContent(): EditableSiteContent {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_KEY, { detail: DEFAULT_SITE_CONTENT }));
    return DEFAULT_SITE_CONTENT;
  } catch (e) {
    console.error('Failed to reset editable site content:', e);
    return DEFAULT_SITE_CONTENT;
  }
}

// React hook to access and listen to site content changes in any component
export function useSiteContent(): {
  content: EditableSiteContent;
  updateContent: (newContent: EditableSiteContent) => void;
  resetContent: () => void;
} {
  const [content, setContent] = useState<EditableSiteContent>(() => getSiteContent());

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<EditableSiteContent>;
      if (customEvent.detail) {
        setContent(customEvent.detail);
      } else {
        setContent(getSiteContent());
      }
    };

    window.addEventListener(UPDATE_EVENT_KEY, handleUpdate);
    return () => window.removeEventListener(UPDATE_EVENT_KEY, handleUpdate);
  }, []);

  const updateContent = (newContent: EditableSiteContent) => {
    saveSiteContent(newContent);
    setContent(newContent);
  };

  const resetContent = () => {
    const def = resetSiteContent();
    setContent(def);
  };

  return { content, updateContent, resetContent };
}
