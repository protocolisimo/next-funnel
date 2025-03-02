import { SurveyLayoutProps } from '@/pages/survey/[id]';

export const getDynamicParams = (screen: SurveyLayoutProps, answers: Record<string, string[]>) => {
    let configuredScreen = { ...screen };

    if (screen?.configuration) {
        let searchedOptions = screen.configuration.find((entity) => {
            const conditionalKeys = Object.keys(entity.conditions);

            return conditionalKeys.every((conditionKey) => {
                if (!answers[conditionKey]) return false;
                return entity.conditions[conditionKey].every((el) => answers[conditionKey].includes(el));
            });
        });

        if (searchedOptions) {
            searchedOptions.values.forEach((value) => {
                configuredScreen = { ...configuredScreen, ...value };
            });
        }
    }

    return configuredScreen;
};
