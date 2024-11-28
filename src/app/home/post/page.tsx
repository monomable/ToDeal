import PostData from '@/ui/home/list/postmaindata'
import Link from 'next/link'
import {PencilIcon} from '@heroicons/react/24/outline'

export default function Page() {
    return (
      <div className='p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <div className="mb-0 w-full text-right">
          <Link href="/post/create">
            <button className='white-btn px-3 py-2 inline-flex items-center'>
              <PencilIcon className='size-4'/>
              <span>글쓰기</span>
            </button>
          </Link>
        </div>
        <div className=''>
          <PostData/>
        </div>
      </div>
    )
  }