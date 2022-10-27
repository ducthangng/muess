import LeftContentBlock from '../../components/contentBlock/leftContent';
import { ContentBlockProps } from '../../components/contentBlock/styles';

const ContentBlock = (props: ContentBlockProps) => {
  if (props.type === 'left') return <LeftContentBlock {...props} />;
  return null;
};

export default ContentBlock;
