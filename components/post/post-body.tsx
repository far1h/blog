import markdownStyles from './markdown-styles.module.css';
import { useTheme } from '../contexts/ThemeContext';

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  const { theme } = useTheme(); // Get current theme

  return (
    <div
      className={`${markdownStyles['markdown-body']} ${
        theme === 'dark' ? markdownStyles['dark'] : markdownStyles['light']
      }`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostBody;
