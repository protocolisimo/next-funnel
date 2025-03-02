import SingleChoiceContainer, { SingleChoiceContainerPropsType } from './SingleChoiceContainer';
import TextContainer, { TextContainerPropsType } from './TextContainer';

type ContainerComponent<T> = React.FC<T>;

interface ContainerMap {
    single_choice: ContainerComponent<SingleChoiceContainerPropsType>;
    text: ContainerComponent<TextContainerPropsType>;
    end: ContainerComponent<SingleChoiceContainerPropsType>; // do i need separete end page?
}

const SURVAY_CONTAINERS_MAP: ContainerMap = {
    single_choice: SingleChoiceContainer,
    text: TextContainer,
    end: SingleChoiceContainer,
};

export default SURVAY_CONTAINERS_MAP;
