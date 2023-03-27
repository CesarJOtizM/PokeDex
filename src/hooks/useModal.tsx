import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Iprops {
  children: React.ReactNode
}

const useModal: React.FC<Iprops> = ({ children }) => {
  const portalNode = document.createElement('div')

  useEffect(() => {
    document.body.appendChild(portalNode)
    return () => {
      portalNode.remove()
    }
  }, [portalNode])

  return createPortal(children, portalNode)
}

export default useModal
