/**
 * OnboardingService - Track onboarding completion status
 */

export interface OnboardingData {
    completed: boolean;
    isGoogleLinked?: boolean;
    gender?: 'male' | 'female';
    completedAt?: string;
    profile?: {
        firstName: string;
        lastName: string;
        nickname: string;
        age: number;
        hobbies: string[];
        bio: string;
        location: {
            city: string;
            country: string;
        };
        socialLinks?: Array<{ platform: string; handle: string }>;
    };
}

const ONBOARDING_KEY = 'khalil_onboarding';

class OnboardingService {
    getOnboardingData(): OnboardingData | null {
        try {
            const data = localStorage.getItem(ONBOARDING_KEY);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }

    isOnboardingComplete(): boolean {
        const data = this.getOnboardingData();
        return data?.completed === true;
    }

    getGender(): 'male' | 'female' | null {
        const data = this.getOnboardingData();
        return data?.gender || null;
    }

    /**
     * Check if profile has all required fields filled
     * Required: gender, firstName, lastName, nickname, age, location (city), at least 1 social link
     * Optional: hobbies, bio
     */
    isProfileComplete(): boolean {
        const data = this.getOnboardingData();
        if (!data) return false;

        const hasGender = !!data.gender;
        const hasFirstName = !!data.profile?.firstName?.trim();
        const hasLastName = !!data.profile?.lastName?.trim();
        const hasNickname = !!data.profile?.nickname?.trim();
        const hasAge = !!(data.profile?.age && data.profile.age > 0);
        const hasLocation = !!data.profile?.location?.city?.trim();
        const hasSocialLinks = !!(data.profile?.socialLinks && data.profile.socialLinks.length > 0);

        return hasGender && hasFirstName && hasLastName && hasNickname && hasAge && hasLocation && hasSocialLinks;
    }

    saveGender(gender: 'male' | 'female'): void {
        const existing = this.getOnboardingData() || { completed: false };
        try { localStorage.setItem(ONBOARDING_KEY, JSON.stringify({
            ...existing,
            gender,
        })); } catch (e) { /* fail silently */ }
    }

    saveProfile(profile: OnboardingData['profile']): void {
        const existing = this.getOnboardingData() || { completed: false };
        try { localStorage.setItem(ONBOARDING_KEY, JSON.stringify({
            ...existing,
            profile,
        })); } catch (e) { /* fail silently */ }
    }

    completeOnboarding(): void {
        const existing = this.getOnboardingData() || {};
        try { localStorage.setItem(ONBOARDING_KEY, JSON.stringify({
            ...existing,
            completed: true,
            completedAt: new Date().toISOString(),
        })); } catch (e) { /* fail silently */ }
    }

    markGoogleLinked(): void {
        const existing = this.getOnboardingData() || { completed: false };
        try { localStorage.setItem(ONBOARDING_KEY, JSON.stringify({
            ...existing,
            isGoogleLinked: true,
        })); } catch (e) { /* fail silently */ }
    }

    isGoogleLinked(): boolean {
        return this.getOnboardingData()?.isGoogleLinked === true;
    }

    resetOnboarding(): void {
        try { localStorage.removeItem(ONBOARDING_KEY); } catch (e) { /* fail silently */ }
    }

    resetProfileCompletion(): void {
        const existing = this.getOnboardingData() || {};
        try { localStorage.setItem(ONBOARDING_KEY, JSON.stringify({
            ...existing,
            profile: undefined,
            completed: false,
        })); } catch (e) { /* fail silently */ }
    }
}

export const onboardingService = new OnboardingService();
