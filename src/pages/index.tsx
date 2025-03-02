import { useEffect } from 'react';
import { useRouter } from 'next/router';
import surveyConfig from '@/survey.json';

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        const firstQuestionId = surveyConfig.onboarding[0]?.id;

        router.replace(`/survey/${firstQuestionId}`);
    }, [router]);

    return <div>App loader...</div>;
};

export default HomePage;
