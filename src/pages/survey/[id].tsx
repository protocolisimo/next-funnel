import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import surveyConfig from '@/survey.json';
import { RootState } from '@/store';
import { saveAnswer } from '@/features/surveySlice';
import { getDynamicParams } from '@/lib/getDynamicQuestion';
import SurveyLayout from '@/components/layouts/SurveyLayout';
import SURVAY_CONTAINERS_MAP from '@/components/containers';
import { ReactNode, useEffect } from 'react';
import { setTheme } from '@/features/themeSlice';

export async function getStaticPaths() {
    const paths = surveyConfig.onboarding.map((q) => ({
        params: { id: q.id },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const screen = surveyConfig.onboarding.find((q) => q.id === params.id);

    if (!screen) {
        return { notFound: true };
    }

    return { props: { screen } };
}

// add theme support
// add prietier

export type SurveyLayoutProps = {
    id: string;
    type: keyof typeof SURVAY_CONTAINERS_MAP;
    title: string;
    subtitle?: string;
    options: string[];
    next: string;
    theme?: string;
    configuration?: { conditions: Record<string, string[]>; values: Record<string, string>[] }[];
};

export default function SurveyPage({ screen }: { screen: SurveyLayoutProps }) {
    //ToDo: it would be grate to clean up here
    const router = useRouter();
    const dispatch = useDispatch();
    const answers = useSelector((state: RootState) => state.survey.answers);
    const theme = useSelector((state: RootState) => state.theme.mode);

    useEffect(() => {
        if (screen?.theme) {
            dispatch(setTheme(screen.theme));
        }
        return () => {
            dispatch(setTheme('black')); // make a var with default theme name
        };
    }, [screen]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const dynamicParams = getDynamicParams(screen, answers);

    const handleAnswer = (answer?: string[] | string) => {
        answer &&
            dispatch(saveAnswer({ questionId: dynamicParams.id, answer: Array.isArray(answer) ? answer : [answer] }));

        dynamicParams.type !== 'end' && router.push(`/survey/${dynamicParams.next || dynamicParams.next}`);
    };

    return SURVAY_CONTAINERS_MAP[screen.type]({
        params: dynamicParams,
        answers: answers?.[screen.id],
        handleAnswer: handleAnswer,
    });
}

SurveyPage.getLayout = (page: ReactNode) => <SurveyLayout>{page}</SurveyLayout>;
