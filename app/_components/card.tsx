import { ReactNode } from 'react';

export default function Card(props: {
  children: ReactNode,
  header: ReactNode | ReactNode[],
  className?: string,
}) {
  const derivedHeaderArray = Array.isArray(props.header) ?
    props.header : [props.header]

  return (
    <div
      className={`${props.className} bg-base-200 rounded-md`}
    >
      <div className="flex items-center justify-between bg-base-300 rounded-t-md p-4 font-semibold">
        {...derivedHeaderArray}
      </div>
      <div className="p-4">
        {props.children}
      </div>
    </div>
  )
}
