import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import surveyConfig from "@/survey.json";
import { RootState } from "@/store";
import { addToHistory, saveAnswer } from "@/features/surveySlice";
import { getDynamicParams } from "@/lib/getDynamicQuestion";
import SurveyLayout from "@/components/layouts/SurveyLayout";
import SURVAY_CONTAINERS_MAP from "@/components/containers";
import { ReactNode, useEffect } from "react";
import { setTheme } from "@/features/themeSlice";

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

export type SurveyLayoutProps = {
    id: string,
    type: keyof typeof SURVAY_CONTAINERS_MAP,
    title: string,
    subtitle?: string,
    options: string[],
    next: string,
    theme?: string,
    configuration?: { conditions: Record<string, string[]>, values: Record<string, string>[] }[]
}

export default function SurveyPage({ screen }: { screen: SurveyLayoutProps }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const answers = useSelector((state: RootState) => state.survey.answers);
    const theme = useSelector((state: RootState) => state.theme.mode);

    useEffect(() => {
        if (screen?.theme) {
            dispatch(setTheme(screen.theme));
        }
        return () => {
            dispatch(setTheme('black'));
        }
    }, [screen, dispatch]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const dynamicParams = getDynamicParams(screen, answers);

    const handleAnswer = (answer?: string[]) => {
        dispatch(saveAnswer({ questionId: dynamicParams.id, answer }));

        if (surveyConfig.onboarding[surveyConfig.onboarding.length - 1].id !== dynamicParams.id) {
            dispatch(addToHistory({ questionId: dynamicParams.id }))
            router.push(`/survey/${dynamicParams.next || dynamicParams.next}`)
        }
    };

    return SURVAY_CONTAINERS_MAP[screen.type]({ params: dynamicParams, answers: answers?.[screen.id], handleAnswer: handleAnswer });
}

SurveyPage.getLayout = (page: ReactNode) => <SurveyLayout>{page}</SurveyLayout>;
