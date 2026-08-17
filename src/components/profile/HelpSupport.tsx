import React from 'react';
import { ArrowLeft, Mail, MessageCircle, ExternalLink, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HelpSupportProps {
    onBack: () => void;
}

// Read version from package.json at build time via Vite's define
const APP_VERSION = __APP_VERSION__ ?? '0.2.0';

export const HelpSupport: React.FC<HelpSupportProps> = ({ onBack }) => {
    const { language, t } = useLanguage();

    const LINKS = [
        { icon: MessageCircle, label: t('profile_contact_support'), sub: 'support@dhikra.app', action: () => window.open('mailto:support@dhikra.app') },
        { icon: ExternalLink, label: t('profile_privacy_policy'), sub: 'dhikra.app/privacy', action: () => window.open('https://dhikra.app/privacy') },
        { icon: ExternalLink, label: t('profile_terms'), sub: 'dhikra.app/terms', action: () => window.open('https://dhikra.app/terms') },
    ];

    return (
        <div className="flex flex-col h-full bg-brand-surface">
            <div className="flex items-center p-4 border-b border-brand-primary/10">
                <button
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-brand-primary/5 active:bg-brand-primary/10 transition-colors"
                >
                    <ArrowLeft size={24} className="text-brand-primary" />
                </button>
                <h2 className="text-xl font-bold ml-4 text-brand-forest">
                    {t('profile_help_support')}
                </h2>
            </div>

            <div className="p-5 overflow-y-auto">
                <div className="text-center mb-8 py-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-brand-primary/20">
                        <Heart className="text-white fill-white/20" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-brand-forest">Dhikra</h3>
                    <p className="text-neutral-500">{t('app_version')} {APP_VERSION}</p>
                </div>

                <div className="space-y-3">
                    {LINKS.map((link, i) => (
                        <button
                            key={link.label || 'link-' + i}
                            onClick={link.action}
                            className="w-full p-4 bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-transparent dark:border-white/5 hover:border-brand-primary/20 hover:shadow-md transition-all flex items-center"
                            >
                            <div className="w-10 h-10 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary">
                                <link.icon size={20} />
                            </div>
                            <div className="flex-1 mx-4 text-left rtl:text-right">
                                <div className="font-semibold text-brand-forest">{link.label}</div>
                                <div className="text-xs text-neutral-400">{link.sub}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-10 p-4 bg-brand-sand/30 rounded-3xl text-center">
                    <p className="text-sm text-brand-forest/80 leading-relaxed">
                        {t('profile_help_desc')}
                    </p>
                </div>
            </div>
        </div>
    );
};
