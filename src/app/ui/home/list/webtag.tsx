export default function WebTag(website : string) {

    switch(website) {
        case 'quasarzone':
            return <span className="bg-orange-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-700 dark:text-gray-300">퀘이사존</span>
        case 'fmkorea':
            return <span className="bg-blue-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-700 dark:text-gray-300">fm코리아</span>
        case 'arcalive':
            return <span className="bg-gray-400 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-black dark:text-gray-300">아카라이브</span>
        case 'ppomppu':
            return <span className="bg-yellow-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-700 dark:text-gray-300">뽐뿌</span>
        default :
            return <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">기타</span>
    }

}