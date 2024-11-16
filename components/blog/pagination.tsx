import { useTheme } from '../contexts/ThemeContext';

type Props = {
  currPage: number;
  maxPage: number;
  pageType?: string; // Add pageType prop to differentiate pages
};

function getPaginationArr(currPage: number, maxPage: number, numItems: number = 5) {
  const pageList = [currPage];
  while (pageList.length < numItems) {
    const leftDelta = Math.abs(pageList[0] - currPage);
    const rightDelta = Math.abs(pageList[pageList.length - 1] - currPage);
    if ((leftDelta <= rightDelta || pageList[pageList.length - 1] === maxPage) && pageList[0] > 1) {
      pageList.unshift(pageList[0] - 1);
    } else if ((leftDelta > rightDelta || pageList[0] === 1) && pageList[pageList.length - 1] < maxPage) {
      pageList.push(pageList[pageList.length - 1] + 1);
    } else {
      break;
    }
  }
  return pageList;
}

function Pagination({ currPage, maxPage, pageType }: Props) {
  const paginationArr = getPaginationArr(currPage, maxPage);
  const { theme } = useTheme();

  const baseClass = `border px-3 py-2 leading-tight`;
  const lightModeClass = `bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700`;
  const darkModeClass = `bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-gray-300`;

  const currentClass = `border-blue-200 bg-blue-100 text-blue-700`;

  return (
    <div className="flex justify-center mb-10">
      <ul className="inline-flex -space-x-px">
        <li key="previous">
          {currPage === 1 ? (
            <span
              className={`${baseClass} ${theme === 'dark' ? darkModeClass : lightModeClass} rounded-l-lg cursor-default`}
            >
              Previous
            </span>
          ) : (
            <a
              href={`/${pageType || 'posts'}/${currPage - 1}`}
              className={`${baseClass} ${theme === 'dark' ? darkModeClass : lightModeClass} rounded-l-lg`}
            >
              Previous
            </a>
          )}
        </li>
        {paginationArr.map((i) => (
          <li key={i}>
            {i === currPage ? (
              <span
                className={`${baseClass} ${currentClass}`}
              >
                {i}
              </span>
            ) : (
              <a
                href={`/${pageType || 'posts'}/${i}`}
                className={`${baseClass} ${theme === 'dark' ? darkModeClass : lightModeClass}`}
              >
                {i}
              </a>
            )}
          </li>
        ))}
        <li key="next">
          {currPage === maxPage ? (
            <span
              className={`${baseClass} ${theme === 'dark' ? darkModeClass : lightModeClass} rounded-r-lg cursor-default`}
            >
              Next
            </span>
          ) : (
            <a
              href={`/${pageType || 'posts'}/${currPage + 1}`}
              className={`${baseClass} ${theme === 'dark' ? darkModeClass : lightModeClass} rounded-r-lg`}
            >
              Next
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
