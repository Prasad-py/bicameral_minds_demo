import { Input } from '@/components/ui/input'

export function Search() {
  return (
    <div>
      <Input
        type='search'
        placeholder='Ask AI'
        className='w-full text-black border'
      />
    </div>
  )
}
