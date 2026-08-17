
import React, { useEffect } from 'react';
import { Challenge } from '../../types/partner';
import { CheckCircle2, Clock, Award, Circle } from 'lucide-react';
import { FamilyService } from '../../services/FamilyService';
import { useAuth } from '../../hooks/useAuth';
import { notificationService } from '../../services/NotificationService';

interface TeenChallengeViewProps {
    challenges: Challenge[];
    onRefresh: () => void;
}

export const TeenChallengeView: React.FC<TeenChallengeViewProps> = ({ challenges, onRefresh }) => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.uid || challenges.length === 0) return;
        const key = `khalil_family_challenge_notified_${user.uid}`;
        let initialNotified: string[] = [];
        try {
            initialNotified = JSON.parse(localStorage.getItem(key) || '[]');
        } catch {
            initialNotified = [];
        }
        const notifiedIds = new Set<string>(initialNotified);

        const assignedPendingChallenges = challenges.filter((challenge) => {
            const status = challenge.participantsStatus?.[user.uid];
            return status === 'pending' && !notifiedIds.has(challenge.id);
        });

        if (assignedPendingChallenges.length === 0) return;

        assignedPendingChallenges.forEach((challenge) => {
            notificationService.showPartnerNotification(
                'New Family Challenge Assigned',
                `${challenge.title} - open Family > Challenges to view details.`,
                { type: 'family_challenge', fromUser: challenge.createdBy }
            );
            notifiedIds.add(challenge.id);
        });

        try { localStorage.setItem(key, JSON.stringify(Array.from(notifiedIds))); } catch (e) { /* fail silently */ }
    }, [challenges, user?.uid]);

    const handleComplete = async (challengeId: string) => {
        if (!user) return;
        // TODO: Replace with modal dialog - prompt("Optional: Add a note about your completion:")
                        const note = null;
        if (note !== null) {
            await FamilyService.submitProof(challengeId, user.uid, note);
            onRefresh();
        }
    };

    if (challenges.length === 0) return null;

    return (
        <div className="space-y-4">
            <h3 className="font-bold text-brand-forest text-lg px-1">Active Challenges</h3>
            <div className="grid gap-3">
                {challenges.map(challenge => {
                    const myStatus = user ? challenge.participantsStatus[user.uid] : undefined;
                    const isCompleted = myStatus === 'submitted' || myStatus === 'approved';
                    const deadline = new Date(challenge.deadline.seconds * 1000);
                    const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 3600 * 24));

                    return (
                        <div key={challenge.id} className="bg-brand-surface border border-black/5 p-4 rounded-3xl shadow-sm flex gap-4">
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-brand-forest">{challenge.title}</h4>
                                    {challenge.reward && (
                                        <span className="bg-brand-secondary/10 text-brand-secondary text-xs px-2 py-1 rounded-full flex items-center border border-brand-secondary/20 font-medium">
                                            <Award size={12} className="mr-1" /> {challenge.reward}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-brand-muted mb-3">{challenge.description}</p>
                                <div className="flex items-center gap-4 text-xs text-brand-muted">
                                    <span className={`flex items-center ${daysLeft < 2 ? 'text-red-500 font-bold' : ''}`}>
                                        <Clock size={12} className="mr-1" /> {daysLeft} days left
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center border-l border-black/5 pl-4">
                                <button
                                    onClick={() => !isCompleted && handleComplete(challenge.id)}
                                    disabled={isCompleted}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isCompleted
                                            ? 'bg-brand-primary/15 text-brand-primary'
                                            : 'bg-brand-subtle text-brand-muted hover:bg-brand-primary/10 hover:text-brand-primary border-2 border-brand-border hover:border-brand-primary/30'
                                        }`}
                                >
                                    {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                </button>
                                <span className="text-[10px] text-center mt-1 text-brand-muted font-medium">
                                    {isCompleted ? 'Done' : 'Mark'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
