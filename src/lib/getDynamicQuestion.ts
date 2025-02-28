

type ConfiguredProps = {
    id: string,
    type: string,
    title: string,
    subtitle?: string,
    answers: string[],
    next: string,
    configuration?: { conditions: Record<string, string[]>, options: Record<string, string>[] }[]
}

export const getDynamicParams = (
    screen: ConfiguredProps,
    answers: Record<string, string[]>
) => {
    let configuredScreen = {...screen};

    if (screen?.configuration) {
        let searchedOptions = screen.configuration.find((entity) => {
            const conditionalKeys = Object.keys(entity.conditions);
            
            return conditionalKeys.every((conditionKey) => {
                if (!answers[conditionKey])
                    return false;
                return entity.conditions[conditionKey].every(el => answers[conditionKey].includes(el));
            });
        });

        if (searchedOptions) {
            searchedOptions.options.forEach((option) => {
                configuredScreen = { ...configuredScreen, ...option }
            })
        }
    }

    return configuredScreen
};
