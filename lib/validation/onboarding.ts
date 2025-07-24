import { z } from 'zod';

export const roleSelectionSchema = z.object({
  role: z
    .string()
    .min(1, 'Please select a role')
    .refine(
      (val) => ['developer', 'designer', 'marketer', 'manager', 'other'].includes(val),
      'Please select a valid role'
    ),
});

export const skillsSchema = z.object({
  skills: z
    .array(z.string())
    .min(1, 'Please add at least one skill')
    .max(20, 'You can add up to 20 skills')
    .refine(
      (skills) => skills.every(skill => skill.trim().length >= 2),
      'Each skill must be at least 2 characters long'
    ),
});

export const resumeUploadSchema = z.object({
  resumeUploaded: z
    .boolean()
    .refine((val) => val === true, 'Please upload your resume'),
});

export const onboardingStep1Schema = roleSelectionSchema;
export const onboardingStep2Schema = skillsSchema;
export const onboardingStep3Schema = resumeUploadSchema;

export type RoleSelectionData = z.infer<typeof roleSelectionSchema>;
export type SkillsData = z.infer<typeof skillsSchema>;
export type ResumeUploadData = z.infer<typeof resumeUploadSchema>;
export type OnboardingStep1Data = z.infer<typeof onboardingStep1Schema>;
export type OnboardingStep2Data = z.infer<typeof onboardingStep2Schema>;
export type OnboardingStep3Data = z.infer<typeof onboardingStep3Schema>; 