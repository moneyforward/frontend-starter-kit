'use client'

import { useEffect, useState } from 'react'

interface IProps {
  children: React.ReactNode
}

export default function Hydration(props: IProps) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated ? props.children : null
}
