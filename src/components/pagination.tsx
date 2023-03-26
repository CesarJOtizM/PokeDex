import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { usePagination, DOTS } from '@/hooks/usePagination'
import tw from 'twin.macro'
import styled from 'styled-components'

interface Iprops {
  itemsPerPage: number
  items: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangePage: any
  currentPage: number
}

interface buttonProps {
  disable: boolean
}

interface liProps {
  active: boolean
}

const Pagination: React.FC<Iprops> = ({
  itemsPerPage,
  items,
  onChangePage,
  currentPage
}) => {
  const totalPages = Math.ceil(items / itemsPerPage)

  const nextPage = () => {
    onChangePage((currentPage + 1) * 10, true)
  }

  const prevPage = () => {
    onChangePage((currentPage - 1) * 10, true)
  }

  const paginationRange = usePagination({
    totalCount: items,
    pageSize: itemsPerPage,
    currentPage
  })

  return (
    <Wrapper>
      <Ul>
        <Button
          disable={currentPage === 1}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <FiChevronLeft size="20" />
        </Button>

        {paginationRange?.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return <Dots key={pageNumber + i}>&#8230;</Dots>
          }

          return (
            <Li
              key={pageNumber}
              active={currentPage === pageNumber}
              onClick={() => onChangePage(pageNumber as number)}
            >
              {pageNumber}
            </Li>
          )
        })}

        <Button
          disable={totalPages === currentPage}
          onClick={nextPage}
          disabled={totalPages === currentPage}
        >
          <FiChevronRight size="20" />
        </Button>
      </Ul>
    </Wrapper>
  )
}

export default Pagination

const Wrapper = tw.div`
flex
justify-center
w-full
text-gray-800
rounded-l-md
md:text-white
`

const Ul = tw.ul`
flex
items-center
justify-center
list-none
m-0
px-2.5
w-full
text-2xl
`
const Dots = tw.li`
cursor-default
`
const Li = styled.li`
  ${tw`
    cursor-pointer
    p-1.5
    select-none	
`}
  ${(props: liProps) =>
    props.active && tw`border-2 rounded-full bg-blue-700 text-white`}
`

const Button = styled.button`
  ${tw`
    border-0
    text-black
    bg-transparent
    cursor-pointer
    md:text-blue-50

    `}
  ${(props: buttonProps) => props.disable && tw` hidden cursor-default`}
`
