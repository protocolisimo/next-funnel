import SURVAY_CONTAINERS_MAP from "@/components/containers";
import OnboardingHeader from "@/components/OnboardingHeader"
import { goBack } from "@/features/surveySlice";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

const SurveyLayout = ({children}: {children: ReactNode}) => {
    
    const router = useRouter();
    const dispatch = useDispatch();
    const history = useSelector((state: RootState) => state.survey.history);

    const handleGoBack = () => {
        dispatch(goBack());
        const previousQuestionId = history.length > 0 ? history[history.length - 1] : null;

        if (previousQuestionId) {
            router.push(`/survey/${previousQuestionId}`);
        }
    };
    
    return (
        <main>
            <OnboardingHeader onBackClickHandler={handleGoBack} />
            {children}
        </main>
    )
}
export default SurveyLayout;