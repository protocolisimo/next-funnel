import Text from '@/components/Text';
import styles from './singleChoiceContainer.module.css';
import OptionBox from '@/components/OptionBox';

export type SingleChoiceContainerPropsType = {
    params: {
        title: string;
        subtitle?: string;
        options: string[];
        next: string;
        type: string;
    };
    answers: string[]; // fix any
    handleAnswer: (value: string[] | string) => void;
};

export default function SingleChoiceContainer({ answers, params, handleAnswer }: SingleChoiceContainerPropsType) {
    return (
        <div className={styles.container}>
            <Text type="title">{params.title}</Text>
            {params?.subtitle && <Text type="subtitle">{params.subtitle}</Text>}
            <OptionBox
                values={answers}
                changeListChandler={handleAnswer}
                pageType={params.type}
                optionList={params.options}
            />
        </div>
    );
}
