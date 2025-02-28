import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import surveyConfig from "@/survey.json";
import { RootState } from "@/store";
import { saveAnswer, goBack } from "@/features/surveySlice";
import { getDynamicParams } from "@/lib/getDynamicQuestion";


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

// add page maping 
// add components 
// fix types
// add prietier

// @ts-expect-error tatatata
export default function SurveyPage({ screen }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const answers = useSelector((state: RootState) => state.survey.answers);
    const history = useSelector((state: RootState) => state.survey.history);

    const dynamicParams = getDynamicParams(screen, answers);

    const handleAnswer = (answer: string) => {
        dispatch(saveAnswer({ questionId: dynamicParams.id, answer: [answer] }));

        dynamicParams.type !== 'end' && router.push(`/survey/${dynamicParams.next || dynamicParams.next}`)
    };

    const handleGoBack = () => {
        dispatch(goBack());
        const previousQuestionId = history.length > 0 ? history[history.length - 1] : null;

        if (previousQuestionId ) {
            router.push(`/survey/${previousQuestionId}`);
        }
    };

    return (
        <div>
            <h1>{dynamicParams.title}</h1>
            {dynamicParams?.subtitle && <p>{dynamicParams.subtitle}</p>}

            {
                dynamicParams.answers?.map((option) => (
                    <button key={option} onClick={() => handleAnswer(option)}>
                        {option}
                    </button>
                )
            )}

            {history.length > 0 && (
                <button onClick={handleGoBack} style={{ marginTop: "10px" }}>
                    back
                </button>
            )}
        </div>
    );
}
