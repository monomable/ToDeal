export default function create() {
    return(
        <div className="flex justify-center py-16 px-4">
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">글 작성</h2>
                <form action="/server-api/posts/create" method="POST" className="space-y-6">
                
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">제목</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                        placeholder="제목을 입력하세요"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label htmlFor="writer" className="block text-sm font-medium text-gray-700 dark:text-gray-200">작성자 이름</label>
                    <input
                        type="text"
                        id="writer"
                        name="writer"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                        placeholder="이름"
                    />
                    </div>
                    <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                        placeholder="비밀번호"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">내용</label>
                    <textarea
                        id="content"
                        name="content"
                        rows={6}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none resize-none dark:bg-gray-700 dark:text-white"
                        placeholder="내용을 입력하세요"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
                >
                    작성 완료
                </button>
                </form>
            </div>
            </div>


    ) 
  }