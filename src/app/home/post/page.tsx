import PostData from '@/ui/home/list/postmaindata'
import Link from 'next/link'
import {PencilIcon} from '@heroicons/react/24/outline'

export default function Page() {
    return (
      <div>
        <div className="mb-0 w-full text-right">
          <Link href="/post/create">
            <button className='white-btn px-3 py-2 inline-flex items-center'>
              <PencilIcon className='size-4'/>
              <span>글쓰기</span>
            </button>
          </Link>
        </div>
        <PostData/>
      </div>
    )
  }