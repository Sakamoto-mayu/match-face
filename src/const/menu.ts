type Menu = {
  id: number;
  title: string;
  url: string;
  description: string;
  imgUrl: string;
  imgAlt: string;
};

type MenuArray = Menu[];

export const menuContentsArray: MenuArray = [
  {
    id: 1,
    title: '回答する',
    url: '/questions',
    description: '質問に答えて顔合わせの準備をします。',
    imgUrl: '/icon/document_icon.png',
    imgAlt: '回答一覧画面アイコン',
  },
  {
    id: 2,
    title: '回答履歴',
    url: '/histories',
    description: '自身の回答をここから確認してください。',
    imgUrl: '/icon/history_icon.png',
    imgAlt: '回答履歴画面アイコン',
  },
];
