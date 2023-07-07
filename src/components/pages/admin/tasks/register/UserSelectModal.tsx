'use client'
import { ReactNode, useState } from "react"
import { createPortal } from "react-dom"
import WhiteButton from "@/components/ui/button/WhiteButton"
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton"
import Input from "@/components/ui/Input"
import OrangeButton from "@/components/ui/button/OrangeButton"

const teck = ['Java', 'PHP', 'FR', 'CL', 'ML', 'QA']
const state = ['研修中', '待機中', 'アサイン中']
const groupArr = ['', 'グループ1', 'グループ2', 'グループ3', 'グループ4', 'グループ5', 'グループ6', 'グループ7', 'グループ8']

// ラップしたコンポーネントをModal化するコンポーネントを仮作成
const Modal = ({
  children,
  buttonText,
  canCloseByClickingBackground = true
}: {
  children: ReactNode,
  buttonText: string,
  canCloseByClickingBackground?: boolean,
}) => {
  const [isOpened, setIsOpened] = useState(false)

  const open = () => setIsOpened(true)
  const close = () => setIsOpened(false)

  if (!isOpened) {
    return (
      <WhiteButton label={buttonText} onClick={open} className="text-xs" />
    )
  }

  // レンダリングするDOMをbodyに固定するためPortalを使用
  const elmModal = (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full">
      <div className="relative z-10 px-10 py-6 w-4/5 max-w-3xl overflow-y-auto bg-white translate-y-3">
        {children}
      </div>
      {canCloseByClickingBackground && <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
        onClick={close}
      />}
    </div>
  )
  return createPortal(elmModal, document.body)
}

// 実際にレンダリングされるモーダルは以下に記述
const UserSelectModal = () => {
  const [ search, setSearch ] = useState('')
  const [ year, setYear ] = useState('')
  const [ month, setMonth ] = useState('')
  const [ group, setGroup ] = useState('')

  // 2000年からの配列を作成
  const maxYear = (new Date()).getFullYear()
  const yearArr = Array(maxYear-1999)
    .fill(2000)
    .map((num, index) => `${num + index}`)
  yearArr.unshift("")
  
  // 月の配列を作成
  const monthArr = Array(12)
    .fill(1)
    .map((num, index) => `${num + index}`)
  monthArr.unshift("")

  return (
    <Modal buttonText="追加">
      <div>
        <h2>▶️ユーザーを選択する</h2>
      </div>
      <div className="flex flex-col item-center border-2 rounded-md w-11/12 mx-auto mt-2 p-8">
        <div className="flex items-center mb-4 ml-12">
          <Input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-light-gray text-xs p-1 w-96"
          />
          <WhiteButton label="検索" className="text-xs ml-4 w-16" />
        </div>
        <div className="flex mb-4 ml-12">
          <select
            name="year"
            id="year"
            onChange={(e) => setYear(e.target.value)}
            value={year}
            className="w-16 border-light-gray"
          >
            {yearArr.map((element, index) => (
              <option key={`year_${index}`} value={element}>{element}</option>
            ))}
          </select>
          <span className="ml-2">年</span>
          <select
            name="month"
            id="month"
            onChange={(e) => setMonth(e.target.value)}
            value={month}
            className="w-20 border-light-gray ml-2"
          >
            {monthArr.map((element, index) => (
              <option key={`month_${index}`} value={element}>{element}</option>
            ))}
          </select>
          <span className="ml-2">月入社</span>
        </div>
        <div className="flex items-center mb-4 ml-10">
          {teck.map((element) => (
            <WhiteCheckButton
              key={element}
              label={element}
              className="text-xs w-16 mx-3"
            />
          ))}
        </div>
        <div className="flex items-center mb-4 ml-10">
          {state.map((element) => (
            <WhiteCheckButton
              key={element}
              label={element}
              className="text-xs w-24 mx-3"
            />
          ))}
        </div>
        <div className="ml-12">
          <h2>▶️グループから検索する</h2>
        </div>
        <div className="ml-12">
          <select
            name="group"
            id="group"
            onChange={(e) => setGroup(e.target.value)}
            value={group}
            className="w-96"
          >
            {groupArr.map((element, index) => (
              <option key={`group_${index}`} value={element}>{element}</option>
            ))}
          </select>
        </div>
        <div className="mx-auto mt-8">
          <OrangeButton label="絞り込み" className="w-28 h-8 text-sm" />
        </div>
      </div>
    </Modal>
  )
}

export default UserSelectModal
