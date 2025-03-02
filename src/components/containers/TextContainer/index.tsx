import Text from '@/components/Text'
import styles from './textContainer.module.css'

export type TextContainerPropsType = {
    params: {
        title: string;
        subtitle?: string;
        next: string;
        type: string;
    };
    handleAnswer: () => void;
}

export default function TextContainer({params, handleAnswer }: TextContainerPropsType) {

    return (
        <div className={styles.container}>
            <Text type="title">
                {params.title}
            </Text>
            {params?.subtitle && <Text type="subtitle">{params.subtitle}</Text>}
            <button className={styles.button} onClick={handleAnswer}>
                <Text modificator={['alternate']} type="buttonText" >
                    Next
                </Text>
            </button>
        </div>
    )
}